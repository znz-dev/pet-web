$(document).ready(function() {
    var animal_id = getUrlParam('animalId');
    var data = getAnimal(animal_id);
    if(data.status.code == '20000'){
        showAnimal(data.data.pet);
    }

    data = getComments(animal_id);
    if(data.status.code == '20000'){
        showComments(data.data.comments);
    }
});

//获取动物信息
function getAnimal(animal_id){
    var animal;
    $.ajax({
        method : "get",
        url : path.basePath + "pets/" + animal_id + ".json",
        data :{},
        dataType : "json",
        async : false,
        success :function (data) {
            animal = data;
        }
    })
    return animal;
}

//显示动物信息
function showAnimal(data) {
    var id = data.id;
    var name = data.name;
    var gender = data.gender;
    var species = data.species;
    var age ;
    var healthy;
    var description = data.description;
    var neutered;
    var vaccinated;
    var avatar = data.avatar.url ? path.basePath+data.avatar.url : '/pet-web/images/乔巴.png';
    var adoption_requirements;
    var user = data.adopter != null ? data.adopter : data.provider;
    var userId = user.id;
    var isAdopter = data.adopter != null ? '已领养' : '待领养';

    $(".animal_info .userId").text(userId);
    $(".animal_info .animalId").text(id);
    $(".animal_info .isAdopter").append(isAdopter);
    $(".animal_info .name").append(name);
    $(".animal_info .gender").append(gender);
    $(".animal_info .species").append(species);
    $(".animal_info .age").append(age);
    $(".animal_info .healthy").append(healthy);
    $(".animal_info .description").append(description);
    $(".animal_info .neutered").append(neutered);
    $(".animal_info .vaccinated").append(vaccinated);
    $(".animal_info .avatar").html('<img src="' + avatar + '" alt="123">');
    $(".animal_info .adoption_requirements").append(adoption_requirements);
}

// 获取图片
function showPictures(animal_id) {
    var pictures;
    $.ajax({
        method: "get",
        url:"http://localhost:8080/shop-api/good/all",
        data:{id : animal_id},
        dataType: "json",
        async: false,
        success:function (data) {
            picture = data;
        }
    })

    var html = null;
    $.each(pictures, function (index, content) {
        html += '<img src="'+ content +'" alt="showPicture">';
    })
    $("#pictures .row").append(html);
}

//获取动态
function showDynamic() {
    var dynamic;
    $.ajax({
        method: "get",
        url:"http://localhost:8080/shop-api/good/all",
        data:{id : animal_id},
        dataType: "json",
        async: false,
        success:function (data) {
            dynamic = data;
        }
    })

    var html = null;
    $.each(dynamic, function (index, content) {
        html += '<li class="row"><div class="col-md-2 text-center"><img class="row" src="'
            + content.picture +
            '" alt="头像"><p>'
            + content.picture +
            '</p></div><div class="col-md-10"><p class="row">'
            + content.content+
            '</p>';
        if(content.pictures != null){
            html +='<div class="row">';
            $.each(pictures, function (i, p){
                html +='<img class="" src="' + p + '" alt="">';
            })
            html +='</div>';
        }
        html +='</div></li>';
    })
    $("#dynamic ul").append(html);
}

//获取留言
function getComments(pet_id) {
    var comments;
    $.ajax({
        method: "get",
        url: path.basePath + "pets/" + pet_id + "/comments.json",
        dataType: "json",
        async: false,
        success:function (data) {
            comments = data;
        }
    });
    return comments;
}

//显示留言
function showComments(data) {
    $("#comments ul").empty();
    var html = "";
    $.each(data, function (index, comment){
        var id = comment.id;
        var content = comment.content;
        var created_at = comment.created_at;
        var user_id = comment.user.id;
        var user_username = comment.user.username;
        var user_avatar_url = comment.user.avatar.url != null ? path.basePath+comment.user.avatar.url : '/pet-web/images/50x50.png';

        var htmlPart = '<li class="row"><div class="col-md-2 text-center"><img class="row" src="{user_avatar_url}" alt="头像"><p>{user_username}</p></div><div class="col-md-10"><p class="row">{content}</p></div></li>'

        html += htmlPart.format({content:content, user_username:user_username, user_avatar_url:user_avatar_url});

    })
    $("#comments ul").append(html);
}

//新建留言
function createComment(user_id, pet_id, content) {
    return(
        $.ajax({
            method: "post",
            url: path.basePath + 'comments.json',
            data: {user_id:user_id, pet_id:pet_id, content:content},
            dataType: "json",
            async: false,
        }))
}

//联系饲主
$("#toContact-form_submit").on("click",function (e) {
    var content = $("#toContact textarea").val();
    var title = $("#toContact input").val();
    var user_id = $.cookie("userId");
    var receiver_id = $(".animal_info .userId").text();
    var result = createMessage(user_id, receiver_id, title, content);
    console.log(result);
    if(result == true){
        alert("发送成功");
    }else {
        alert("发送失败");
    }
})

//我要领养
$("#toAdopt-form_submit").on("click",function (e) {
    var content = $("#toAdopt textarea").val();
    var fromId = $.cookie("userId");
    var toId = $(".animal_info .userId").text();
    var type = "2";
    var result = newMessage(fromId, toId, type, content);
    if(result == true){
        alert("发送成功");
    }else {
        alert("发送失败");
    }
})

//添加关注
$("#toCollection").on("click",function (e) {
    var userId = $.cookie("userId");
    var animalId = $(".animal_info .animalId").text();
    $.ajax({
        method: "post",
        url: path.basePath + 'collections.json',
        data:{user_id:userId, resource_type:'Pet', resource_id:animalId},
        dataType: "json",
        async: false,
        success:function (data) {
            alert("添加成功");
        }
    })
})

//添加留言
$("#toComment-form_submit").on("click",function (e) {
    var user_id = $.cookie("userId");
    var pet_id = getUrlParam('animalId');
    var content = $("#toComment textarea").val();
    var result = createComment(user_id, pet_id, content);
    console.log(result);
    if(result.responseJSON.status.code == "20000"){
        alert("留言成功");
        location.reload();
    }
})