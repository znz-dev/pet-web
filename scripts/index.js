//页面加载完成后显示用户名
$(document).ready(function () {
    if($.cookie("userId") != '' && $.cookie("userId") != undefined){
        $("#user").text($.cookie("username"));
        $(".header_user .user-on").show();
        $(".header_user .user-off").hide();
    }
    else {
        $(".header_user .user-on").hide();
        $(".header_user .user-off").show();
    }
})

//选择注销后，清除cookie中用户信息并刷新页面
$(".header_user #log-off").click(function () {
    $.cookie("userId", '', { expires: -1, path : '/'});
    $.cookie("username", '', { expires: -1, path : '/'});
    $.cookie("password", '', { expires: -1, path : '/'});
    window.location.href = "/pet-web/index.html";
})