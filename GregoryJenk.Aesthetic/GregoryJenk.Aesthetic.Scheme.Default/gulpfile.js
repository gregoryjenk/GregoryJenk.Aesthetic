/// <binding BeforeBuild="less, minify" Clean="clean" />

var del = require("del");
var gulp = require("gulp");
var less = require("gulp-less");
var minify = require("gulp-minify");

var paths = {
    lib: [
        {
            src: "./node_modules/bootstrap/dist/*/**",
            dest: "./wwwroot/lib/bootstrap/dist/"
        },
        {
            src: "./node_modules/font-awesome/*/**",
            dest: "./wwwroot/lib/font-awesome/"
        },
        {
            src: "./node_modules/jquery/dist/*",
            dest: "./wwwroot/lib/jquery/dist/"
        }
    ]
};

gulp.task("clean", function () {
    return del([
        "./wwwroot/dist/css/**/*",
        "./wwwroot/dist/js/**/*",
        "./wwwroot/lib/**/*"
    ]);
});

gulp.task("less", function () {
    return gulp.src("./Less/**/*.less")
        .pipe(less())
        .pipe(gulp.dest("./wwwroot/dist/css"));
});

gulp.task("lib", function () {
    for (var i = 0; i < paths.lib.length; i++) {
        gulp.src(paths.lib[i].src).pipe(gulp.dest(paths.lib[i].dest));
    }
});

gulp.task("minify", function () {
    gulp.src("./wwwroot/dist/js/**/*.js")
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
        .pipe(gulp.dest("./wwwroot/dist/js/"));
});