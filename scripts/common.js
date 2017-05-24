//实现类似string.format功能
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

//获取url中的参数
function getUrlParam(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return decodeURI(returnValue);
    }
}

//页面加载完成后显示用户名
$(document).ready(function () {
    if($.cookie("userId") != '' && $.cookie("userId") != undefined){
        $("#user").text($.cookie("username"));
        $(".header_user .user-on").show();
        $(".header_user .user-off").hide();
    }
    else {
        $("#user").text("未登录");
        $(".header_user .user-on").hide();
        $(".header_user .user-off").show();
    }
})

// 选择注销后，清除cookie中用户信息并退回主页
$(".header_user #log-off").click(function () {
    alert('1');
    $.cookie("userId", '', { expires: -1, path : '/'});
    $.cookie("username", '', { expires: -1, path : '/'});
    $.cookie("password", '', { expires: -1, path : '/'});
    window.location.href = "/pet-web/index.html";
})

// $(".header_user #log-off").on("click","p",function(){
//     alert('2');
// });

//发送消息
function createMessage(user_id, receiver_id, title, content) {
    return(
        $.ajax({
            method: "post",
            url: path.basePath + 'messages.json',
            data: {user_id:user_id, receiver_id:receiver_id, title:title, content:content},
            dataType: "json",
            async: false,
        }))
}
