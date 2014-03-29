var sharp = require("sharp");

module.exports = resize;

function resize (file, options, cb) {
    var width = options.width;
    var height = options.height;
    var outfile = options.outfile ||
                  file.replace('.', '_' + height + 'x' + width + '.');

    sharp(file)
        .resize(width, height)
        .write(newName, cb);
}
