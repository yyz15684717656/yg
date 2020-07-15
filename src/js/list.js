req();
function req(){
    $.ajax({
        url:"../assets/data.json",
        method:"get",
    }).then(res=>{
        // console.log(res[2]);
        //获取地址栏id的值
        var params=window.location.search;
        var reg = /id=(\d+)/;
        var id = params.match(reg)[1];
        var str="";
        var gd="";
        var arr=[];
        for(var j=0;j<res[1].length;j++){
            if(res[1][j].id==id){
                gd+=`
                <p class="title">${res[1][j].title}<span>${res[1][j].dazhe}</span></p>`
            }
        }
        $(".list_content_top").html(gd);
        //默认请求渲染样式
       for(var i=0;i<res[2].length;i++){
           if(res[2][i].id==id){
            arr.push(res[2][i].data);
           var  arr1= arr[0].slice(0);
           var  arr2=arr[0].slice(0);
           var  arr3=arr[0].slice(0);
            console.log(arr===arr1,"aaa");
            arr=arr[0];
             str=bb(arr);
                $("#a_1").click(function(e){
                if(e.target.innerHTML==="价格"){
                    $(".list_show").empty();
                    arr=jiage(arr,"sale",true);
                    var str=bb(arr);
                    $(".list_show").html(str);
                }
                if(e.target.innerHTML==="综合"){
                    $(".list_show").empty();
                    var str=bb(arr1);
                    $(".list_show").html(str);
                }
                if(e.target.innerHTML==="折扣"){
                    $(".list_show").empty();
                    arr2=jiage(arr2,"dis",false)
                    var str=bb(arr2);
                    $(".list_show").html(str);
                }
                if(e.target.innerHTML==="销量"){
                    $(".list_show").empty();
                    arr3=jiage(arr3,"count",true)
                    var str=bb(arr3);
                    $(".list_show").html(str);
                }
                })
                // for(var k=0;k<arr.length;k++){
                //     str+=`
                //     <div id="box8">
                //     <a href="javascript:;">
                //         <img src="${arr[k].img}" alt="">
                //     </a>
                //     <p class="first">
                //         <strong class="woqu">${arr[k].tip}</strong>
                //         <span>${arr[k].price}</span><em>${arr[k].oldprice}</em><b>${arr[k].discount}</b></p>
                //     <p class="first_1">${arr[k].title}</p>
                // </div>
                // `
                // }  
           }
       }
       $(".list_show").html(str);
    })
}
function jiage(res,data,flase){
     //价格点击排序
            function compare(property,desc) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    if(desc==true){
                        // 升序排列
                        return value1 - value2;
                    }else{
                        // 降序排列
                        return value2 - value1;
                    }
                }
            }
         var aa=res.sort(compare(data,flase));
         return aa;
}
function bb(req){
    var str="";
    for(var k=0;k<req.length;k++){
       str+=`
        <div id="box8">
        <a href="javascript:;">
            <img src="${req[k].img}" alt="">
        </a>
        <p class="first">
            <strong class="woqu">${req[k].tip}</strong>
            <span>${req[k].price}</span><em>${req[k].oldprice}</em><b>${req[k].discount}</b></p>
        <p class="first_1">${req[k].title}</p>
    </div>
    `
    } 
    return str;
}
