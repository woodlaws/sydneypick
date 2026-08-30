from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def remove_white_matte(source: Path) -> Image.Image:
    image = Image.open(source).convert("RGBA")
    pixels = image.load()

    # Convert only near-white matte pixels to alpha. Pixels at or below 235 in
    # any channel remain fully opaque, preserving the original logo colours.
    for y in range(image.height):
        for x in range(image.width):
            red, green, blue, _ = pixels[x, y]
            darkest = min(red, green, blue)
            if darkest >= 250:
                alpha = 0
            elif darkest <= 235:
                alpha = 255
            else:
                alpha = round((250 - darkest) * 255 / 15)
            pixels[x, y] = (red, green, blue, alpha)

    alpha_box = image.getchannel("A").getbbox()
    if alpha_box is None:
        raise ValueError("No visible logo pixels remained after matte removal")
    return image.crop(alpha_box)


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("usage: process-brand-logo.py SOURCE OUTPUT_PNG OUTPUT_WEBP")

    source, output_png, output_webp = map(Path, sys.argv[1:])
    output_png.parent.mkdir(parents=True, exist_ok=True)
    logo = remove_white_matte(source)
    logo.save(output_png, format="PNG", optimize=True)
    logo.save(output_webp, format="WEBP", lossless=True, quality=100, method=6)
    print(f"source={source} source_size={Image.open(source).size}")
    print(f"png={output_png} size={logo.size} mode={logo.mode}")
    print(f"webp={output_webp} size={logo.size} mode={logo.mode}")


if __name__ == "__main__":
    main()
