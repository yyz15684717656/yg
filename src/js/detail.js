var params = window.location.search;
var reg = /id=(\d+)/;
var p = params.match(reg)[1];
var reg = /ids=(\d+)/;
var p1 = params.match(reg)[1];
// if(!p){
//     alert("非法访问");
//     location.href = "index.html";
// }
var id = p;
var ids=p1;
// 需要使用id发送ajax，从数据库中将当前这个商品的信息请求回来
sendAjax({
    url:"../assets/data.json",
    type:"get",
    success:function(res){
          
                var data = res[3];
                data= data.filter(function(v){
                    return v.id==ids
            })
                data=data[0].data.filter(function(v){
                  return v["_id"]==id
                })
                data=data[0]
            $(".middle img").attr("src",data.img[0]);
            document.querySelector(".big").style.backgroundImage = "url("+data.img[0]+")";
            $("#goodsname").text(data.title);
            $("#price").text(data.price);
            $(".intro").html(`<span class="fw">商品介绍:</span>`+data.intro);
            var str=`<b>颜色：</b>`;
            for(var i=0;i<data.color.length;i++){
                str+=`
                    <span class="btn btn-warning bgcolor"><em></em>${data.color[i]}</span>
                     `
            }
            $(".fontColor").html(str);
            var arrc=[];
            var arrb=changeColor(arrc);
            bgcolor();
            //小图渲染
            var str1="";
           for(var j=0;j<data["smail_img"].length;j++){
               str1+=`
               <li><a href="javascript:;"><img src="${data["smail_img"][j]}" alt=""></a></li>
               `
           }
           $(".uls").html(str1);
           //调用addCart将数据信息存储到本地中
           addCart(id,data.title,data.price,data.img[0],arrb);
           var enlarge = new Enlarge("box");
    }
   
});
function addCart(spid,title,spprice,spImg,bgcolor){
    // console.log(spid,title,spprice,spImg,bgcolor)
    $(".addCart").click(function(e){
        var num=document.querySelector(".num").value - 0;
        var username = getCookie("username");
        // if(!username){ // 没有登陆
        //     alert("请先登陆");
        //     location.href = 'login.html'; 
        //     return false;
        // }
        var data = localStorage.getItem("data");
        if(data){ // 有数据
            data = JSON.parse(data);
            // 是否有当前这个商品的数据
            // 判断data数组中每一个元素(对象)中的id和当前商品的id是否相等
            var index = data.findIndex(function(v){
                return v.id == id;
            }); 
            // console.log(index);
            if(index>=0){
                data[index].number += num;
            }else{
                var obj = {
                    username:username,
                    id:spid,
                    title:title,
                    price:spprice,
                    spImg:spImg,
                    number:num,
                    bgcolor:bgcolor
                };
                data.push(obj);
            }
            localStorage.setItem("data",JSON.stringify(data));
        }else{   // 没有本地存储
            var data = []; // 空数组
            var obj = { // 放入当前商品的数据
                username:username,
                id:spid,
                title:title,
                price:spprice,
                spImg:spImg,
                number:num,
                bgcolor:bgcolor
            };
            data.push(obj);
            localStorage.setItem("data",JSON.stringify(data));
        }
        alert("添加购物车成功");
        location.href = "cart.html"
        return false;
    });
}
//放大镜
function Enlarge(classname){
    // 将需要操作的元素都获取成对象属性
    this.box = document.querySelector("."+classname);
    this.m = this.box.querySelector(".m");
    this.middleImg = this.box.querySelector(".m img");
    this.middle = this.box.querySelector(".middle");
    this.shade = this.box.querySelector(".shade");
    this.ulis = this.box.querySelectorAll("ul li");
    this.big = this.box.querySelector(".big");
    var _this = this;
    // 绑定事件
    this.middle.onmouseenter = ()=>{
        this.over();
    }
    this.middle.onmouseleave= ()=>{
        this.out();
    }
    // 点击小图的事件
    for(var i=0;i<this.ulis.length;i++){
        this.ulis[i].onclick = function(){
            _this.click(this);
        }
    }
}
// 定义点击小图方法
Enlarge.prototype.click = function(ele){
    for(var i=0;i<this.ulis.length;i++){
        this.ulis[i].style.borderColor = "#0f0"
    }
    ele.style.borderColor = "#f00";
    // 需要切换对应的中等图片
    // 先获取当前点击的li中的图片的路径
    // 先找到小图片这个标签
    var smallImg = ele.firstElementChild.firstElementChild;
    // 通过这个标签的src找路径 - src属性获取
    var smallPath = smallImg.getAttribute("src");
    // './images/small2.jpg'
    // str.slice(开始下标);
    // 拼接中等图片的路径
    var middlePath =smallPath;
    // 给中等图片的img标签设置src属性
    this.middleImg.setAttribute("src",middlePath);
    // 设置大图的路径
    var bigPath =smallPath;
    // 设置给大盒子的背景
    this.big.style.backgroundImage = "url("+bigPath+")"
}
// 定义鼠标离开中的图片上的方法
Enlarge.prototype.out = function(){
    this.shade.style.display = "none"
    this.big.style.display = "none"
}
// 定义鼠标放到中等图片上的方法
Enlarge.prototype.over = function(){
    // console.log(123);
    this.shade.style.display = "block"
    this.big.style.display = "block"
    var _this = this;
    // 需要一个鼠标移动事件
    this.middle.onmousemove=function(e){
        // console.log(123);
        // 拖拽- 需要获取光标位置
        var e = e || window.event;
        var x = e.pageX;
        var y = e.pageY;
        // console.log(x,y);
        var l = x - _this.box.offsetLeft - this.offsetLeft - _this.shade.offsetWidth/2;
        if(l<=0){
            l=0;
        }
        if(l>=this.clientWidth - _this.shade.offsetWidth){
            l=this.clientWidth - _this.shade.offsetWidth
        }
        _this.shade.style.left = l + "px";
        var t = y - _this.box.offsetTop - this.offsetTop - _this.shade.offsetHeight/2;
        if(t<=0){
            t = 0;
        }
        if(t>=this.clientHeight - _this.shade.offsetHeight){
            t=this.clientHeight - _this.shade.offsetHeight
        }
        _this.shade.style.top = t + "px";
        // 大图也跟着移动
        _this.fangda(l,t);
    }
}
Enlarge.prototype.fangda = function(l,t){
    // 需要计算移动过的比例
    // 遮罩距离左边的距离 - l
    // 大图的宽度
    var w = this.middle.clientWidth;
    // 比例就是 l/w;
    var percentw = l/w;
    // 根据这个比例计算大图的left值
    // 这个比例就应该等于 大图的left/大图的宽度（大图宽度设置过背景大小）
    // 获取背景大小
    var style = window.getComputedStyle(this.big).backgroundSize;
    // 获取到的是宽px 高px组成的一个字符串 ，需要使用空格分隔获取到具体的宽和高
    var bigW = parseInt(style.split(" ")[0]);
    // 大图的left就是比例 * 大图的宽
    var bigL = percentw * bigW;

    // 高度
    var h = this.middle.clientHeight;
    var percenth = t/h;
    var bigH = parseInt(style.split(" ")[1]);
    var bigT = percenth * bigH;
    // 需要设置给背景的定位
    this.big.style.backgroundPosition = `-${bigL}px -${bigT}px`;
    // console.log(bigW);
}
//商品按钮背景变换
function bgcolor(){
  var text=$(".bgcolor").first().text();
  var text1=$(".bgcolor").first().next().text();
  var text2=$(".bgcolor").first().next().next().text();
  var text3=$(".bgcolor").first().next().next().next().text();
  colorpd(text);
  colorpd(text1);
  colorpd(text2);
  colorpd(text3);
}
function colorpd(text){
    if(text=="红色"){
        text="red";
    }else if(text=="白色"){
        text="#fff";
    }else if(text=="紫色"){
        text="purple";
    }else if(text=="绿色"){
        text="green";
    }
    $(".bgcolor").first().css({background:"text"});
    $(".bgcolor").first().next().css({background:"purple"});
    $(".bgcolor").first().next().next().css({background:"blue"});
    $(".bgcolor").first().next().next().next().css({background:"green"});
}
//商品颜色选择
function changeColor(arrc){
    $(".bgcolor").click(function(){
        $(this).children("em").css({
            backgroundImage:"url('../images/duihao.jpg')",
            backgroundSize:10,
            backgroundColor:"#fff",
            zIndex:2,
            width:10,
            height:10,
            display:"block",
            position:"absolute",
            right:0,
            bottom:0
        })
        arrc.push($(this));
    })
    return arrc
}
