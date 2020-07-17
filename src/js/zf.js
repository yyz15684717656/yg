var username = getCookie("username");
if(username){
    document.querySelector(".page-header small span").innerText = username;
    document.querySelector(".page-header small a.logout").onclick = function(){
        removeCookie("username");
        document.querySelector(".page-header small").innerHTML = `
            <a class="btn btn-info" href="login.html">登陆</a>
            <a class="btn btn-danger" href="login.html">注册</a>
        `
    }
}else{
    document.querySelector(".page-header small").innerHTML = `
        <a class="btn btn-info" href="login.html">登陆</a>
        <a class="btn btn-danger" href="login.html">注册</a>
    `
}