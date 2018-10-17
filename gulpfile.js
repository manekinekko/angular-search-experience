var gulp = require("gulp"),
    rename = require("gulp-rename"),
    rimraf = require("rimraf");

gulp.task("create-public", function() {
  setTimeout(function() {
    gulp.src(["./dist/angular-search-experience-browser/**/*"])
      .pipe(gulp.dest("./dist/public"));

    gulp.src(["./dist/angular-search-experience-browser/**/*"])
    .pipe(gulp.dest("./functions/dist/browser"));

    gulp.src("./dist/angular-search-experience-server/**/*")
      .pipe(gulp.dest("./functions/dist/server"));
  }, 1000);
});

gulp.task("delete-public", function() {
  return rimraf("./dist/public/", function(error) {
    console.log("Failed to delete 'dist/public' folder, reasons:");
    console.log(error);
  });
});

gulp.task("delete-dist", function() {
  return rimraf("./functions/dist/", function(error) {
    console.log("Failed to delete './functions/dist' folder, reasons:");
    console.log(error);
  });
});

/*
* Rename `index.html` to `index2.html` in `public/` directory,
* so that Firebase hosting fail to find the default document
* and SSR function on Firebase functions will be kicked in
*/
gulp.task("firebase:ssr", ["delete-public", "delete-dist", "create-public"], function() {
  return gulp.src("./dist/public/index.html")
      .pipe(rename("index2.html"))
      .pipe(gulp.dest("./dist/public"));
});
