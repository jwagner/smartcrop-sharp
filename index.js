var smartcrop = require('smartcrop');
var sharp = require('sharp');

function rgb2rgba(input) {
  var output = Buffer.alloc(input.length / 3 * 4);
  for (var i = 0; i < input.length; i += 3) {
    output[i / 3 * 4] = input[i];
    output[i / 3 * 4 + 1] = input[i + 1];
    output[i / 3 * 4 + 2] = input[i + 2];
    output[i / 3 * 4 + 3] = 255;
  }
  return output;
}

var iop = {
  open: function(src) {
    var image = sharp(src, {failOn: 'none'});
    return image.metadata().then(function(metadata) {
      return {
        width: metadata.width,
        height: metadata.height,
        _sharp: image
      };
    });
  },
  resample: function(image, width, height) {
    // this does not clone the image, better performance but fragile
    // (depends on the assumtion that resample+getData is only called once per img)
    return new Promise(function(resolve) {
      resolve({
        width: ~~width,
        height: ~~height,
        _sharp: image._sharp
      });
    });
  },
  getData: function(image) {
    var options = { kernel: sharp.kernel.cubic };
    return image._sharp
      .resize(image.width, image.height, options)
      .raw()
      .toBuffer()
      .then(function(data) {
        if (data.length === image.width * image.height * 3) {
          data = rgb2rgba(data);
        }
        if (data.length !== image.width * image.height * 4) {
          throw new Error('unexpected data length ' + data.length);
        }
        return new smartcrop.ImgData(image.width, image.height, data);
      });
  }
};

exports.crop = function(img, options, callback) {
  options = options || {};
  options.imageOperations = iop;
  return smartcrop.crop(img, options, callback);
};
