$(document).ready(function() {
    var topic_id = getUrlParam('topic_id');
    
    var data = getPosts(topic_id,1,12);
    console.log(data);
    if(data.status.code == '20000'){
        showPosts(data.data.posts);
        showPage(data.data.total_pages,1);
    }
});

//获取帖子
function getPosts(topic_id, page, per) {
    var posts;
    $.ajax({
        method: "get",
        url: path.basePath + "posts.json",
        data:{topic_id: topic_id, page: page, per: per},
        dataType: "json",
        async: false,
        success:function (data) {
            posts = data;
        }
    })
    return posts;
}

//显示帖子
function showPosts(data) {
    console.log(data);
    $(".posts").empty();
    var html = '';
    $.each(data, function(index, content)
    {
        var id = content.id;
        var topic_id = content.topic_id;
        var title = content.title;
        var user_id = content.user.id;
        var user_username = content.user.username;
        var user_avatar_url = content.user.avatar.url != null ? content.user.avatar.url : '/pet-web/images/40x40.png';

        var htmlPart = '<li class="row post"><a class="col-md-8" href="forum-post-info.html?post_id={id}">{title}</a><a class="col-md-2" href="">{user_username}</a><a class="col-md-2" href="">回复</a></li>'

        html += htmlPart.format({id:id, title:title, user_username:user_username});
    });
    $(".posts").append(html);
}

//发帖
function createPost(topic_id, user_id, title, content) {
    return(
        $.ajax({
            method: "post",
            url: path.basePath + 'posts.json',
            data: {topic_id:topic_id, user_id:user_id, title:title, content:content},
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
    var topic_id = getUrlParam('topic_id');
    var posts = getPosts(topic_id, page, 12);
    if(posts.status.code == '20000'){
        showPosts(posts.data.posts);
        showPage(posts.data.total_pages,page);
    }
})

//删帖
function deletePost(post_id) {
    return(
        $.ajax({
            method: "delete",
            url: path.basePath + 'posts/' + post_id + '.json',
            data: {},
            dataType: "json",
            async: false,
            cache: false,
            contentType: false,
            processData: false
        }))
 }

//发帖按钮
 $('#create-post-submit').on('click',function (e) {
     var topic_id = getUrlParam('topic_id');
     var user_id = $.cookie("userId");
     var title = $('#create-post input[name = "title"]').val();
     var content = $('#create-post textarea[name = "content"]').val();
     var result = createPost(topic_id, user_id, title, content);
     if(result.responseJSON.status.code == "20000"){
         alert("发帖成功");
         location.reload();
     }
 })

