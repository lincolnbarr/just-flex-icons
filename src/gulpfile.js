/* eslint-env node */

const gulp = require('gulp')
  ,replace = require('gulp-replace')
  ,rename = require('gulp-rename')
  ,svgmin = require('gulp-svgmin')
  ,wrap = require("gulp-wrap")
  ,fs = require('fs')
;

const svg_files_folder = './svg',
  dest_folder = '../react/',
  jsx_template = './templates/icon-components-template.jsx';

let icons_component_list = [];

gulp.task('icons_components', function () {
  return gulp.src([
    svg_files_folder + '/*.svg'
  ])
    .pipe(svgmin({
      multipass: true,
      full: true,

      // https://github.com/svg/svgo/tree/master/plugins
      // https://github.com/svg/svgo#built-in-plugins
      plugins: [
        { name: 'cleanupIDs', params: { remove: true, minify: true } }
        , 'removeDoctype'
        , 'removeComments'
        , 'removeTitle'
        , 'removeDimensions'
        , 'collapseGroups'
        , { name: 'cleanupNumericValues', params: { floatPrecision: 4  } }
        , { name: 'convertColors', params: { names2hex: true, rgb2hex: true } }
        , 'removeStyleElement'
        , 'removeEmptyContainers'
        , { name: 'removeAttrs', params: { attrs: ['(filter|fill|stroke|fill-rule|stroke-linecap|stroke-linejoin|stroke-width|transform|style|class|data.*)', 'svg:(width|height)'] } }
        , 'removeUselessDefs'
      ]
    }))
    .pipe(replace(/<\/?svg(.*?)>/g, ''))
    .pipe(wrap({ src: jsx_template}))
    .pipe(rename(function (path) {
      icons_component_list.push(path.basename);
      path.extname = '.jsx';
    }))
    .pipe(gulp.dest(dest_folder + '/icons'));
});

gulp.task('icons_component_main', function(cb) {

  return fs.writeFile(dest_folder + '/index.js',
    '/* GENERATED FILE */\n\n' +
    icons_component_list.map(item => {

      let module_name = (item.charAt(0).toUpperCase() + item.substr(1))
        .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

      return `export { default as Icon${module_name} } from './icons/${item}.jsx';`;
    }).join('\n'),
    cb);
});

gulp.task('default',
  gulp.series(
    'icons_components',
    'icons_component_main',
  )
);
