#!/usr/bin/env bash
# Build the static site and publish it on the zyrobe-api VM, where Caddy serves
# /var/www/zyrobe-site/current (Caddy config: zyrobe-backend deploy/caddy/Caddyfile, copy in deploy/Caddyfile.reference).
#
#   bash deploy/deploy.sh              build, upload, switch `current`, verify https://zyrobe.com
#   bash deploy/deploy.sh --rollback   point `current` back at the previous release
#
# Needs: gcloud logged in with IAP SSH access to zyrobe-production.
set -euo pipefail
cd "$(dirname "$0")/.."

VM=zyrobe-api ZONE=asia-south1-a PROJECT=zyrobe-production
BASE=/var/www/zyrobe-site KEEP=5
ssh_vm() { gcloud compute ssh "$VM" --zone "$ZONE" --project "$PROJECT" --tunnel-through-iap --quiet --command "$1" 2> >(grep -v -i -E 'numpy|increasing_the_tcp|^$' >&2); }

if [[ "${1:-}" == "--rollback" ]]; then
  ssh_vm "set -e; cd $BASE; cur=\$(basename \$(readlink current)); prev=\$(ls -1 releases | sort | grep -B1 -x \"\$cur\" | head -1)
    [ \"\$prev\" != \"\$cur\" ] || { echo 'no older release'; exit 1; }
    sudo ln -sfn releases/\$prev current.tmp && sudo mv -Tf current.tmp current && echo \"rolled back: \$cur -> \$prev\""
  exit 0
fi

[[ -d node_modules ]] || npm ci
rm -rf out
npx next build

ID="$(date +%Y%m%d-%H%M%S)-$(git rev-parse --short HEAD)$(git diff --quiet HEAD -- src public || echo -dirty)"
printf '{"release":"%s"}\n' "$ID" > out/version.json
test -f out/index.html && test -f out/404.html

TGZ="$(mktemp -d)/site.tgz"
tar -C out -czf "$TGZ" .
echo "Uploading $(du -h "$TGZ" | cut -f1) as release $ID"
gcloud compute scp "$TGZ" "$VM:/tmp/zyrobe-site-$ID.tgz" --zone "$ZONE" --project "$PROJECT" --tunnel-through-iap --quiet 2> >(grep -v -i -E 'numpy|increasing_the_tcp|^$' >&2)
rm -f "$TGZ"

ssh_vm "set -e
  sudo install -d -m 755 $BASE/releases/$ID
  sudo tar -xzf /tmp/zyrobe-site-$ID.tgz -C $BASE/releases/$ID --no-same-owner
  sudo chmod -R a+rX $BASE/releases/$ID
  rm -f /tmp/zyrobe-site-$ID.tgz
  cd $BASE && sudo ln -sfn releases/$ID current.tmp && sudo mv -Tf current.tmp current
  ls -1 releases | sort | head -n -$KEEP | sed 's#^#releases/#' | xargs -r sudo rm -rf
  echo \"live: \$(readlink current)\""

got=$(curl -s "https://zyrobe.com/version.json?ts=$(date +%s)")
echo "zyrobe.com/version.json -> $got"
[[ "$got" == *"$ID"* ]] || { echo "VERIFY FAILED: live site does not report $ID" >&2; exit 1; }
for p in / /privacy /terms /robots.txt /sitemap.xml; do
  printf '%-14s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' "https://zyrobe.com$p")"
done
echo "Deployed $ID. Rollback: bash deploy/deploy.sh --rollback"
