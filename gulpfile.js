var gulp = require("gulp");
var connect = require("gulp-connect");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var clean = require("gulp-clean");
var imagemin = require("gulp-imagemin");

var devOut = "dev/";
var distOut = "dist/";

gulp.task("connect", function() {
    connect.server({
        root: "dev",
        livereload: true
    });
});

gulp.task("clean", function(){
    return gulp.src([devOut, distOut])
        .pipe(clean());
});

gulp.task("sassDev", function() {
    gulp.src("scss/**")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(devOut + "css"))
        .pipe(connect.reload());
});

gulp.task("watch", function() {
    gulp.watch("scss/**", ["sassDev"]);
    gulp.watch("index.html", ["copyDev"]);
    gulp.watch("html/**", ["copyDev"]);
    gulp.watch("js/**", ["copyDev"]);
});

gulp.task("uglify", function(){
    // don't uglify libs
    gulp.src("js/*")
        .pipe(uglify())
        .pipe(gulp.dest(distOut + "js"));
});
gulp.task("sassDist", function() {
    gulp.src("scss/**/*.scss")
        .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
        .pipe(gulp.dest(distOut + "css"));
});

gulp.task("copyDist", function() {
    gulp.src("index.html")
        .pipe(gulp.dest(distOut));    
    gulp.src("html/**")
        .pipe(gulp.dest(distOut + "html"));
    gulp.src("articles/**")
        .pipe(gulp.dest(distOut + "articles"));
    gulp.src("res/**")
        .pipe(imagemin())
        .pipe(gulp.dest(distOut + "res"));
    gulp.src(["*.*",
            "!gulpfile.js",
            "!package.json",
            "!README.md"])
        .pipe(gulp.dest(distOut))
        .pipe(connect.reload());
});

gulp.task("copyDev", function() {
    gulp.src("index.html")
        .pipe(gulp.dest(devOut))
        .pipe(connect.reload());
    gulp.src("js/**")
        .pipe(gulp.dest(devOut + "js"))
        .pipe(connect.reload());
    gulp.src("html/**")
        .pipe(gulp.dest(devOut + "html"))
        .pipe(connect.reload());
    gulp.src("articles/**")
        .pipe(gulp.dest(devOut + "articles"))
        .pipe(connect.reload());
    gulp.src("res/**")
        .pipe(gulp.dest(devOut + "res"))
        .pipe(connect.reload());
    gulp.src(["*.*",
            "!gulpfile.js",
            "!package.json",
            "!README.md"])
        .pipe(gulp.dest(devOut))
        .pipe(connect.reload());
});

gulp.task("default", ["sassDev", "watch", "copyDev", "connect"]);
gulp.task("dist", ["sassDist", "uglify", "copyDist"])