newContent();
function  newContent(){
   
    $.ajax({
        url:"../assets/data.json",
        method:"get",
    }).then(res=>{
        console.log(res[1]);
        var str="";
       for(var i=0;i<res[1].length;i++){
            str+=`
                <div class="box7" index="${res[1][i].id}">
                <img src="${res[1][i]["img"]}" />
                <p>${res[1][i].title}</p>
                <span>${res[1][i].dazhe}
                <em>${res[1][i].content}</em></span>
                </div>
            `
       }
       $(".new_content").html(str);
       window.onload=function(){
        $(".box7").click(function(){
          let result=$(this).attr("index");
          location.href=`list.html?id=${result}`
        })
    }
    })
}