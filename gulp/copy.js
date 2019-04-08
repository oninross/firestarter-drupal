'use strict';

import path from 'path';
import sftp from 'gulp-sftp';
import * as credentials from '../credentials.json';

export default function (gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;
    let dest = path.join(taskTarget);

    /**
     *  Copy Theme
     */
    gulp.task('copyTheme', () => {
        return gulp.src(path.join(dirs.source, dirs.theme, '**/*'))
            .pipe(gulp.dest(config.drupal.path.local.theme));
    });

    /**
     *  Copy Fonts
     */
    gulp.task('copyFonts', () => {
        return gulp.src(path.join(dirs.source, dirs.fonts, 'fonts/**/*.*'))
            .pipe(gulp.dest(path.join(dest, config.directories.assets, dirs.fonts.replace(/^_/, ''))))
    });



    /**
     * Copy assets to server
     */
    gulp.task('copyCssToServer', () => {
        if (config.drupal.copyToServer) {
            return gulp.src(path.join(dest, config.directories.assets, dirs.css.replace(/^_/, ''), '**/*'))
                .pipe(sftp({
                    host: credentials.host,
                    user: credentials.user,
                    pass: credentials.pass,
                    remotePath: config.drupal.path.remote.css
                }));
        }
    });

    gulp.task('copyJsToServer', () => {
        if (config.drupal.copyToServer) {
            return gulp.src(path.join(dest, config.directories.assets, dirs.js.replace(/^_/, ''), '**/*'))
                .pipe(sftp({
                    host: credentials.host,
                    user: credentials.user,
                    pass: credentials.pass,
                    remotePath: config.drupal.path.remote.js
                }));
        }
    });

    gulp.task('copyFontsToServer', () => {
        if (config.drupal.copyToServer) {
            return gulp.src(path.join(dest, config.directories.assets, dirs.fonts.replace(/^_/, ''), '**/*'))
                .pipe(sftp({
                    host: credentials.host,
                    user: credentials.user,
                    pass: credentials.pass,
                    remotePath: config.drupal.path.remote.fonts
                }));
        }
    });

    gulp.task('copyImagesToServer', () => {
        if (config.drupal.copyToServer) {
            return gulp.src(path.join(dest, config.directories.assets, dirs.images.replace(/^_/, ''), '**/*'))
                .pipe(sftp({
                    host: credentials.host,
                    user: credentials.user,
                    pass: credentials.pass,
                    remotePath: config.drupal.path.remote.images
                }));
        }
    });



    /**
     * Copy assets to local build
     */
    gulp.task('copyCssToBuild', () => {
        if (config.drupal.copyToBuild) {
            return gulp.src(path.join(dest, config.directories.assets, dirs.css.replace(/^_/, ''), '**/*'))
                .pipe(gulp.dest(config.drupal.path.local.css));
        }
    });

    gulp.task('copyJsToBuild', () => {
        if (config.drupal.copyToBuild) {
            return gulp.src(path.join(dest, config.directories.assets, dirs.js.replace(/^_/, ''), '**/*'))
                .pipe(gulp.dest(config.drupal.path.local.js));
        }
    });

    gulp.task('copyFontsToBuild', () => {
        if (config.drupal.copyToBuild) {
            return gulp.src(path.join(dest, config.directories.assets, dirs.fonts.replace(/^_/, ''), '**/*'))
                .pipe(gulp.dest(config.drupal.path.local.fonts));
        }
    });

    gulp.task('copyImagesToBuild', () => {
        if (config.drupal.copyToBuild) {
            return gulp.src(path.join(dest, config.directories.assets, dirs.images.replace(/^_/, ''), '**/*'))
                .pipe(gulp.dest(config.drupal.path.local.images));
        }
    });
}
