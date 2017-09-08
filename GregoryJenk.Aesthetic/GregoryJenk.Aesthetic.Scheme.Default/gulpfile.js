/// <binding BeforeBuild="less, minify" Clean="clean" />

var del = require("del");
var gulp = require("gulp");
var less = require("gulp-less");
var minify = require("gulp-minify");

var paths = {
    lib: [
        {
            src: "./node_modules/animate.css/animate.min.css",
            dest: "./dist/lib/animate.css/"
        },
        {
            src: "./node_modules/font-awesome/css/font-awesome.css",
            dest: "./dist/lib/font-awesome/css/"
        },
        {
            src: "./node_modules/font-awesome/fonts/*",
            dest: "./dist/lib/font-awesome/fonts/"
        }
    ]
};

gulp.task("clean", function () {
    return del([
        "./dist/css/**/*",
        "./dist/js/**/*",
        "./dist/lib/**/*"
    ]);
});

gulp.task("less", function () {
    return gulp.src("./Less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("./dist/css"));
});

gulp.task("lib", function () {
    for (var i = 0; i < paths.lib.length; i++) {
        gulp.src(paths.lib[i].src).pipe(gulp.dest(paths.lib[i].dest));
    }
});

gulp.task("minify", function () {
    gulp.src("./dist/js/**/*.js")
        .pipe(minify({
            ext: {
                src: ".js",
                min: ".min.js"
            },
            exclude: ["tasks"],
            ignoreFiles: [
                ".combo.js",
                "-min.js"
            ]
        }))
        .pipe(gulp.dest("./wwwroot/app/js/"));
});