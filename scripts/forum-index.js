//页面加载完成时执行，显示全部动物信息
$(document).ready(function() {
    var data = getTopic();
    console.log(data);
    if(data.status.code == '20000'){
        showTopic(data.data.topics);
    }
});

//获取板块
function getTopic() {
    var topic;
    $.ajax({
        method: "get",
        url: path.basePath + "topics.json",
        data:{},
        dataType: "json",
        async: false,
        success:function (data) {
            topic = data;
        }
    })
    return topic;
}

//显示板块
function showTopic(data) {
    $(".topics").empty();
    var html = '';
    $.each(data, function (index, content) {
        var id = content.id;
        var name = content.name;
        var avatar_url = content.avatar.url != null ? path.basePath+content.avatar.url : "/pet-web/images/forum.gif";
        var description = content.description;

        var htmlPart = '<div class="col-md-6"><div class="topic row"><div class="col-md-3 topic-picture"><a href="forum-posts.html?topic_id={id}"><img class="" src="{avatar_url}" alt="参照图"></a></div><div class="col-md-9 topic-info"><p>{name}</p><p><span>帖子：无</span></p><p>{description}</p><button class="delete">删除板块</button><div class="hidden">{id}</div></div></div></div>';
        html += htmlPart.format({id:id, name:name, avatar_url:avatar_url, description:description});
    })
    $(".topics").append(html);
}

//新建板块
function createTopic(data) {
    return(
        $.ajax({
            method: "post",
            url: path.basePath + 'topics.json',
            data: data,
            dataType: "json",
            async: false,
            cache: false,
            contentType: false,
            processData: false
        }))
}

//新建按钮
$('#create-topic-submit').on('click',function (e) {
    var formData = new FormData($( "#create-topic-form" )[0]);
    // console.log(formData);
    var result = createTopic(formData);
    if(result.responseJSON.status.code == "20000"){
        alert("创建成功");
        location.reload();
    }
})

//更新板块
function updateTopic() {
    
}

//删除板块 
function deleteTopic(id) {
    return(
    $.ajax({
        method: "delete",
        url: path.basePath + "topics/"+id+".json",
        data:{},
        dataType: "json",
        async: false,
        success:function (data) {
            topic = data;
        }
    }))
}

//点击删除板块
$(".topics").on("click","button",function (e) {
    var id = $(this).next().text();
    console.log(id);
    var result = deleteTopic(id);
    if(result.responseJSON.status.code == "20000"){
        alert("删除成功");
        location.reload();
    }
})