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
var beautify = require("gulp-jsbeautify");
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
function copyDirs() {
  var dirs = ["bower_components"];
  dirs.forEach(function(dir) {
    var from = path.join("..", "components", dir, "**");
    var to = path.join(target, dir);
    log.info(".... copying directory", to);
    gulp.src(from)
      .pipe(gulp.dest(to));
  });
}

// TEMPORARY
function copyComponent() {
  var from = path.join("..", "components", component, component + ".html");
  var to = path.join(target, "bower_components", component);
  log.info(".... copying HTML", to);
  gulp.src(from)
    .pipe(gulp.dest(to));
}

// TEMPORARY
function copyHTML() {
  var from = path.join("..", "components", component, "demo.html");
  log.info(".... copying HTML", target);
  gulp.src(from)
    .pipe(gulp.dest(target));
}

// gulp tasks

gulp.task("test", function() {
  log.info("#### starting test build");
  cleanTarget();
  copyDirs();
  copyHTML();
  copyComponent();
  log.info("#### ending test build");
});
