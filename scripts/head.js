
$(document).ready(function () {
    var userId = $.cookie("userId");
    var username = $.cookie("username");
    var password = $.cookie("password");

    if($.cookie("userId") != '' && typeof($.cookie("userId")) !== undefined){
        $("#user").text(username);
        $(".header_user .user-on").show();
        $(".header_user .user-off").hide();
    }
    else {
        $(".header_user .user-on").hide();
        $(".header_user .user-off").show();
    }
})

$(".header_user #log-off").click(function () {
    $.cookie('userId','');
    $.cookie('username','');
    $.cookie('password','');
    window.location.href = "/pet-web/index.html";
})
