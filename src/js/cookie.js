/**
 * 获取cookie的函数
 * @param {1} key 将要获取的cookie的键
 */
function getCookie(key){
    var cookies = document.cookie;
    var arr = cookies.split("; ");
    var length = arr.length;
    for(var i=0;i<length;i++){
        var brr = arr[i].split("=");
        if(brr[0]===key){
            return brr[1];
        }
    }
}
/**
 * 设置cookie的函数
 * @param {1} key 要设置的cookie的键
 * @param {2} value 要设置的cookie的值
 * @param {3} seconds 要设置的cookie的有效期   多少秒之后
 * @param {4} path 要设置的cookie有效的路径
 */
function setCookie(key,value,seconds=0,path="/"){
    if(seconds==0){
        document.cookie = key + "=" + value + ";path="+path;
    }else{
        var date = new Date(+new Date()-8*3600*1000+seconds*1000);
        document.cookie = key + "=" + value + ";expires="+date+";path="+path;
    }
    
}
/**
 * 删除cookie的方法
 * @param {1} key 将要删除的cookie的键
 * @param {2} path 将要删除的cookie的有效路径
 */
function removeCookie(key,path="/"){
    setCookie(key,null,-1,path);
}