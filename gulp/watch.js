'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget);

  // Watch task
  gulp.task('watch', () => {
    if (!args.production) {
      // css
      gulp.watch([
        path.join(dirs.source, dirs.css, '**/*.{scss,sass}'),
        path.join(dirs.source, dirs.modules, '**/*.{scss,sass}')
      ], ['sass']);

      // fonts
      gulp.watch([
        path.join(dirs.source, dirs.fonts, '**/*.{ttf,woff,eof,svg}'),
      ], ['sass']);

      // Images
      gulp.watch([
        path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}')
      ], ['imagemin', 'copyimagestoserver', 'copyimagestobuild']);

      // JS
      gulp.watch(path.join(dest, config.directories.assets, dirs.js.replace(/^_/, ''), '*.js'),['copyJsToServer', 'copyJsToBuild']);

      // CSS
      gulp.watch(path.join(dest, config.directories.assets, dirs.css.replace(/^_/, ''), '*.css'),['copyCssToServer', 'copyCssToBuild']);

      // Fonts
      gulp.watch(path.join(dest, config.directories.assets, dirs.fonts.replace(/^_/, ''), '*.*'),['copyFontsToServer', 'copyFontsToBuild']);



      // All other files
      gulp.watch([
        path.join(dirs.temporary, '**/*'),
        '!' + path.join(dirs.temporary, '**/*.{css,map,html,js}')
      ]).on('change', browserSync.reload);
    }
  });
}
