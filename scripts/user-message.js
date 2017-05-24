$(document).ready(function() {
    var user_id = $.cookie("userId");
    var data = getMessages(user_id, user_id, "");
    if(data.status.code == '20000'){
        showMessages(data.data.messages);
    }
});


//获取消息列表
function getMessages(user_id, receiver_id, status) {
    var search = {};
    search['receiver_id'] = receiver_id;
    if(status && status != ''){
        search['status'] = status;
    }
    var animals;
    $.ajax({
        method: "get",
        url: path.basePath + "users/" + user_id + "/messages.json",
        data:{search: search},
        dataType: "json",
        async: false,
        success:function (data) {
            animals = data;
        }
    })
    return animals;
}

//显示消息列表
function showMessages(data) {
    console.log(data);
    $("#message-all ul").empty();
    var html = '';
    $.each(data, function(index, message)
    {
        var id = message.id;
        var title = message.title;
        var status = message.status;
        var created_at = message.created_at;
        var sender_id = message.sender.id;
        var sender_username = message.sender.username;
        var receiver_id = message.receiver.id;
        var receiver_username = message.receiver.username;

        var htmlPart = '<li class="row"> <div class="col-md-2">{sender_username}</div> <div class="col-md-6">{title}</div> <div class="col-md-2">{created_at}</div> <div class="col-md-2"><div class="hidden id">{id}</div><button>详情</button><div class="hidden fromId">{sender_id}</div></div> </li>'

        html += htmlPart.format({id:id, title:title, created_at:created_at, sender_id:sender_id, sender_username:sender_username});

    });
    $("#message-all ul").append(html);
}

//获取消息详情
function getMessage(message_id, user_id) {
    var message;
    var search = {receiver_id:user_id};
    $.ajax({
        method: "get",
        url: path.basePath + "messages/" + message_id + ".json",
        data:{user_id: user_id, search :search},
        dataType: "json",
        async: false,
        success:function (data) {
            message = data;
        }
    })
    return message;
}

//显示消息详情
function showMessage(data) {
    var id = data.id;
    var title = data.title;
    var content = data.content;
    var status = data.status == "unread" ? "未读" : "已读";
    var created_at = data.created_at;
    var sender_id = data.sender.id;
    var sender_username = data.sender.username;
    var receiver_id = data.receiver.id;
    var receiver_username = data.receiver.username;

    $("#message-sender_id").text(sender_id);
    $("#message-title").text(title);
    $("#message-content").text(content);
    $("#message-created_at").text(created_at);
    $("#message-sender").text(sender_username);
    $("#message-receiver").text(receiver_username);
}

//点击回复信息按钮
$("#reply-submit").on("click",function (e) {
    var receiver_id = $("#message-sender_id").text();
    var user_id = $.cookie("userId");
    var title = $("#show-message input[name='title']").val();
    var content = $("#show-message textarea[name='content']").val();
    var result = createMessage(user_id, receiver_id, title, content);
    if(result == true){
        alert("发送成功");
    }else {
        alert("发送失败");
    }
})

//点击消息详情
$("#message-all").on("click","button",function (e) {
    var user_id = $.cookie("userId");
    console.log(user_id);
    var message_id = $(this).prev().text();
    console.log(message_id);
    var receiver_id = $(this).next().text();
    console.log(receiver_id);
    var data = getMessage(message_id, user_id);
    console.log(data);
    if(data.status.code == '20000'){
        showMessage(data.data.message);
    }
    $('#show-message').modal(show);
})