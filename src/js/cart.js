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
// 请求数据
var data = localStorage.getItem("data");
if(!data || data.length == 0){
    $(".content").html("购物车空空如也，请先添加<a href='list.html'>去列表页添加</a>");
}else{
    data = JSON.parse(data); 
    // 购物车有数据
    var arr = data.map(function(v){
        return v.id;
    });
    // console.log(arr);
    var ids = arr.join(",");
    $.ajax({
        url:"../assets/data.json",
        type:"get",
        dataType:"json",
        success:function(res){
                var str = '';
                for(var i=0;i<data.length;i++){
                    var num=data[i].price.slice(1)*data[i].number;
                    str += `
                        <tr data-id="${data[i].id}">
                            <td class="checkOne"><input type="checkbox" class="one"></td>
                            <td>${data[i].title}</td>
                            <td><img src="${data[i].spImg}" width="50" height="50"></td>
                            <td>${data[i].price}</td>
                            <td>
                                <button class="jian">-</button>
                                <input type="number" name="number" value="${data[i].number}" class="haha">
                                <button class="add">+</button>
                            </td>
                            <td>${num}</td>
                            <td><button class="remove">删除购物车</button></td>
                        </tr>
                    `
                }
                $("tbody").html(str);
                // 全选功能 - 注意：应该在ajax数据的回调函数后面做-不要放到ajax外面，因为ajax是异步的
                $(".all").click(function(){
                    if($(this).prop("checked")){
                        $(".one").prop("checked",true)
                        $(".all").prop("checked",true)
                    }else{
                        $(".one").prop("checked",false)
                        $(".all").prop("checked",false)
                    }
                    total();
                });
                // 每个小复选框点击事件
                $(".one").click(function(){
                    var xuan = Array.prototype.slice.call($(".one")).every(function(v){
                        return $(v).prop("checked");
                    });
                    // console.log(xuan);
                    if(xuan){
                        $(".all").prop("checked",true)
                    }else{
                        $(".all").prop("checked",false)
                    }
                    total();
                });
                // 数量加减
                $(".jian").click(function(){
                    $(this).next().val($(this).next().val()-0-1);
                    if($(this).next().val()-0<=1){
                        $(this).next().val(1)
                    }
                    // 改变本地存储中的数量
                    // console.log(data);
                    var that = $(this);
                    var brr = data.find(function(v){
                        return v.id == that.parent().parent().attr("data-id");
                    });
                    brr.number = $(this).next().val()-0;
                    // console.log(data);
                    localStorage.setItem("data",JSON.stringify(data));
                    total();
                })
                $(".add").click(function(){
                    // 需要获取库存
                    $(this).prev().val($(this).prev().val()-0+1);
                    var stock = $(this).prev().attr("data-stock")
                    if($(this).prev().val()-0>=stock){
                        $(this).prev().val(stock)
                    }
                    var that = $(this);
                    var brr = data.find(function(v){
                        return v.id == that.parent().parent().attr("data-id");
                    });
                    brr.number = $(this).prev().val()-0;
                    // console.log(data);
                    localStorage.setItem("data",JSON.stringify(data));
                    total();
                });
                total();
                // 删除购物车的操作
                $(".remove").click(function(){
                    // 将当前这条商品从本地存储中删掉
                    // 找到当前整个商品在本地存储中的位置
                    var that = $(this);
                    var index = data.findIndex(function(v){
                        return v.id == that.parent().parent().attr("data-id");
                    });
                    data.splice(index,1);
                    // console.log(data);
                    localStorage.setItem("data",JSON.stringify(data));
                    $(this).parent().parent().remove();
                    if(data.length==0){
                        $(".content").html("购物车空空如也，请先添加<a href='list.html?id=1'>去列表页添加</a>");
                    }
                });
        }
    });
}
// 计算小计、总数量、总价格的函数
function total(){
    var totalNum = 0;
    var totalPrice = 0;
    $(".haha").each(function(i,v){
        $(v).parent().next().text($(v).val()*$(v).parent().prev().text().slice(1));
        // console.log($(v).parent().siblings(".checkOne"));
        if($(v).parent().siblings(".checkOne").children(".one").prop("checked")){
            totalNum += $(v).val()-0;
            totalPrice += $(v).parent().next().text()-0;
        }
    });
    // console.log(totalNum);
    $(".totalNum").text(totalNum);
    $(".totalPrice").text(totalPrice);
}