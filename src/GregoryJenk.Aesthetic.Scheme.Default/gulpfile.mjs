/// <binding BeforeBuild="default" Clean="cleanAsync" />

import { deleteAsync } from "del";
import { dest, series, src, watch } from "gulp";
import cleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import sassFactory from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import * as sassCompiler from "sass";

const paths = {
    nodeModules: [
        "./node_modules/bootstrap/dist/css/bootstrap.min.css",
        "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ],
    source: {
        scss: [
            "./src/styles/**/*",
            "!./src/styles/default-core-style.scss",
            "!./src/styles/variables/**/*"
        ]
    }
};

export async function cleanAsync() {
    return await deleteAsync([
        "./dist/css",
        "./dist/js",
        "./lib"
    ]);
}

export async function cleanCssAsync() {
    return await deleteAsync([
        "./dist/css"
    ]);
}

export function copyLibraries() {
    let srcOptions = {
        base: "./node_modules",
        encoding: false
    };

    return src(paths.nodeModules, srcOptions)
        .pipe(dest("./lib"));
}

export function compileSass() {
    let sass = sassFactory(sassCompiler);

    return src(paths.source.scss)
        .pipe(sass())
        .pipe(dest("./dist/css"));
}

export function minimiseCss() {
    let renameOptions = {
        suffix: ".min"
    };

    return src("./dist/css/**/*.css")
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(rename(renameOptions))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./dist/css"));
}

export function watchSass() {
    watch(paths.source.scss, series(cleanCssAsync, compileSass, minimiseCss));
}

export default series(cleanAsync, copyLibraries, compileSass, minimiseCss);