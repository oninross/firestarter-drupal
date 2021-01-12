"use strict";

import path from "path";
import gulp from "gulp";
import { plugins, args, config, taskTarget, browserSync } from "../utils";
// import * as credentials from "../credentials.json";

let dirs = config.directories;
let dest = path.join(taskTarget);

/**
 *  Copy Theme
 */
gulp.task("copyTheme", () => {
  return gulp
    .src(path.join(dirs.source, dirs.theme, "**/*"))
    .pipe(gulp.dest(config.drupal.path.local.theme));
});

/**
 * Copy Fonts
 */
gulp.task("copyFonts", () => {
  return gulp
    .src(path.join(dirs.source, dirs.fonts, "**/*.*"))
    .pipe(
      gulp.dest(
        path.join(dest, config.directories.assets, dirs.fonts.replace(/^_/, ""))
      )
    );
});

// // Copy
// gulp.task('copy', () => {
//   return gulp.src([
//     '**/*',
//     '!{**/\_*,**/\_*/**,*.md}',
//     '!**/*.pug'
//   ], { cwd: dirs.source })
//   .pipe(plugins.changed(dest))
//   .pipe(gulp.dest(dest));
// });
