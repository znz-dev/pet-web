$(document).ready(function() {
    var post_id = getUrlParam('post_id');
    var post_info = getPostInfo(post_id, 1, 12);
    if(post_info.status.code == '20000'){
        showPostInfo(post_info.data.post_replies);
        showPage(post_info.data.reply_pages,1);
    }
});

//获取帖子内容
function getPostInfo(post_id, page, per) {
    var post;
    $.ajax({
        method : "get",
        url : path.basePath + "posts/" + post_id + ".json",
        data :{per:per, page:page},
        dataType : "json",
        async : false,
        success :function (data) {
            post = data;
        }
    })
    return post;
}

//显示帖子内容
function showPostInfo(data) {
    $(".post-info").empty();
    var html = '';
    $.each(data, function(index, info)
    {
        var id = info.id;
        var content = info.content;
        var user_id = info.user.id;
        var user_username = info.user.username;
        var user_avatar_url = info.user.avatar.url != null ? path.basePath+info.user.avatar.url : '/pet-web/images/头像.gif';

        var htmlPart = '<li class="row"> <div class="col-md-2 post-picture"> <img src="{user_avatar_url}" alt="头像"> <p>{user_username}</p> </div> <div class="col-md-10"> <p>{content}</p> </div> </li>'

        html += htmlPart.format({content:content, user_username:user_username, user_avatar_url:user_avatar_url});
    });
    $(".post-info").append(html);
}

//回复帖子
function replyPost(post_id, user_id, content) {
    return(
        $.ajax({
            method: "post",
            url: path.basePath + 'posts/' + post_id + '/post_replies.json',
            data: {user_id:user_id, content:content},
            dataType: "json",
            async: false,
        }))
}

//显示分页
function showPage(page,page_index) {
    $(".pagination").empty();
    if(page == null){
        page = 1;
    }
    var html = '<li><a href="javascript:void(0)">&laquo;</a></li>';
    for(var i = 1; i < page+1; i++){
        if(page_index == i){
            html += '<li class="active" page="' + i + '"><a href="javascript:void(0)">' + i + '</a></li>';
        }
        else{
            html += '<li page="' + i + '"><a href="javascript:void(0)">' + i + '</a></li>';
        }
    }
    html += '<li><a href="javascript:void(0)">&raquo;</a></li>';
    $(".pagination").append(html);
}

//分页跳转
$('.pagination').on('click',function(e){
    var page = e.target.text;
    var post_id = getUrlParam('post_id');
    var post_info = getPostInfo(post_id, page, 12);
    if(post_info.status.code == '20000'){
        showPostInfo(post_info.data.post_replies);
        showPage(post_info.data.reply_pages,page);
    }
})

//回复按钮
$('#create-reply-submit').on('click',function (e) {
    var post_id = getUrlParam('post_id');
    var user_id = $.cookie("userId");
    var content = $('#create-reply textarea[name = "content"]').val();
    var result = replyPost(post_id, user_id, content);
    console.log(result);
    if(result.responseJSON.status.code == "20000"){
        alert("回复成功");
        location.reload();
    }
})

//关注
function collectionPost(post_id, user_id) {
    return(
        $.ajax({
            method: "post",
            url: path.basePath + 'collections.json',
            data: {user_id:user_id, resource_type:'Post', resource_id:post_id},
            dataType: "json",
            async: false,
        }))
}

//点击关注
$('#collection').on('click',function (e) {
    var post_id = getUrlParam('post_id');
    var user_id = $.cookie("userId");
    var result = collectionPost(post_id, user_id);
    console.log(result);
    if(result.responseJSON.status.code == "20000"){
        alert("关注成功");
        location.reload();
    }
    else {
        alert("关注失败");
    }
})