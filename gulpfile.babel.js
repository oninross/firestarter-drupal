"use strict";

import path from "path";
import gulp from "gulp";
import glob from "glob";
import { KarmaServer, args } from "./gulp/utils";

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
glob
  .sync("./gulp/tasks/**/*.js")
  .filter(function(file) {
    return /\.(js)$/i.test(file);
  })
  .map(function(file) {
    require(file);
  });

// Build production-ready code
gulp.task(
  "build",
  gulp.series(
    gulp.parallel(
      // 'copy',
      "copyFonts",
      "copyTheme",
      "imagemin",
      "pug",
      "sass",
      "browserify",
      "copyCssToBuild",
      "copyImagesToBuild",
      "copyFontsToBuild",
      "copyJsToBuild",
      "copyCssToServer",
      "copyImagesToServer",
      "copyFontsToServer",
      "copyJsToServer"
    ),
    "rev"
  )
);

// Server tasks with watch
gulp.task(
  "serve",
  gulp.series(
    gulp.parallel(
      // 'copy',
      "copyFonts",
      "copyTheme",
      "imagemin",
      "pug",
      "sass",
      "browserify",
      "copyCssToBuild",
      "copyImagesToBuild",
      "copyFontsToBuild",
      "copyJsToBuild",
      "copyCssToServer",
      "copyImagesToServer",
      "copyFontsToServer",
      "copyJsToServer",
      "browserSync",
      "watch"
    )
  )
);

// Default task
gulp.task("default", gulp.series("clean", "build"));

// Testing
gulp.task(
  "test",
  gulp.series("eslint", done => {
    new KarmaServer(
      {
        configFile: path.join(__dirname, "/karma.conf.js"),
        singleRun: !args.watch,
        autoWatch: args.watch
      },
      done
    ).start();
  })
);
