const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;

const smartcrop = require('../index.js');
const https = require('https');

const imageSrc = path.resolve(__dirname, 'flower.jpg');
const imageSrcHttp = 'https://raw.githubusercontent.com/jwagner/smartcrop-gm/master/test/flower.jpg';

describe('smartcrop', function() {
  describe('crop', function() {
    function validateCrop(data) {
      assert(data.topCrop, 0);
      assert.equal(data.topCrop.x, 0);
      assert.equal(data.topCrop.y, 26);
      assert.equal(data.topCrop.width, 427);
      assert.equal(data.topCrop.height, 427);
    }
    it('returns a valid crop', function() {
      return smartcrop
        .crop(imageSrc, { width: 128, height: 128, minScale: 1 })
        .then(validateCrop);
    });
    it('accepts a stream', function() {
      function httpsGetBuffer(src) {
        return new Promise((resolve,reject) => {
          const chunks = [];
          https.get(src, (response) => {
            response.on('data', chunk => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
          });
        });
      }
      return httpsGetBuffer(imageSrcHttp).then(responseBodyBuffer =>
        smartcrop
          .crop(responseBodyBuffer, { width: 128, height: 128, minScale: 1 })
      ).then(validateCrop);
    });
  });
  describe('readme example', function() {
    it('writes a file', function() {
      var sharp = require('sharp');

      function applySmartCrop(src, dest, width, height) {
        return smartcrop.crop(src, { width: width, height: height }).then(function(result) {
          var crop = result.topCrop;
          return sharp(src)
            .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
            .resize(width, height)
            .toFile(dest);
        }).then(() => {
          fs.unlinkSync(dest);
        });
      }

      return applySmartCrop(imageSrc, 'flower-square.jpg', 128, 128);
    });
  });
});
