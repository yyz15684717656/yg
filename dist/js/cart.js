"use strict";var username=getCookie("username");username?(document.querySelector(".page-header small span").innerText=username,document.querySelector(".page-header small a.logout").onclick=function(){removeCookie("username"),document.querySelector(".page-header small").innerHTML='\n            <a class="btn btn-info" href="login.html">登陆</a>\n            <a class="btn btn-danger" href="login.html">注册</a>\n        '}):document.querySelector(".page-header small").innerHTML='\n        <a class="btn btn-info" href="login.html">登陆</a>\n        <a class="btn btn-danger" href="login.html">注册</a>\n    ';var arr,ids,data=localStorage.getItem("data");function total(){var e=0,n=0;$(".haha").each(function(t,a){$(a).parent().next().text($(a).val()*$(a).parent().prev().text().slice(1)),$(a).parent().siblings(".checkOne").children(".one").prop("checked")&&(e+=+$(a).val(),n+=+$(a).parent().next().text())}),$(".totalNum").text(e),$(".totalPrice").text(n)}data&&0!=data.length?(ids=(arr=(data=JSON.parse(data)).map(function(t){return t.id})).join(","),$.ajax({url:"../assets/data.json",type:"get",dataType:"json",success:function(){for(var t="",a=0;a<data.length;a++){var e=data[a].price.slice(1)*data[a].number;t+='\n                        <tr data-id="'.concat(data[a].id,'">\n                            <td class="checkOne"><input type="checkbox" class="one"></td>\n                            <td>').concat(data[a].title,'</td>\n                            <td><img src="').concat(data[a].spImg,'" width="50" height="50"></td>\n                            <td>').concat(data[a].price,'</td>\n                            <td>\n                                <button class="jian">-</button>\n                                <input type="number" name="number" value="').concat(data[a].number,'" class="haha">\n                                <button class="add">+</button>\n                            </td>\n                            <td>').concat(e,'</td>\n                            <td><button class="remove">删除购物车</button></td>\n                        </tr>\n                    ')}$("tbody").html(t),$(".all").click(function(){$(this).prop("checked")?($(".one").prop("checked",!0),$(".all").prop("checked",!0)):($(".one").prop("checked",!1),$(".all").prop("checked",!1)),total()}),$(".one").click(function(){Array.prototype.slice.call($(".one")).every(function(t){return $(t).prop("checked")})?$(".all").prop("checked",!0):$(".all").prop("checked",!1),total()}),$(".jian").click(function(){$(this).next().val($(this).next().val()-1),+$(this).next().val()<=1&&$(this).next().val(1);var a=$(this);data.find(function(t){return t.id==a.parent().parent().attr("data-id")}).number=+$(this).next().val(),localStorage.setItem("data",JSON.stringify(data)),total()}),$(".add").click(function(){$(this).prev().val(+$(this).prev().val()+1);var t=$(this).prev().attr("data-stock");+$(this).prev().val()>=t&&$(this).prev().val(t);var a=$(this);data.find(function(t){return t.id==a.parent().parent().attr("data-id")}).number=+$(this).prev().val(),localStorage.setItem("data",JSON.stringify(data)),total()}),total(),$(".remove").click(function(){var a=$(this),t=data.findIndex(function(t){return t.id==a.parent().parent().attr("data-id")});data.splice(t,1),localStorage.setItem("data",JSON.stringify(data)),$(this).parent().parent().remove(),0==data.length&&$(".content").html("购物车空空如也，请先添加<a href='list.html?id=1'>去列表页添加</a>")})}})):$(".content").html("购物车空空如也，请先添加<a href='list.html'>去列表页添加</a>");