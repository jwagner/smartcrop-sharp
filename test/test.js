var path = require('path');
var assert = require('chai').assert;

var smartcrop = require('../index.js');

var imageSrc = path.resolve(__dirname, 'flower.jpg');

describe('smartcrop', function() {
  describe('crop', function() {
    it('returns a valid crop', function() {
      return smartcrop
        .crop(imageSrc, { width: 128, height: 128, minScale: 1 })
        .then(function(data) {
          assert(data.topCrop, 0);
          assert.equal(data.topCrop.x, 0);
          assert.equal(data.topCrop.y, 26);
          assert.equal(data.topCrop.width, 427);
          assert.equal(data.topCrop.height, 427);
        });
    });
  });
});
