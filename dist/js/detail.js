"use strict";var params=window.location.search,reg=/id=(\d+)/,p=params.match(reg)[1],reg=/ids=(\d+)/,p1=params.match(reg)[1],id=p,ids=p1;function addCart(n,l,a,c,d){$(".addCart").click(function(t){var e,i,o=+document.querySelector(".num").value,r=getCookie("username"),s=localStorage.getItem("data");return s?0<=(e=(s=JSON.parse(s)).findIndex(function(t){return t.id==id}))?s[e].number+=o:(i={username:r,id:n,title:l,price:a,spImg:c,number:o,bgcolor:d},s.push(i)):(s=[]).push(i={username:r,id:n,title:l,price:a,spImg:c,number:o,bgcolor:d}),localStorage.setItem("data",JSON.stringify(s)),alert("添加购物车成功"),!(location.href="cart.html")})}function Enlarge(t){var e=this;this.box=document.querySelector("."+t),this.m=this.box.querySelector(".m"),this.middleImg=this.box.querySelector(".m img"),this.middle=this.box.querySelector(".middle"),this.shade=this.box.querySelector(".shade"),this.ulis=this.box.querySelectorAll("ul li"),this.big=this.box.querySelector(".big");var i=this;this.middle.onmouseenter=function(){e.over()},this.middle.onmouseleave=function(){e.out()};for(var o=0;o<this.ulis.length;o++)this.ulis[o].onclick=function(){i.click(this)}}function bgcolor(){var t=$(".bgcolor").first().text(),e=$(".bgcolor").first().next().text(),i=$(".bgcolor").first().next().next().text(),o=$(".bgcolor").first().next().next().next().text();colorpd(t),colorpd(e),colorpd(i),colorpd(o)}function colorpd(t){"红色"==t?t="red":"白色"==t?t="#fff":"紫色"==t?t="purple":"绿色"==t&&(t="green"),$(".bgcolor").first().css({background:"text"}),$(".bgcolor").first().next().css({background:"purple"}),$(".bgcolor").first().next().next().css({background:"blue"}),$(".bgcolor").first().next().next().next().css({background:"green"})}function changeColor(t){return $(".bgcolor").click(function(){$(this).children("em").css({backgroundImage:"url('../images/duihao.jpg')",backgroundSize:10,backgroundColor:"#fff",zIndex:2,width:10,height:10,display:"block",position:"absolute",right:0,bottom:0}),t.push($(this))}),t}sendAjax({url:"../assets/data.json",type:"get",success:function(t){var e=t[3];e=(e=(e=e.filter(function(t){return t.id==ids}))[0].data.filter(function(t){return t._id==id}))[0],$(".middle img").attr("src",e.img[0]),document.querySelector(".big").style.backgroundImage="url("+e.img[0]+")",$("#goodsname").text(e.title),$("#price").text(e.price),$(".intro").html('<span class="fw">商品介绍:</span>'+e.intro);for(var i="<b>颜色：</b>",o=0;o<e.color.length;o++)i+='\n                    <span class="btn btn-warning bgcolor"><em></em>'.concat(e.color[o],"</span>\n                     ");$(".fontColor").html(i);var r=changeColor([]);bgcolor();for(var s="",n=0;n<e.smail_img.length;n++)s+='\n               <li><a href="javascript:;"><img src="'.concat(e.smail_img[n],'" alt=""></a></li>\n               ');$(".uls").html(s),addCart(id,e.title,e.price,e.img[0],r);new Enlarge("box")}}),Enlarge.prototype.click=function(t){for(var e=0;e<this.ulis.length;e++)this.ulis[e].style.borderColor="#0f0";t.style.borderColor="#f00";var i=t.firstElementChild.firstElementChild.getAttribute("src");this.middleImg.setAttribute("src",i),this.big.style.backgroundImage="url("+i+")"},Enlarge.prototype.out=function(){this.shade.style.display="none",this.big.style.display="none"},Enlarge.prototype.over=function(){this.shade.style.display="block",this.big.style.display="block";var s=this;this.middle.onmousemove=function(t){var e=(t=t||window.event).pageX,i=t.pageY,o=e-s.box.offsetLeft-this.offsetLeft-s.shade.offsetWidth/2;o<=0&&(o=0),o>=this.clientWidth-s.shade.offsetWidth&&(o=this.clientWidth-s.shade.offsetWidth),s.shade.style.left=o+"px";var r=i-s.box.offsetTop-this.offsetTop-s.shade.offsetHeight/2;r<=0&&(r=0),r>=this.clientHeight-s.shade.offsetHeight&&(r=this.clientHeight-s.shade.offsetHeight),s.shade.style.top=r+"px",s.fangda(o,r)}},Enlarge.prototype.fangda=function(t,e){var i=t/this.middle.clientWidth,o=window.getComputedStyle(this.big).backgroundSize,r=i*parseInt(o.split(" ")[0]),s=e/this.middle.clientHeight*parseInt(o.split(" ")[1]);this.big.style.backgroundPosition="-".concat(r,"px -").concat(s,"px")};