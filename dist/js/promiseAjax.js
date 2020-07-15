"use strict";function sendAjax(t){if(t.dataType||(t.dataType="json"),"json"!=t.dataType&&"string"!=t.dataType)throw new Error("想要的数据类型参数不正确，只接受json或string");if(!t.url)throw new Error("请求的url不能为空");if("[object String]"!=Object.prototype.toString.call(t.url))throw new Error("请求的url不是一个正确的url");if(t.type||(t.type="get"),"get"!=t.type&&"post"!=t.type)throw new Error("请求方式的参数必须是get或post");if(t.data)if("[object String]"==Object.prototype.toString.call(t.data)&&-1!=t.data.indexOf("="))t.data=t.data;else{if("[object Object]"!=Object.prototype.toString.call(t.data))throw new Error("传入的数据类型不正确，只接受字符串或对象");var e="",r="";for(var a in t.data)e+=r+a+"="+t.data[a],r="&";t.data=e}if("get"==t.type&&(t.url+="?"+t.data),null==t.async&&(t.async=!0),"[object Boolean]"!=Object.prototype.toString.call(t.async))throw new Error("是否异步的参数必须是一个布尔值");var o;t.success||(t.success=function(){}),t.error||(t.error=function(){});try{o=new XMLHttpRequest}catch(t){o=new ActiveXObject("Microsoft.XMLHTTP")}o.open(t.type,t.url,t.async),o.onreadystatechange=function(){4===o.readyState&&(200<=o.status&&o.status<300?(res=o.responseText,"json"===t.dataType&&(res=JSON.parse(res)),t.success(res)):t.error())},"post"===t.type&&(o.setRequestHeader("content-type","application/x-www-form-urlencoded"),t.data)?o.send(t.data):o.send()}function pAjax(s){return new Promise(function(e,r){if(s.dataType||(s.dataType="json"),"json"!=s.dataType&&"string"!=s.dataType)throw new Error("想要的数据类型参数不正确，只接受json或string");if(!s.url)throw new Error("请求的url不能为空");if("[object String]"!=Object.prototype.toString.call(s.url))throw new Error("请求的url不是一个正确的url");if(s.type||(s.type="get"),"get"!=s.type&&"post"!=s.type)throw new Error("请求方式的参数必须是get或post");if(s.data)if("[object String]"==Object.prototype.toString.call(s.data)&&-1!=s.data.indexOf("="))s.data=s.data;else{if("[object Object]"!=Object.prototype.toString.call(s.data))throw new Error("传入的数据类型不正确，只接受字符串或对象");var t="",a="";for(var o in s.data)t+=a+o+"="+s.data[o],a="&";s.data=t}if("get"==s.type&&(s.url+="?"+s.data),null==s.async&&(s.async=!0),"[object Boolean]"!=Object.prototype.toString.call(s.async))throw new Error("是否异步的参数必须是一个布尔值");var n;try{n=new XMLHttpRequest}catch(t){n=new ActiveXObject("Microsoft.XMLHTTP")}n.open(s.type,s.url,s.async),n.onreadystatechange=function(){var t;4===n.readyState&&(200<=n.status&&n.status<300?(t=n.responseText,"json"===s.dataType&&(t=JSON.parse(t)),e(t)):r())},"post"===s.type&&(n.setRequestHeader("content-type","application/x-www-form-urlencoded"),s.data)?n.send(s.data):n.send()})}