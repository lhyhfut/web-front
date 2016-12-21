var gulp = require('gulp');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker   = require('css-mqpacker');
var csswring = require('csswring');
var less = require('gulp-less');
var path = require('path');
var htmlmin = require('gulp-htmlmin');//html压缩
var uglify = require('gulp-uglify');//js压缩
var pump = require('pump');
var concat = require('gulp-concat');

// html压缩
gulp.task('minify', function() {
	return gulp.src('./*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./'));
});
// JS压缩
gulp.task('compress', function () {
	pump([
			gulp.src('./js/*.js'),
			uglify(),
			gulp.dest('./js')
		]
	);
});
//JS 合并
gulp.task('scripts', function() {
	return gulp.src('./dist/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist1/'));
});

gulp.task('default', function() {
  var processors = [
  	autoprefixer({ browsers: ['last 5 version'] }),
  	mqpacker,
  	csswring
  	//上面是任务插件包
  ];
  return gulp.src('./src/index.less')
  	.pipe(less())
  	.pipe(postcss(processors))
  	.pipe(gulp.dest('./css'));
});
// gulp.start('default', 'minify','compress', 'scripts');
gulp.start('default', 'minify','compress');
