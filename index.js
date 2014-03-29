var sharp = require("sharp");

module.exports = resize;

function resize (file, options, cb) {
    var width = options.width;
    var height = options.height;
    var outfile = options.outfile
    if (!outfile) {
        var size = height + 'x' + width;
        var lastDot = file.lastIndexOf(".");
        var ext = file.substring(lastDot, file.length);
        outfile = file.substring(0, lastDot) + "_" + size + ext;
    }

    sharp(file)
        .resize(width, height)
        .write(newName, cb);
}
