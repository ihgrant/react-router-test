/* gulpfile.js */
 
// Load some modules which are installed through NPM.
var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var del = require('del');  // Deletes files.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');  // To compile Stylus CSS.
 
// Define some paths.
var paths = {
  css: ['src/css/**/*.styl'],
  app_js: ['./src/js/app.jsx'],
  js: ['src/js/*.js'],
};
 
// An example of a dependency task, it will be run before the css/js tasks.
// Dependency tasks should call the callback to tell the parent task that
// they're done.
gulp.task('clean', function(done) {
  del(['build'], done);
});
 
// Our CSS task. It finds all our Stylus files and compiles them.
gulp.task('css', ['clean'], function() {
  return gulp.src(paths.css)
    .pipe(stylus())
    .pipe(gulp.dest('./src/css'));
});
 
// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', ['clean'], function() {
  // Browserify/bundle the JS.
  browserify(paths.app_js)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./src/'));
});
 
// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.css, ['css']);
  gulp.watch([paths.app_js, paths.js], ['js']);
});
 
// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch', 'css', 'js']);
