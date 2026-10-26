#!/usr/bin/env bash
# Tell the IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep) which zyrobe.com pages
# changed. Run after a deploy:
#   bash deploy/indexnow.sh                 # every URL in the live sitemap
#   bash deploy/indexnow.sh /faq /guides/x  # only these paths
# The key file public/91cb96526f95441eb5a9e0bd1ec7b8a5.txt proves we own the host; keep the two in sync.
set -euo pipefail

HOST=zyrobe.com
KEY=91cb96526f95441eb5a9e0bd1ec7b8a5
KEY_URL="https://$HOST/$KEY.txt"

live_key=$(curl -fsS "$KEY_URL" || true)
if [ "$live_key" != "$KEY" ]; then
  echo "Key file $KEY_URL is not live (deploy first)." >&2
  exit 1
fi

if [ $# -gt 0 ]; then
  urls=$(for path in "$@"; do printf 'https://%s%s\n' "$HOST" "$path"; done)
else
  urls=$(curl -fsS "https://$HOST/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed -e 's/<loc>//' -e 's/<\/loc>//')
fi
count=$(printf '%s\n' "$urls" | grep -c .)
[ "$count" -gt 0 ] || { echo "No URLs to submit." >&2; exit 1; }

body=$(printf '%s\n' "$urls" | python3 -c '
import json, sys
urls = [u.strip() for u in sys.stdin if u.strip()]
print(json.dumps({"host": sys.argv[1], "key": sys.argv[2], "keyLocation": sys.argv[3], "urlList": urls}))
' "$HOST" "$KEY" "$KEY_URL")

code=$(curl -sS -o /dev/null -w '%{http_code}' -X POST https://api.indexnow.org/indexnow \
  -H 'Content-Type: application/json; charset=utf-8' --data "$body")
case "$code" in
  200) echo "IndexNow: $count URLs accepted." ;;
  202) echo "IndexNow: $count URLs received; the key is still being checked." ;;
  400) echo "IndexNow: bad request (400)." >&2; exit 1 ;;
  403) echo "IndexNow: key not valid for $HOST (403)." >&2; exit 1 ;;
  422) echo "IndexNow: URLs don't belong to $HOST or the key doesn't match (422)." >&2; exit 1 ;;
  429) echo "IndexNow: too many requests, try later (429)." >&2; exit 1 ;;
  *) echo "IndexNow: unexpected HTTP $code." >&2; exit 1 ;;
esac
