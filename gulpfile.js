const gulp = require ("gulp");
const ejs = require ("gulp-ejs");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin")

function html(done){
    gulp.src("./src/html/templates/*.ejs")
    .pipe(ejs().on("error", err => console.log(err)))
    .pipe(rename(function(path){
        if(path.basename != "index"){
            path.dirname = path.basename;
            path.basename = "index";
        }
            path.extname = ".html"
    }))
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
    done();
}
function watchhtml(){
    gulp.watch("./src/html/**/*.ejs", { ignoreInitial: false}, html);
}

function javascript(done){
    gulp.src('./src/Javascript/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("./dist/assets/javascript"))
        .pipe(connect.reload());
    done();
}

function watchJavascript() {
    gulp.watch('./src/Javascript/**/*.js', {
        ignoreInitial: false
    }, javascript)
 }

function json(done){
    gulp.src("./src/json/*.json")
    .pipe(gulp.dest("./dist/data"))
    .pipe(connect.reload());
    done();
}

function watchJson(){
    gulp.watch("./src/json/*.json", { ignoreInitial: false}, json);
}

function images(done){
    gulp.src("./src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/assets/images"))
    .pipe(connect.reload());
    done();
    
}

function watchImages(){
    gulp.watch("./src/images/*", {ignoreInitial: false}, images);
}

gulp.task("dev", function(done){
    watchhtml();
    watchJavascript();
    watchImages();
    watchJson();
    connect.server({
        livereload: true, 
        root: "dist"
    });
    done();
});

gulp.task("build", function(done){
    html();
    scss();
    javascript();
    json();
    images();
    
}) 