//页面加载完成时执行，显示我的动物信息
$(document).ready(function() {
    var userId = $.cookie("userId");
    var data = getFocusAnimals(userId);
    if(data.status.code == '20000'){
        showFocusAnimals(data.data.collections);
    }
    var data = getFocusPost(userId);
    if(data.status.code == '20000'){
        showFocusPost(data.data.collections);
    }
});


//获取收藏动物列表
function getFocusAnimals(userId){
    var search = {};
    search["resource_type"] = "Pet";
    var animals;
    $.ajax({
        method: "get",
        url: path.basePath + "/users/"+userId+"/collections.json",
        data:{search: search},
        dataType: "json",
        async: false,
        success:function (data) {
            animals = data;
        }
    })
    return animals;
}

//显示收藏动物
function showFocusAnimals(data) {
    $("#focus-animal ul").empty();
    var html = '';
    $.each(data, function(index, content)
    {
        var id = content.pet.id;
        var name = content.pet.name;
        var species = content.pet.species;
        var provider = content.pet.provider.username;
        var adopter = content.pet.adopter != null ? content.pet.adopter.username : '未领养';
        var animalUrl = '/pet-web/page/animal/animal-show.html?animalId='+content.pet.id;

        var htmlPart = '<li class="row"><div class="hidden id">{animalId}</div><div class="col-md-4"><a href="{animalUrl}">{name}</a></div><div class="col-md-4">提供者：{provider}</div><div class="col-md-4">领养人：{adopter}</div></li>'

        html += htmlPart.format({animalId:id, name:name, animalUrl:animalUrl, provider:provider, adopter:adopter});

    });
    $("#focus-animal ul").append(html);
}

//获取收藏帖子
function getFocusPost(userId) {
    var search = {};
    search["resource_type"] = "Post";
    var posts;
    $.ajax({
        method: "get",
        url: path.basePath + "/users/"+userId+"/collections.json",
        data:{search: search},
        dataType: "json",
        async: false,
        success:function (data) {
            posts = data;
        }
    })
    return posts;
}

//显示收藏帖子
function showFocusPost(data) {
    $("#focus-post ul").empty();
    var html = '';
    $.each(data, function(index, content)
    {
        var id = content.post.id;
        var title = content.post.title;
        var user = content.post.user.username;
        var postUrl = '/pet-web/page/forum/forum-post-info.html?post_id='+content.post.id;

        var htmlPart = '<li class="row"><div class="hidden id">{id}</div><div class="col-md-4"><a href="{postUrl}">{title}</a></div><div class="col-md-4">user</div><div class="col-md-4">回复数：{无}</div></li>'

        html += htmlPart.format({id:id, title:title, user:user, postUrl:postUrl});

    });
    $("#focus-post ul").append(html);
}