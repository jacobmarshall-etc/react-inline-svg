const fs = require('fs');
const path = require('path');
const manifest = require('./package.json');
const mainFile = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName = path.basename(mainFile);

const gulp = require('gulp');
const rimraf = require('rimraf');
const concat = require('gulp-concat');
const wrapper = require('gulp-wrapper');
const uglify = require('gulp-uglify');

function substitute(str, kv) {
    return (str ? String(str) : '')
        .replace(/\{\{\s*(\w+)\s*\}\}/g, (_, name) => {
            let value = kv[name];
            if (Array.isArray(value) && value.length) {
                value = value.join(', ');
            }
            return String(value);
        });
}

gulp.task('clean', function(cb) {
    rimraf(destinationFolder, cb);
});

gulp.task('build', () => {
    return gulp.src('src/*')
        .pipe(concat(exportFileName))
        .pipe(wrapper({
            header: substitute(fs.readFileSync(__dirname + '/module.header', 'utf8'), manifest),
            footer: fs.readFileSync(__dirname + '/module.footer', 'utf8')
        }))
        .pipe(uglify({
            preserveComments: 'license',
        }))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['build']);
});

gulp.task('default', ['clean', 'build']);