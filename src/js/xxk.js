xxk();
function xxk(){
        var xhr=new XMLHttpRequest();
        xhr.open("get","../assets/data.json");
        xhr.onreadystatechange=function(){
            if(xhr.status>=200 && xhr.status<300 && xhr.readyState==4){
                var res=JSON.parse(xhr.responseText);
           var arr1=res[0];
           $(".cate-menu-item").hover(function(){
            $(this)
               .css({
                background:"rgba(255,255,255,.8)",
                width:"100%"
            })
              .siblings().css({
                background:"#f10180"
            }).parent().siblings().attr("style","display:block")
            var index=$(this).index();
            // console.log(arr1[index].data)
            var str="";
            // var title=arr1[index].data.title;
                for(let i=0;i<arr1[index].data.length;i++){
                    for(let key in arr1[index].data[i]){
                    // console.log(arr1[index].data[i][key]);
                    if(key=="title")
                    {var title=arr1[index].data[i][key];
                    str+=`<div class="box3"><span>${title}></span>`
                    }else{
                    for(var j in arr1[index].data[i][key]){
                        str+=`
                           <li>${arr1[index].data[i][key][j]}</li>`;
                          
                    }
                    str+=`</div>`
                };	
                }
                }
            document.querySelector(".ol_one").innerHTML=str;
        },function(){
            $(this).parent().siblings().attr("style","display:none")
        })
            }
           
        }
        xhr.send();
}
