// $.cookie('the_cookie', '', { expires: -1 });

$("#login-form").submit(function (e) {
    var username = $('#login-form #username').val();
    var password = $('#login-form #password').val();
    //阻止按钮的默认提交操作
    e.preventDefault();
    var data = $('#login-form').serialize();
    var result = login(data);
    if(result.status.code == "20000"){
        writeUserCookie(result.data.user.id, username, password);
        alert("登陆成功");
        window.location.href = "/pet-web/index.html";
    }
    else{
        alert("登陆失败");
    }
})

function login(data) {
    var result = null;
    $.ajax({
        method : "post",
        url : path.basePath + "login.json",
        data : data,
        dataType : "json",
        async : false,
        success : function (data) {
            result = data;
        }
    });
    return result;
}

function writeUserCookie(userId, username, password) {
    //一些加密处理运算，暂时没有
    $.cookie("userId", userId, { expires: 1, path : '/'});
    $.cookie("password", password, { expires: 1, path : '/'});
    $.cookie("username", username, { expires: 1, path : '/'});
}

