$("#register-form").submit(function (e) {
    //阻止按钮的默认提交操作
    e.preventDefault();
    var data = $('#register-form').serialize();
    var result = register(path.basePath, data);
    if(result.status.code == "20000"){
        alert("注册成功");
        window.location.href = "login.html";
    }
})

function register(basePath, data) {
    var result = null;
    $.ajax({
        method : "post",
        url : basePath + "users.json",
        data : data,
        dataType : "json",
        async : false,
        success : function (data) {
            result = data;
        }
    });
    return result;
}