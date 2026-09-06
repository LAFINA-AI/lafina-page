"""Derive the intro's texture and extrusion outlines from the existing brand asset.

Requires Pillow and OpenCV; only needed when the source logo changes.
"""
import base64
import io
import json
from pathlib import Path
import cv2
import numpy as np
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = (root / 'src/assets/lafina_logo.svg').read_text()
encoded = source.split('base64,')[1].split('"')[0]
image = Image.open(io.BytesIO(base64.b64decode(encoded))).convert('RGBA')
# Ignore isolated nearly transparent pixels when finding the visible brand bounds.
alpha = np.array(image)[:, :, 3]
count, labels, stats, _ = cv2.connectedComponentsWithStats((alpha > 100).astype('uint8'))
valid = [i for i in range(1, count) if stats[i, cv2.CC_STAT_AREA] > 1000]
ys, xs = np.where(np.isin(labels, valid))
bounds = (int(xs.min()) - 4, int(ys.min()) - 4, int(xs.max()) + 5, int(ys.max()) + 5)
image = image.crop(bounds)
image.thumbnail((1400, 800), Image.Resampling.LANCZOS)
image.save(root / 'src/assets/intro-logo.png', optimize=True)
pixels = np.array(image)
mask = ((pixels[:, :, 3] > 235) * 255).astype('uint8')
contours, hierarchy = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
w, h = image.size
def points(contour):
    return [[round(float(p[0][0]) / w * 10 - 5, 5), round((h / 2 - float(p[0][1])) / w * 10, 5)] for p in cv2.approxPolyDP(contour, 0.65, True)]
shapes = []
for i, contour in enumerate(contours):
    if hierarchy[0][i][3] != -1 or cv2.contourArea(contour) < 120:
        continue
    holes = []
    child = hierarchy[0][i][2]
    while child != -1:
        holes.append(points(contours[child]))
        child = hierarchy[0][child][0]
    shapes.append({'outline': points(contour), 'holes': holes})
(root / 'src/assets/intro-logo-shapes.json').write_text(json.dumps({'aspect': w / h, 'shapes': shapes}, separators=(',', ':')))
print(f'Prepared {w}x{h} logo and {len(shapes)} extrusion outlines.')
