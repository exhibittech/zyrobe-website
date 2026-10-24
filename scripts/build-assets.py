#!/usr/bin/env python3
"""Build the site's optimized media (public/media) from the launch-film sources.

Sources (not in this repo, 1.2 GB): ~/Desktop/zyrobe/launch_film/source/assets and
~/Desktop/zyrobe/play-store-assets. Outputs are committed, so only re-run when sources change:

    python3 scripts/build-assets.py [--src DIR] [--play DIR] [--no-video]

Rule: no real person may appear on the website. Try-on results, saved looks and the
face-print sweater (c03/g03, also on the outfit-canvas footage) are excluded on purpose.
"""
import argparse, glob, json, os, shutil, subprocess, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "media")

ap = argparse.ArgumentParser()
ap.add_argument("--src", default=os.path.expanduser("~/Desktop/zyrobe/launch_film/source/assets"))
ap.add_argument("--play", default=os.path.expanduser("~/Desktop/zyrobe/play-store-assets"))
ap.add_argument("--no-video", action="store_true")
args = ap.parse_args()
S = args.src

# Never published: people, or garments printed with a face; bad cut-outs.
EXCLUDE = {"c03", "g03", "c07", "c10", "look_1", "look_2", "look_3", "look_4",
           "tryon_after", "tryon_before", "saved_looks", "tryon_result"}

manifest = {}


def save(src, dst_rel, max_w=None, max_h=None, q=82, lossless=False):
    name = os.path.splitext(os.path.basename(src))[0]
    if name in EXCLUDE:
        return
    im = Image.open(src)
    im = im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")
    if im.mode == "RGBA" and im.getextrema()[3][0] == 255:
        im = im.convert("RGB")
    w, h = im.size
    s = min(1.0, (max_w or w) / w, (max_h or h) / h)
    if s < 1:
        im = im.resize((round(w * s), round(h * s)), Image.LANCZOS)
    dst = os.path.join(OUT, dst_rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "WEBP", quality=q, method=6, lossless=lossless)
    manifest["/media/" + dst_rel] = {"w": im.size[0], "h": im.size[1]}


def many(pattern, sub, **kw):
    for f in sorted(glob.glob(os.path.join(S, pattern))):
        save(f, f"{sub}/{os.path.splitext(os.path.basename(f))[0]}.webp", **kw)


if os.path.isdir(OUT):
    shutil.rmtree(OUT)

# Brand
save(f"{S}/brand2/logo.png", "brand/logo.webp", max_w=1400, q=90)
save(f"{S}/brand2/logo.png", "brand/logo-sm.webp", max_w=520, q=90)
save(f"{S}/brand2/satin.jpg", "brand/satin.webp", max_w=2560, q=78)
save(f"{S}/brand2/satin.jpg", "brand/satin-md.webp", max_w=1280, q=78)
save(f"{S}/brand2/satin_soft.jpg", "brand/satin-soft.webp", max_w=2400, q=78)
save(f"{S}/brand2/satin_full.jpg", "brand/satin-full.webp", max_w=2400, q=78)
save(f"{S}/brand2/satin_dark.jpg", "brand/satin-dark.webp", max_w=2400, q=78)
save(f"{S}/brand/silk.jpg", "brand/silk.webp", max_w=2048, q=78)
Image.open(f"{S}/brand/grain.png").convert("L").crop((0, 0, 256, 256)).save(os.path.join(OUT, "brand/grain.webp"), "WEBP", quality=60, method=6)
manifest["/media/brand/grain.webp"] = {"w": 256, "h": 256}
save(f"{args.play}/zyrobe-feature-1024x500.png", "brand/feature.webp", q=88)
save(f"{args.play}/zyrobe-icon-512.png", "brand/icon.webp", q=90)

# Garments: transparent cut-outs (3D hero, outfit canvas) and flat-lays (wardrobe grid)
many("tiles/c*.png", "garments", max_w=520, q=86)
many("tiles/g*.jpg", "flat", max_w=480, q=80)

# App screens (phone content; 9:41 status bar already clean)
many("screens/*.jpg", "screens", max_w=720, q=84)
save(f"{S}/home/full.jpg", "screens/home_full.webp", max_w=720, q=84)
save(f"{S}/home/base2.jpg", "home/base.webp", max_w=900, q=84)
for f in sorted(glob.glob(f"{S}/home/*.png")):
    save(f, f"home/{os.path.splitext(os.path.basename(f))[0]}.webp", q=88)
shutil.copy(f"{S}/home/layers.json", os.path.join(OUT, "home/layers.json"))

# Components that pop out of the phone
many("comps/*", "comps", max_w=900, q=88)

# Storage + Briefcase captures (Pixel 9), skipping per-letter typing sequences
for f in sorted(glob.glob(f"{S}/feat/*.*")):
    b = os.path.basename(f)
    if not b.endswith((".jpg", ".png")) or b.startswith("_") or any(k in b for k in ("_name_", "_dest_", "pf_note_")):
        continue
    save(f, f"feat/{os.path.splitext(b)[0]}.webp", max_w=1200, q=84)

# Play Store screenshots (no people) for social/OG use
for f in sorted(glob.glob(f"{args.play}/screenshots/phone/*.png")):
    save(f, f"store/{os.path.splitext(os.path.basename(f))[0]}.webp", max_w=720, q=82)


def video(frames_glob, name, fps=60, width=600, crf=26):
    frames = sorted(glob.glob(frames_glob))
    if not frames:
        print("no frames for", name, file=sys.stderr); return
    d = os.path.join(OUT, "video"); os.makedirs(d, exist_ok=True)
    first = os.path.basename(frames[0]); pattern = os.path.join(os.path.dirname(frames[0]), "f_%05d.jpg")
    start = int(first[2:7])
    common = ["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(fps), "-start_number", str(start), "-i", pattern,
              "-vf", f"scale={width}:-2:flags=lanczos,format=yuv420p", "-an"]
    subprocess.run(common + ["-c:v", "libx264", "-preset", "slow", "-crf", str(crf), "-profile:v", "high",
                             "-movflags", "+faststart", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
                             os.path.join(d, name + ".mp4")], check=True)
    save(frames[0], f"video/{name}-poster.webp", max_w=width, q=80)
    manifest["/media/video/" + name] = {"frames": len(frames), "fps": fps, "seconds": round(len(frames) / fps, 2)}


if not args.no_video:
    video(f"{S}/rt60/ch1/f_*.jpg", "wardrobe-ai")      # photo -> AI analysis -> item details
    video(f"{S}/rt60/ch4/f_*.jpg", "stylist")          # daily recommendation -> stylist brief -> Your Look
    video(f"{S}/rt60/ch5/f_*.jpg", "planner")          # weekly planner -> style plan -> calendar
    video(f"{S}/feat/ld60/f_*.jpg", "trip-loader")     # "Creating Your Looks" AI loader

with open(os.path.join(ROOT, "src", "lib", "media.json"), "w") as fh:
    json.dump(manifest, fh, indent=1, sort_keys=True)
print(len(manifest), "assets ->", OUT)
