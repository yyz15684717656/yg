"use strict";var username=getCookie("username");username?(document.querySelector(".page-header small span").innerText=username,document.querySelector(".page-header small a.logout").onclick=function(){removeCookie("username"),document.querySelector(".page-header small").innerHTML='\n            <a class="btn btn-info" href="login.html">登陆</a>\n            <a class="btn btn-danger" href="login.html">注册</a>\n        '}):document.querySelector(".page-header small").innerHTML='\n        <a class="btn btn-info" href="login.html">登陆</a>\n        <a class="btn btn-danger" href="login.html">注册</a>\n    ';