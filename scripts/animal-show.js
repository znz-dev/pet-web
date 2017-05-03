$(document).ready(function() {
    var animal_id = getUrlParam('animalId');
    var data = getAnimal(animal_id);
    if(data.status.code == '20000'){
        showAnimal(data.data.pet);
    }
});

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

function showMessage() {
    var messages;
    $.ajax({
        method: "get",
        url:"http://localhost:8080/shop-api/good/all",
        data:{id : animal_id},
        dataType: "json",
        async: false,
        success:function (data) {
            messages = data;
        }
    });

    var html = null;
    $.each(messages, function (index, content){
        html += '<li class="row"><div class="col-md-2 text-center"><img class="row" src="'
            + content.picture +
            '" alt="头像"><p>'
            + content.username +
            '</p></div><div class="col-md-10"><p class="row">'
            + content.text +
            '</p></div></li>'
    })
    $("#message ul").append(html);
}