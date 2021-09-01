# smartcrop-sharp

[![Tests](https://github.com/jwagner/smartcrop-sharp/actions/workflows/tests.yml/badge.svg)](https://github.com/jwagner/smartcrop-sharp/actions/workflows/tests.yml)

This is an adapter module for using [smartcrop.js](https://github.com/jwagner/smartcrop.js)
with node.js using [sharp](https://github.com/lovell/sharp) for image decoding.

## Installation

You'll need to install `sharp` alongside `smartcrop-sharp`.

```
npm install --save smartcrop-sharp sharp
```

## API

## crop(image, options)

**Image:** string (path to file) or buffer

**Options:** options object to be passed to smartcrop

**returns:** A promise for a cropResult

## Example

```javascript
const sharp = require('sharp');
const smartcrop = require('smartcrop-sharp');

// finds the best crop of src and writes the cropped and resized image to dest.
function applySmartCrop(src, dest, width, height) {
  return smartcrop.crop(src, { width: width, height: height })
    .then(function(result) {
      const crop = result.topCrop;
      return sharp(src)
        .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
        .resize(width, height)
        .toFile(dest);
    })
}

applySmartCrop('flower.jpg', 'flower-square.jpg', 128, 128);
```

## Face Detection Example

Check out [smartcrop-cli](https://github.com/jwagner/smartcrop-cli/) for a more advanced [example](https://github.com/jwagner/smartcrop-cli/blob/master/smartcrop-cli.js#L100) of how to use smartcrop from node including face detection with opencv.

## Changelog

### 2.0.2

- **sharp is now a peer dependency you will need to install it via `npm install sharp` when updating**
- In short: It's a lot faster, especially when calculating bigger crops.
- The quality of the crops should be comparable but the exact results are going to be different.
