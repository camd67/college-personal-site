var gulp = require("gulp");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");

var devOut = "dev/";
var distOut = "dist/";

gulp.task("connect", function() {
    connect.server({
        root: "dist",
        livereload: true
    });
});

gulp.task("sassDev", function() {
    //take these sass files from this location
    gulp.src("scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(devOut + "css"))
        .pipe(connect.reload());
});

gulp.task("watch", function() {
    gulp.watch("scss/*.scss", ["sass"]);
    gulp.watch("html/*.html", ["copyDev"]);
    gulp.watch("js/*.js", ["copyDev"]);
});

gulp.task("uglify", function(){
    gulp.src("js/*")
        .pipe(uglify())
        .pipe(gulp.dest(distOut + "js"));
});
gulp.task("sassDist", function() {
    //take these sass files from this location
    gulp.src("scss/*.scss")
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(gulp.dest(distOut + "css"));
});

gulp.task("copyDist", function() {
    gulp.src("index.html")
        .pipe(gulp.dest(distOut));    
    gulp.src("html/*")
        .pipe(gulp.dest(distOut + "html"));
    gulp.src("res/*")
        .pipe(gulp.dest(distOut + "res"));
});

gulp.task("copyDev", function() {
    gulp.src("index.html")
        .pipe(gulp.dest(devOut))
        .pipe(connect.reload());
    gulp.src("js/*")
        .pipe(gulp.dest(devOut + "js"))
        .pipe(connect.reload());
    gulp.src("html/*")
        .pipe(gulp.dest(devOut + "html"))
        .pipe(connect.reload());
    gulp.src("res/*")
        .pipe(gulp.dest(devOut + "res"))
        .pipe(connect.reload());
});

gulp.task("default", ["sassDev", "watch", "copyDev", "connect"]);
gulp.task("dist", ["sassDist", "uglify", "copyDist"])