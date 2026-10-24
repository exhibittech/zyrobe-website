#!/usr/bin/env python3
"""Build favicon / app icons / Open Graph images into src/app from brand sources.

    python3 scripts/build-meta-images.py [--src DIR] [--play DIR]

No people: only the wordmark, satin and app screens without a person.
"""
import argparse, os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, "src", "app")
ap = argparse.ArgumentParser()
ap.add_argument("--src", default=os.path.expanduser("~/Desktop/zyrobe/launch_film/source/assets"))
ap.add_argument("--play", default=os.path.expanduser("~/Desktop/zyrobe/play-store-assets"))
args = ap.parse_args()
S = args.src
FONTS = "/usr/share/fonts/truetype"
INK = (46, 28, 18)

logo = Image.open(f"{S}/brand2/logo.png").convert("RGBA")
satin = Image.open(f"{S}/brand2/satin.jpg").convert("RGB")


def cover(im, w, h, focus=(0.5, 0.5)):
    s = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = round((im.width - w) * focus[0]); y = round((im.height - h) * focus[1])
    return im.crop((x, y, x + w, y + h))


def tight(im):
    return im.crop(im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())


# --- "Z" monogram: the connected component of the wordmark that holds the Z's bottom bar
a = np.array(logo)[:, :, 3]
n, lab = cv2.connectedComponents((a > 8).astype(np.uint8), connectivity=8)
zid = lab[432, 100]
zmask = (lab == zid)
z = np.array(logo).copy(); z[~zmask] = 0
Z = tight(Image.fromarray(z))


def monogram(size, rounded=True, bold=0):
    tile = cover(satin, size, size, (0.42, 0.5))
    tile = Image.eval(tile, lambda v: min(255, int(v * 1.04)))
    img = tile.convert("RGBA")
    zz = Z
    if bold:  # thicken hairlines so they survive 16-48 px
        arr = np.array(zz); al = arr[:, :, 3]
        k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (bold, bold))
        arr[:, :, 3] = cv2.dilate(al, k); arr[:, :, :3] = INK
        zz = Image.fromarray(arr)
    h = round(size * 0.64); w = round(zz.width * h / zz.height)
    zz = zz.resize((w, h), Image.LANCZOS)
    img.alpha_composite(zz, ((size - w) // 2 + round(size * 0.01), (size - h) // 2))
    if rounded:
        m = Image.new("L", (size * 4, size * 4), 0)
        ImageDraw.Draw(m).rounded_rectangle((0, 0, size * 4 - 1, size * 4 - 1), radius=round(size * 4 * 0.22), fill=255)
        img.putalpha(m.resize((size, size), Image.LANCZOS))
    return img


monogram(512, bold=0).save(os.path.join(APP, "icon.png"), optimize=True)
ico = [monogram(s, bold=b) for s, b in ((16, 30), (32, 22), (48, 16))]
big = monogram(256, bold=10)
big.save(os.path.join(APP, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48), (256, 256)],
         append_images=ico)

# Apple touch icon + PWA icons: the real launcher icon (wordmark on satin, no transparency)
sq = Image.open(f"{args.play}/zyrobe-logo-square-1024.png").convert("RGB")
sq.resize((180, 180), Image.LANCZOS).save(os.path.join(APP, "apple-icon.png"), optimize=True)
pub = os.path.join(ROOT, "public")
for s in (192, 512):
    sq.resize((s, s), Image.LANCZOS).save(os.path.join(pub, f"icon-{s}.png"), optimize=True)
# maskable: wordmark inside the 80% safe zone
mk = cover(satin, 512, 512, (0.42, 0.5)).convert("RGBA")
wm = tight(logo); w = round(512 * 0.62); wm = wm.resize((w, round(wm.height * w / wm.width)), Image.LANCZOS)
mk.alpha_composite(wm, ((512 - wm.width) // 2, (512 - wm.height) // 2 + 6))
mk.convert("RGB").save(os.path.join(pub, "icon-maskable-512.png"), optimize=True)


# --- Open Graph 1200x630: satin, wordmark + promise on the left, two app phones on the right
def phone(screen_path, width):
    scr = Image.open(screen_path).convert("RGB")
    W = width; H = round(W * 1948 / 900); b = round(W * 0.03); r = round(W * 0.15)
    frame = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(frame)
    d.rounded_rectangle((0, 0, W - 1, H - 1), radius=r, fill=(20, 18, 16, 255))
    d.rounded_rectangle((1, 1, W - 2, H - 2), radius=r, outline=(64, 58, 52, 255), width=2)
    inner = scr.resize((W - 2 * b, H - 2 * b), Image.LANCZOS).convert("RGBA")
    m = Image.new("L", inner.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, inner.width - 1, inner.height - 1), radius=r - b, fill=255)
    frame.paste(inner, (b, b), m)
    c = round(W * 0.036)
    d.ellipse((W // 2 - c // 2, round(W * 0.05), W // 2 + c // 2, round(W * 0.05) + c), fill=(0, 0, 0, 255))
    return frame


def shadowed(canvas, obj, xy, angle=0, blur=28, off=(0, 26), alpha=110):
    if angle:
        obj = obj.rotate(angle, resample=Image.BICUBIC, expand=True)
    sh = Image.new("RGBA", (obj.width + blur * 4, obj.height + blur * 4), (0, 0, 0, 0))
    sil = Image.new("RGBA", obj.size, (46, 28, 18, alpha)); sil.putalpha(obj.getchannel("A").point(lambda v: v * alpha // 255))
    sh.alpha_composite(sil, (blur * 2, blur * 2)); sh = sh.filter(ImageFilter.GaussianBlur(blur))
    canvas.alpha_composite(sh, (xy[0] - blur * 2 + off[0], xy[1] - blur * 2 + off[1]))
    canvas.alpha_composite(obj, xy)


def og(path, w=1200, h=630):
    img = cover(satin, w, h, (0.35, 0.5)).convert("RGBA")
    veil = Image.new("RGBA", (w, h), (250, 247, 242, 0))
    g = np.zeros((h, w), np.uint8); g[:] = np.clip(np.linspace(150, 0, w), 0, 255).astype(np.uint8)
    veil.putalpha(Image.fromarray(g)); img.alpha_composite(veil)
    p1 = phone(f"{S}/screens/04_stylist.jpg", 230); p2 = phone(f"{S}/screens/02_wardrobe.jpg", 250)
    shadowed(img, p1, (w - 470, 120), angle=7)
    shadowed(img, p2, (w - 330, 70), angle=-5)
    wm = tight(logo); ww = 470; wm = wm.resize((ww, round(wm.height * ww / wm.width)), Image.LANCZOS)
    img.alpha_composite(wm, (88, 150))
    d = ImageDraw.Draw(img)
    serif = ImageFont.truetype(f"{FONTS}/noto/NotoSerifDisplay-Light.ttf", 46)
    sans = ImageFont.truetype(f"{FONTS}/lato/Lato-Bold.ttf", 17)
    d.text((92, 340), "Your wardrobe,", font=serif, fill=INK)
    d.text((92, 396), "now with a stylist.", font=serif, fill=INK)
    d.text((94, 490), "A I   W A R D R O B E   ·   S T Y L I S T   ·   P L A N N E R", font=sans, fill=(104, 106, 82))
    img.convert("RGB").save(path, optimize=True)


og(os.path.join(APP, "opengraph-image.png"))
og(os.path.join(APP, "twitter-image.png"))
alt = "Zyrobe: your wardrobe, now with a stylist. The Zyrobe wordmark on cream satin beside two app screens."
for f in ("opengraph-image.alt.txt", "twitter-image.alt.txt"):
    open(os.path.join(APP, f), "w").write(alt)
print("ok")
