var test = require('tape');
var SandboxedModule = require('sandboxed-module');


// Mocking setup
var sharp;
var resize = SandboxedModule.require('../', {
  requires: {
    'sharp': function (file) { return sharp = new MockSharp(file); },
  }
});


// Tests
test('passes params to sharp', function (t) {
    t.plan(3);

    var target = {
        input: "file.png",
        options: {
            width: 100,
            height: 200    
        }
    }
    resize(target.input, target.options, function () {
        console.log('done')
    })

    t.equal(sharp.input, target.input);
    t.equal(sharp.width, target.options.width);
    t.equal(sharp.height, target.options.height);
});

test('generates outfile name from dimensions', function (t) {
    t.plan(1);

    var target = {
        input: "file.png",
        options: {
            width: 100,
            height: 200    
        }
    }
    resize(target.input, target.options, function () {
        console.log('done')
    })

    t.equal(sharp.outfile, "file_100x200.png");
});

test('joins outdir to outfile', function (t) {
    t.plan(1);

    var target = {
        input: "file.png",
        options: {
            outdir: "resized",
            width: 100,
            height: 200    
        }
    }
    resize(target.input, target.options, function () {
        console.log('done')
    })

    t.equal(sharp.outfile, "resized/file_100x200.png");
});

test('handles absolute input file with outdir option', function (t) {
    t.plan(1);

    var target = {
        input: "/some/path/file.png",
        options: {
            outdir: "resized",
            width: 100,
            height: 200    
        }
    }
    resize(target.input, target.options, function () {
        console.log('done')
    })

    t.equal(sharp.outfile, "resized/file_100x200.png");
});

// Mocking utilities
function MockSharp(input) {
    this.input = input
}
MockSharp.prototype.resize = function (w, h) {
    this.width = w;
    this.height = h;
    return this;
}
MockSharp.prototype.write = function (outfile) {
    this.outfile = outfile;
    return this;
}