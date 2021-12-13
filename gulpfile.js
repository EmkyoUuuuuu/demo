const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const fileInclude = require('gulp-file-include')  //用于html结构组件化安装
const del = require('del')
const server = require('gulp-webserver')

const sassHandler = () => {
  return gulp
    .src('./src/css/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))
}

const jsHandler = () => {
  return gulp
    .src('./src/js/*.js')
    .pipe(babel({ presets: [ '@babel/preset-env' ] })) 
    .pipe(uglify()) 
    .pipe(gulp.dest('./dist/js/')) 
}

const htmlHandler = () => {
  return gulp
    .src('./src/views/*.html')
    .pipe(fileInclude({ // 把组件全部组装完毕
      basepath: './src/components/', // 存放组件的目录
      prefix: '@', // 你自定义的一个标识符, 用于将来在 html 文件内使用的
    }))
    .pipe(htmlmin({ 
      collapseWhitespace: true, 
      collapseBooleanAttributes: true, 
      removeAttributeQuotes: true, 
      removeComments: true, 
      removeEmptyAttributes: true, 
      removeScriptTypeAttributes: true, 
      removeStyleLinkTypeAttributes: true, 
      minifyCSS: true, 
      minifyJS: true, 
    }))
    .pipe(gulp.dest('./dist/views')) 
}

const imgHandler = () => {
  return gulp
    .src('./src/images/**.*')
    .pipe(gulp.dest('./dist/images/')) 
}

const fontHandler = () => {
  return gulp
    .src('./src/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts/')) 
}

const threeHandler = () => {
  return gulp
    .src('./src/npmthreemodule/*.*')
    .pipe(gulp.dest('./dist/npmthreemodule/'))
}

const delHandler = () => {
  return del([ './dist/' ])
}

const serverHandler = () => {
  return gulp
    .src('./dist/')
    .pipe(server({ 
      host: '127.0.0.1',
      port: 5050,
      open: './views/index.html', 
      livereload: true 
    }))
}

const watchHandler = () => {
  gulp.watch('./src/css/*.scss', sassHandler)
  gulp.watch('./src/js/*.js', jsHandler)
  gulp.watch('./src/views/*.html', htmlHandler)
  gulp.watch('./src/images/**.*', imgHandler)
  gulp.watch('./src/fonts/', fontHandler)
}

const _default = gulp.series(
  delHandler,
  gulp.parallel(sassHandler, htmlHandler, jsHandler, imgHandler,fontHandler,threeHandler),
  serverHandler,
  watchHandler
)

module.exports = {
  sassHandler,
  jsHandler,
  htmlHandler,
  imgHandler,
  delHandler,
  fontHandler,
  threeHandler,
  serverHandler,
  watchHandler,
  default: _default
}

