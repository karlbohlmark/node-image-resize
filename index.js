var path = require("path");

var sharp = require("sharp");

module.exports = resize;

function resize (file, options, cb) {
    var width = options.width;
    var height = options.height;
    var outfile = options.outfile;
    if (!outfile) {
        // Default naming: 'img.png' resized to 300x200 -> 'img_300x200.png'
        var size = height + 'x' + width;
        var lastDot = file.lastIndexOf(".");
        var ext = file.substring(lastDot, file.length);
        outfile = file.substring(0, lastDot) + "_" + size + ext;
    }
    if (options.outdir) {
      outfile = path.join(options.outdir, outfile);
    }
    sharp(file)
        .resize(width, height)
        .write(outfile, cb);
}
