const {parallel,src,dest} = require('gulp')
const terser = require('gulp-terser')
const babel = require('gulp-babel')

const jsTask = () => {
  return src('main.js')
  .pipe(babel())
  .pipe(terser())
  .pipe(dest('./dist/'))
}



exports.default = jsTask