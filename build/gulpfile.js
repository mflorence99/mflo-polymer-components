/**
 * mflo-polymer-components: Experiments with Polymer Components and Tooling
 *
 * @author      https://github.com/mflorence99/mflorence99.github.io
 * @version     0.0.1
 */

// declare dependencies
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
// var debug = require("gulp-debug");
var eslint = require("gulp-eslint");
var fs = require("fs-extra");
var gulp = require("gulp");
var header = require("gulp-header");
var iife = require("gulp-iife");
var less = require("gulp-less");
var log4js = require("log4js");
var path = require("path");
var prettify = require("gulp-prettify");
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var shell = require("gulp-shell");
var stripComments = require("gulp-strip-comments");
var ts = require("gulp-typescript");
var typescript = require("typescript");
var yargs = require("yargs");

// instantiate dependencies
var argv = yargs.argv;

// source, target
var component = argv["component"];
var target = argv["target"];

// make sure target exists
fs.mkdirsSync(target);

// this is the logger
var log = configLog(component);

// build the component HTML
function buildComponent(to) {
  buildLESS(function() {
    buildTS(function() {
      buildJS(function() {
        log.info(".... building component HTML file");
        var style = fs.readFileSync(path.join(target, "component.css"));
        var script = fs.readFileSync(path.join(target, "component.js"));
        var globs = [ ];
        globs.push(path.join("..", "components", component, component + ".html"));
        gulp.src(globs)
          .pipe(replace(/<style\/>/g, "<style>" + style + "</style>"))
          .pipe(replace(/<script\/>/g, "<script>" + script + "</script>"))
          .pipe(prettify({
              brace_style: "none",
              indent_size: 2,
              wrap_line_length: 90
            }))
          .pipe(gulp.dest(to))
          .on("end", function() {
            fs.removeSync(path.join(target, "component.*"));
          });
      });
    });
  });
}

// build all the JavaScript
function buildJS(done) {
  log.info(".... building JavaScript files");
  var globs = [ ];
  globs.push("!" + path.join("..", "components", "**/*.spec.js"));
  globs.push(path.join(target, "component.ts.js"));
  globs.push(path.join("..", "components", component, "**/*.js"));
  gulp.src(globs)
    .pipe(header("\n\n/* eslint-enable */\n\n"))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(concat("component.js"))
    .pipe(iife())
    .pipe(stripComments())
    .pipe(gulp.dest(target))
    .on("end", done);
}

// build JSDoc
function buildJSDoc() {
  log.info(".... building JSDoc files");
  shell.task([
    "./node_modules/jsdoc/jsdoc.js " + path.join("..", "components", component) +
      " --package " + path.join("..", "components", component, "package.json") +
      " --readme " + path.join("..", "components", component, "readme.md") +
      " -r -c jsdoc.conf.json -d " + path.join(target, "jsdoc")
  ]).call();
}

// build all the LESS/CSS into a stream
function buildLESS(done) {
  log.info(".... building CSS/LESS files");
  var globs = [ ];
  globs.push(path.join("..", "components", component, "**/*.css"));
  globs.push(path.join("..", "components", component, "**/*.less"));
  gulp.src(globs)
    .pipe(concat("component.less"))
    .pipe(less({
        paths: [
          path.join("..", "components")
        ],
        relativeUrls: false
      }))
    .pipe(autoprefixer({
        cascade: false
      }))
    .pipe(stripComments())
    .pipe(gulp.dest(target))
    .on("end", done);
}

// generate the test JavaScript
function buildSpecs(done) {
  log.info(".... building test JavaScript files");
  var globs = [ ];
  globs.push(path.join("..", "components", component, "**/*.spec.js"));
  gulp.src(globs)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(concat("spec.js"))
    .pipe(iife())
    .pipe(stripComments())
    .pipe(gulp.dest(target))
    .on("end", done);
}

// build the test HTML
function buildTests() {
  buildSpecs(function() {
    log.info(".... building test HTML file");
    gulp.src("test.template")
      .pipe(replace(/\{\{component\}\}/g, component))
      .pipe(prettify({
          brace_style: "none",
          indent_size: 2,
          wrap_line_length: 90
        }))
      .pipe(rename("test.html"))
      .pipe(gulp.dest(target));
  });
}

// build all the TypeScript
// NOTE: different order of operations as ts feeds into js
function buildTS(done) {
  log.info(".... building TypeScript files");
  var globs = [ ];
  globs.push(path.join("..", "components", "definitely_typed", "**/*.ts"));
  globs.push(path.join("..", "components", component, "**/*.ts"));
  gulp.src(globs)
    .pipe(stripComments())
    .pipe(header("\n\n/* eslint-disable */\n\n"))
    .pipe(ts({
        out: "component.ts.js",
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
  var config = JSON.parse(raw.replace(/\{\{component\}\}/g, component));
  var dn = path.join(".", "logs");
  fs.mkdirsSync(dn);
  log4js.configure(config, { cwd: dn } );
  return log4js.getLogger();
}

// copy dirs common to all components
function copyDirs(dirs) {
  dirs.forEach(function(dir) {
    var from = path.join("..", "components", dir, "**");
    var to = path.join(target, dir);
    log.info(".... copying directory", to);
    gulp.src(from)
      .pipe(gulp.dest(to));
  });
}

// copy required files
function copyFiles(files) {
  log.info(".... copying required files");
  var globs = [ ];
  files.forEach(function(file) {
    globs.push(path.join("..", "components", component, file));
  });
  gulp.src(globs)
    .pipe(gulp.dest(target));
}

// gulp tasks

gulp.task("publish", function() {
  cleanTarget();
  copyFiles(["*.json", "*.md"]);
  buildComponent(target);
  buildJSDoc();
});

gulp.task("test", function() {
  cleanTarget();
  copyDirs(["bower_components"]);
  copyFiles(["demo.html"]);
  buildComponent(path.join(target, "bower_components", component));
  buildTests();
});
