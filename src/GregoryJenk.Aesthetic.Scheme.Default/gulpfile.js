/// <binding BeforeBuild="default" Clean="clean" />

var del = require("del");
var gulp = require("gulp");
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var sass = require("gulp-sass")(require("sass"));
var sourcemaps = require("gulp-sourcemaps");

var paths = {
    lib: [
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ],
    sass: [
        "./src/styles/default-black-style.scss",
        "./src/styles/default-white-style.scss"
    ]
};

gulp.task("clean", function () {
    return del([
        "./dist/css/",
        "./dist/js/",
        "./lib/"
    ]);
});

gulp.task("clean-css", function () {
    return del([
        "./dist/css/"
    ]);
});

gulp.task("lib", function () {
    return gulp.src(paths.lib, { base: "node_modules" })
        .pipe(gulp.dest("./lib/"));
});

gulp.task("min-css", function () {
    return gulp.src("./dist/css/**/*.css")
        //.pipe(sourcemaps.init())
        .pipe(cleanCSS())
        //.pipe(sourcemaps.write())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("sass", function () {
    return gulp.src(paths.sass)
        //.pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("watch-sass", function () {
    return gulp.watch("./src/styles/**/*", gulp.series("clean-css", "sass", "min-css"));
});

gulp.task("default", gulp.series("clean", "lib", "sass", "min-css"));