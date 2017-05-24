$('#fileupload-form').on('submit',(function(e) {
    e.preventDefault();
    //序列化表单
    var serializeData = $(this).serialize();

    // var formData = new FormData(this);
    $.ajax({
        type:'PUT',
        url: path.basePath + "users/" +$.cookie("userId")+ ".json",
        dataType: 'json',
        data: serializeData,
        contentType: false,
        cache: false,
        processData:false,
        beforeSubmit: function() {
        //上传图片之前的处理
        },
        success:function(){
            alert('sh');
        },
        error:function(data){
            alert('上传图片出错');
        }
    });
}));


$(document).ready(function() {
    var userId = $.cookie("userId");
    var data = getUserInfo(userId);

    if(data.status.code == '20000'){
        showUserInfo(data.data.user);
    }
});

//获取用户信息
function getUserInfo(userId) {
    var user;
    $.ajax({
        method : "get",
        url : path.basePath + "users/" + userId + ".json",
        data :{},
        dataType : "json",
        async : false,
        success :function (data) {
            user = data;
        }
    })
    return user;
}

//显示用户信息
function showUserInfo(data) {
    console.log(data);
    var id = data.id;
    var avatar = data.avatar;
    var username = data.username;
    var real_name = data.real_name;
    var phone = data.phone;
    var email = data.email;

    $("#info-all #username").text(username);
    $("#info-all #real_name").text(real_name);
    $("#info-all #phone").text(phone);
    $("#info-all #email").text(email);

    $("#changeInfo .real_name input").val(real_name);
    $("#changeInfo .phone input").val(phone);
    $("#changeInfo .email input").val(email);

    $(".avatar").attr("src",avatar);
}

//更新用户信息
function updateUserInfo(userId, data) {
    $.ajax({
        method : "PUT",
        url : path.basePath + "users/" + userId + ".json",
        data :data,
        dataType : "json",
        async : false,
        success :function (data) {
            alert("修改成功");
        },
        error :function (data) {
            console.log(data);
            alert("修改失败");
        }
    })
}

//点击更新信息按钮
$("#changeInfo_submit").on("click",function () {
    var userId = $.cookie("userId");
    var data = {};
    data['real_name'] = $("#changeInfo .real_name input").val();
    data['phone'] = $("#changeInfo .phone input").val();
    data['email'] = $("#changeInfo .email input").val();
    updateUserInfo(userId, data);
    location.reload();
})

//修改头像
function updateAvatar(userId, data) {
    $.ajax({
        method : "PUT",
        url : path.basePath + "users/" + userId + ".json",
        data : data,
        dataType: "json",
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success :function (data) {
            alert("修改成功");
        },
        error :function (data) {
            console.log(data);
            alert("修改失败");
        }
    })
}

//点击修改头像按钮
$("#change-avatar_submit").on("click",function (e) {
    var formData = new FormData($( "#change-avatar" )[0]);
    var userId = $.cookie("userId");
    updateAvatar(userId, formData);

})