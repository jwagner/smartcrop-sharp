# smartcrop-sharp

[![Build Status](https://travis-ci.org/jwagner/smartcrop-sharp.svg?branch=master)](https://travis-ci.org/jwagner/smartcrop-sharp)

This is an adapter module for using [smartcrop.js](https://github.com/jwagner/smartcrop.js)
with node.js using [sharp](https://github.com/lovell/sharp) for image decoding.

## Installation
```
npm install --save smartcrop-sharp
```

## API

## crop(image, options)

**Image:** string (path to file) or buffer

**Options:** options object to be passed to smartcrop

**returns:** A promise for a cropResult

## Example

```javascript
var request = require('request');
var sharp = require('sharp');
var smartcrop = require('smartcrop-sharp');

function applySmartCrop(src, dest, width, height) {
  request(src, {encoding: null}, function process(error, response, body) {
    if (error) return console.error(error);
    smartcrop.crop(body, {width: width, height: height}).then(function(result) {
      var crop = result.topCrop;
      sharp(body)
        .extract({width: crop.width, height: crop.height, left: crop.x, top: crop.y})
        .resize(width, height)
        .toFile(dest);
    });
  });
}

var src = 'https://raw.githubusercontent.com/jwagner/smartcrop-gm/master/test/flower.jpg';
applySmartCrop(src, 'flower-square.jpg', 128, 128);


```

## Face Detection Example
  Check out [smartcrop-cli](https://github.com/jwagner/smartcrop-cli/) for a more advanced [example](https://github.com/jwagner/smartcrop-cli/blob/master/smartcrop-cli.js#L100) of how to use smartcrop from node  including face detection with opencv.
