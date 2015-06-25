/**
 *
 * @package     mflo-polymer-components
 * @version     0.0.0
 * @copyright   Copyright (c) 2015 - All rights reserved.
 * @license     MIT License
 * @author      Mark Florence <mflo999@gmail.com>
 * @link        https://github.com/mflorence99/mflorence99.github.io
 *
 */

// declare dependencies
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var cssBase64 = require("gulp-css-base64");
var debug = require("gulp-debug");
var eslint = require("gulp-eslint");
var fs = require("fs-extra");
var gulp = require("gulp");
var gulpif = require("gulp-if");
var header = require("gulp-header");
var ignore = require("gulp-ignore");
var iife = require("gulp-iife");
var less = require("gulp-less");
var log4js = require("log4js");
var path = require("path");
var prettify = require("gulp-prettify");
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var tap = require("gulp-tap");
var ts = require("gulp-typescript");
var typescript = require("typescript");
var yargs = require("yargs");

// instantiate dependencies
var argv = yargs.argv;

// source, target
var component = argv["component"];
var target = argv["target"];

// this is the logger
var log = configLog(component);

// build the component HTML
function buildComponent() {
  log.info(".... building component HTML file");
  var style = fs.readFileSync(path.join(target, "all.css"));
  var script = fs.readFileSync(path.join(target, "all.js"));
  var to = path.join(target, "bower_components", component);
  var globs = [ ];
  globs.push(path.join("..", "components", component, component + ".html"));
  gulp.src(globs)
    .pipe(replace(/<style\/>/g, "<style>\n" + style + "\n</style>"))
    .pipe(replace(/<script\/>/g, "<script>\n" + script + "\n</script>"))
    .pipe(prettify({
        brace_style: "none",
        indent_size: 2,
        wrap_line_length: 90
      }))
    .pipe(gulp.dest(to))
    .on("end", function() {
      fs.removeSync(path.join(target, "all.*"));
    });
}

// build all the JavaScript into a stream
function buildJS(done) {
  log.info(".... building JavaScript files");
  var globs = [ ];
  globs.push("!" + path.join("..", "components", "**/*.spec.js"));
  globs.push(path.join(target, "all.ts.js"));
  globs.push(path.join("..", "components", component, "**/*.js"));
  gulp.src(globs)
    .pipe(header("\n\n/* eslint-enable */\n\n"))
    .pipe(eslint({
        configFile: path.join("..", ".eslintrc"),
        ignorePath: path.join("..", ".eslintignore")
      }))
    .pipe(eslint.format())
    .pipe(concat("all.js"))
    .pipe(iife())
    .pipe(gulp.dest(target))
    .on("end", done);
}

// build all the LESS/CSS into a stream
function buildLESS(done) {
  log.info(".... building CSS/LESS files");
  var globs = [ ];
  globs.push(path.join("..", "components", component, "**/*.css"));
  globs.push(path.join("..", "components", component, "**/*.less"));
  gulp.src(globs)
    .pipe(concat("all.less"))
    .pipe(less({
        paths: [
          path.join("..", "components")
        ],
        relativeUrls: false
      }))
    .pipe(autoprefixer({
        cascade: false
      }))
    .pipe(gulp.dest(target))
    .on("end", done);
}

// build all the TypeScript into a stream
function buildTS(done) {
  log.info(".... building TypeScript files");
  var globs = [ ];
  globs.push(path.join("..", "components", "definitely_typed", "**/*.ts"));
  globs.push(path.join("..", "components", component, "**/*.ts"));
  gulp.src(globs)
    .pipe(header("\n\n/* eslint-disable */\n\n"))
    .pipe(ts({
        out: "all.ts.js",
        target: "ES5",
        typescript: typescript
      }))
    .pipe(gulp.dest(target))
    .on("end", done);
}

// clean target
function cleanTarget() {
  var contents = fs.readdirSync(target);
  contents.forEach(function(fileOrDir) {
    var id = path.join(target, fileOrDir);
    var stat = fs.statSync(id);
    if (stat.isDirectory()) {
      log.info(".... cleaning directory", id);
      fs.removeSync(id);
      fs.mkdirsSync(id);
    }
    else {
      log.info(".... removing file", id);
      fs.removeSync(id);
    }
  });
}

// configure logging
function configLog(component) {
  var raw = fs.readFileSync(path.join(__dirname, "log4js.json")).toString();
  var config = JSON.parse(raw.replace(/{{component}}/g, component));
  var dn = path.join(".", "logs");
  fs.mkdirsSync(dn);
  log4js.configure(config, { cwd: dn } );
  return log4js.getLogger();
}

// copy dirs common to all components
function copyTestDirs() {
  var dirs = ["bower_components"];
  dirs.forEach(function(dir) {
    var from = path.join("..", "components", dir, "**");
    var to = path.join(target, dir);
    log.info(".... copying directory", to);
    gulp.src(from)
      .pipe(gulp.dest(to));
  });
}

// copy the testing HTML
function copyTestHTML() {
  log.info(".... copying the testing HTML files");
  var globs = [ ];
  globs.push(path.join("..", "components", component, "demo.html"));
  globs.push(path.join("..", "components", component, "test.html"));
  gulp.src(globs)
    .pipe(gulp.dest(target));
}

// gulp tasks

gulp.task("test", function() {
  cleanTarget();
  copyTestDirs();
  copyTestHTML();
  buildLESS(function() {
    buildTS(function() {
      buildJS(function() {
        buildComponent();
      })
    })
  });
});
