const { src, dest, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const image = require('gulp-imagemin');
const webp = require('gulp-webp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));

// paths
const srcFolder = './src';
const buildFolder = './app';
const paths = {
  srcSvg: `${srcFolder}/img/svg/**.svg`,
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,
  srcScss: `${srcFolder}/scss/**/*.scss`,
  buildCssFolder: `${buildFolder}/css`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMinJs: `${srcFolder}/js/**/*.min.js`,
  srcJsFolder: `${srcFolder}/js`,
  buildJsFolder: `${buildFolder}/js`,
  srcPartialsFolder: `${srcFolder}/html`,
  resourcesFolder: `${srcFolder}/files`,
};

let isProd = false; // dev by default

const clean = () => {
  return del([buildFolder]);
};

const styles = () => {
  return src(paths.srcScss, { sourcemaps: !isProd })
    .pipe(
      sass({
        style: isProd ? 'compressed' : 'expanded',
        sourceMap: isProd,
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ['last 8 versions'],
      })
    )
    .pipe(
      gulpif(
        isProd,
        cleanCSS({
          level: 2,
        })
      )
    )
    .pipe(dest(paths.buildCssFolder, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src([paths.srcFullJs, `!${paths.srcMinJs}`])
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(dest(paths.buildJsFolder))
    .pipe(browserSync.stream());
};

const scriptsLibs = () => {
  return src(paths.srcMinJs)
    .pipe(concat('libs.min.js'))
    .pipe(dest(paths.buildJsFolder))
    .pipe(browserSync.stream());
};

const resources = () => {
  return src(`${paths.resourcesFolder}/**/*.*`).pipe(dest(buildFolder));
};

const images = () => {
  return src([`${paths.srcImgFolder}/*.{jpg,jpeg,png,svg}`])
    .pipe(
      gulpif(
        isProd,
        image([
          image.mozjpeg({
            quality: 85,
            progressive: true,
          }),
          image.optipng({
            optimizationLevel: 2,
          }),
        ])
      )
    )
    .pipe(dest(paths.buildImgFolder));
};

const webpImages = () => {
  return src([`${paths.srcImgFolder}/*.{jpg,jpeg,png}`])
    .pipe(webp())
    .pipe(dest(paths.buildImgFolder));
};

const html = () => {
  return src([`${srcFolder}/**/*.html`])
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: `${buildFolder}`,
    },
  });

  watch(paths.srcScss, styles);
  watch(paths.srcFullJs, scripts);
  watch(paths.srcMinJs, scriptsLibs);
  watch(`${srcFolder}/**/*.html`, html);
  watch(`${paths.resourcesFolder}/**`, resources);
  watch(`${paths.srcImgFolder}/**/*.{jpg,jpeg,png,svg}`, images);
  watch(`${paths.srcImgFolder}/**/*.{jpg,jpeg,png}`, webpImages);
};

const toProd = (done) => {
  isProd = true;
  done();
};

exports.default = series(
  clean,
  html,
  scripts,
  scriptsLibs,
  styles,
  resources,
  images,
  webpImages,
  watchFiles
);

exports.build = series(
  toProd,
  clean,
  html,
  scripts,
  scriptsLibs,
  styles,
  resources,
  images,
  webpImages
);
