/* //写本项目的打包配置构建
//1、导入第三方gulp模块
 const gulp=require("gulp");
 const cssmin=require("gulp-cssmin");
 const autoprefixer=require("gulp-autoprefixer");
 //不同的规则设置不同的函数
 //1、打包css 
 const cssHandle=()=>{
    //  书写打包配置
    return gulp
    .src("./src/css/first.css") //找到css中存在的要压缩的文件
    .pipe(cssmin())  //空格换行去掉
    .pipe(autoprefixer()) //自动添加前缀  传递参数为一个对象 ，告知按照什么去添加前缀  这里本来可以放置一个对象设置前缀的要求，可以下在package.json文件中，使用数组的形式存放
    // {browsers:['last 2 versions','last 3 Safari versions','last 1 Chrome versions']}
    .pipe(gulp.dest("./dist/css"));
 }
 module.exports.cssHandle=cssHandle; */
 const gulp=require("gulp");
 const cssmin=require("gulp-cssmin");
 const autoPrefixer = require("gulp-autoprefixer");
 const sass=require("gulp-sass");
 const uglify=require("gulp-uglify");
 const babel=require("gulp-babel");
 const htmlmin=require("gulp-htmlmin");
 const webserver=require("gulp-webserver");
 const del=require("del");
const fileinclude = require("gulp-file-include");
 //打包css
 const cssHandle=()=>{
    return gulp.src("./src/css/*.css")
     .pipe(cssmin())
     .pipe(autoPrefixer())
     .pipe(gulp.dest("./dist/css"));
 }
 //打包sass
 const sassHandle=()=>{
    return gulp
        .src("./src/sass/*.scss")
        //把scss转为css
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssmin())
        .pipe(gulp.dest("./dist/sass"))
 }
 //打包js
 const jsHandle=()=>{
    return gulp
    .src("./src/js/*.js")
    //es6转es5
    .pipe(babel(
       {
          presets:['@babel/env']
       }
    ))
    .pipe(uglify())//把js文件进行压缩
    .pipe(gulp.dest("./dist/js"));
 }
 //打包html
 const htmlHandle=()=>{
    return gulp
    .src("./src/views/*.html")
    .pipe(fileinclude({
       prefix:"@-@",
       basepath:"./src/components"
    }))
    .pipe(htmlmin({
       collapseWhitespace:true,//去除空格  默认为false
       collapseBooleanAttributes:true,//把值为布尔值的属性写为一个 比如 ：checked="checked"
       removeAttributeQuotes:true,//去除双引号
       removeScriptTypeAttributes:true,//去除script标签上的type属性
       removeStyleLinkTypeAttributes:true,//去除style标签 link标签上的type属性
       minifyCSS:true,//压缩内嵌的css
       minifyJS:true//压缩的js
    }))
    .pipe(gulp.dest("./dist/views"));
 }
 //第三方资源  不需要进行压缩直接就移动过去就可以
 const assetsHandle=()=>{
   return gulp
   .src("./src/assets/**")  //**表示所有内容
   .pipe(gulp.dest("./dist/assets"));
}
//图片 也不需要进行压缩  直接位移过去
const imgHandle=()=>{
   return gulp
   .src("./src/images/**")
   .pipe(gulp.dest("./dist/images"))
}
//视频
const videoHandle=()=>{
   return gulp
   .src("./src/videos/**")
   .pipe(gulp.dest("./dist/videos"))
}
//音频
const audioHandle=()=>{
   return gulp
   .src("./src/audios/**")
   .pipe(gulp.dest("./dist/audios"))
}
//删除任务  就是在压缩前把dist文件夹删掉 每次新创建一个文件夹
const delHandle=()=>{
  return del(["./dist"]);
}
//自动打开浏览器任务
const browserHandle=()=>{
   return gulp
   .src("./dist")
   .pipe(webserver({
      host:"localhost", //打开的浏览器域名
      port:8080, //端口号
      open:"views/index.html", //默认打开的浏览器页面，在dist的views文件中书写
      liverload:true, //自动刷新浏览器  当dist得到文件发生变化时，自动刷新
      proxies:[
         {
            source:"/gd",
            target:"https://www.duitang.com/napi/blog/list/by_filter_id/"
         },
         {
            source:"/yyz",
            target:"http://localhost/day7-09/daima/test.php"
         },
         {
            source:"/gy",
            target:"http://localhost"
         }
      ]
   }))
}
//配置一个监控任务  
const watchHandle=()=>{
   gulp.watch("./src/css/*.css",cssHandle);
   gulp.watch("./src/sass/*.scss",sassHandle);
   gulp.watch("./src/js/*.js",jsHandle);
   gulp.watch("./src/images/**",imgHandle);
   gulp.watch("./src/assets/**",assetsHandle);
   gulp.watch("./src/videos/**",videoHandle);
   gulp.watch("./src/audios/**",audioHandle);
   gulp.watch("./src/views/*.html",htmlHandle);
   gulp.watch("./src/components/*.html",htmlHandle);
}
module.exports.default=gulp.series(
    delHandle,
    //并行开始执行 
    gulp.parallel(cssHandle,jsHandle,sassHandle,htmlHandle,imgHandle,videoHandle,audioHandle,assetsHandle),
    browserHandle,
    watchHandle
);