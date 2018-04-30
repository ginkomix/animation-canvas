var gulp = require("gulp"),
  babelify = require("babelify"),
  browserify = require("browserify"),
  connect = require("gulp-connect"),
  source = require("vinyl-source-stream"),
  browserSync = require("browser-sync"),
  del = require("del"),
  minifyCSS = require("gulp-minify-css"),
  imagemin = require("gulp-imagemin"),
  sourcemaps = require("gulp-sourcemaps");

gulp.task("default", [
  "clean",
  "html",
  "css",
  "fonts",
  "img",
  "js"
]);
gulp.task("build", ["clean", "html", "css", "fonts", "img", "js"]);




//Copy static files from html folder to build folder

gulp.task("css", function() {
  return gulp
    .src("./css/**/*.css")
    .pipe(minifyCSS())
    .pipe(gulp.dest("build/css"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("html", function() {
  return gulp
    .src("./html/**/*.html")
    .pipe(gulp.dest("./build"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("fonts", function() {
  return gulp
    .src("app/fonts/**/*.ttf")
    .pipe(gulp.dest("build/fonts"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task("img", function() {
  return gulp
    .src("app/img/**/*.(png|img)")
    .pipe(gulp.dest("build/img"))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});
//Convert ES6 ode in all js files in src/js folder and copy to
//build folder as bundle.js
gulp.task("js", function() {
  return browserify({
    entries: ["./js/index.js"]
  })
    .transform(
      babelify.configure({
        presets: ["es2015"]
      })
    )
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/js"));
});

gulp.task("clean", function(callback) {
  del(["build/**/*", "!build/images", "!build/images/**/*"], callback);
});

gulp.task("images", function() {
  return gulp
    .src("./img/**/*.(png|jpg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
});

//Start a test server with doc root at build folder and
//listening to 9001 port. Home page = http://localhost:9001
gulp.task("startServer", function() {
  browserSync({
    server: {
      baseDir: "./build"
    }
  });
  gulp.watch("./css/**/*.css", ["css"]);
  gulp.watch("./html/**/*.html", ["html"]);
  gulp.watch("./fonts/**/*.ttf", ["fonts"]);
  gulp.watch("./img/**/*.+(png|img)", ["img"]);
  gulp.watch("./js/**/*.js", ["js"]);
   gulp.watch("./build/css/**/*.css").on("change", browserSync.reload);
    gulp.watch("./build/html/**/*.htmll").on("change", browserSync.reload);
     gulp.watch("./build/fonts/**/*.ttf").on("change", browserSync.reload);
      gulp.watch("./build/img/**/*.+(png|img)").on("change", browserSync.reload);
       gulp.watch("./build/js/**/*.js").on("change", browserSync.reload);
});
