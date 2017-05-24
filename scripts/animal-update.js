$(document).ready(function() {
    var animal_id = getUrlParam('animalId');
    var data = getAnimal(animal_id);
    if(data.status.code == '20000'){
        showAnimal(data.data.pet);
    }
});

// 获取宠物信息
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

//显示宠物信息
function showAnimal(data) {
    var id = data.id;
    var name = data.name;
    var gender = data.gender;
    var species = data.species;
    var age = data.age;
    var healthy = data.healthy;
    var description = data.description;
    var neutered = data.neutered;
    var vaccinated = data.vaccinated;
    var avatar = data.avatar.url ? path.basePath+data.avatar.url : '/pet-web/images/乔巴.png';
    var adoption_requirements = data.adoption_requirements;

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

    $("#update-info .name input").val(name);
    $("#update-info .gender input").val(gender);
    $("#update-info .species input").val(species);
    $("#update-info .age input").val(age);
    $("#update-info .healthy input").val(healthy);
    $("#update-info .description textarea").val(description);
    $("#update-info .neutered input").val(neutered);
    $("#update-info .vaccinated input").val(vaccinated);
    $("#update-info .adoption_requirements textarea").val(adoption_requirements);
}

//更新宠物信息
function updateAnimalInfo(animalId, data) {
    var animal;
    $.ajax({
        method : "put",
        url : path.basePath + "pets/" + animalId + ".json",
        data : data,
        dataType : "json",
        async : false,
        success : function (data) {
            animal = data;
        }
    })
    return animal;
}

//点击更新宠物信息
$("#animal-info-form_submit").click(function (e) {
    e.preventDefault();
    var animal_id= getUrlParam('animalId');
    var data = {};
    data['name'] = $("#update-info .name input").val();
    data['gender'] = $("#update-info .gender input").val();
    data['species'] = $("#update-info .species input").val();
    data['age'] = $("#update-info .age input").val();
    data['healthy'] = $("#update-info .healthy input").val();
    data['description'] = $("#update-info .description textarea").val();
    data['neutered'] = $("#update-info .neutered input").val();
    data['vaccinated'] = $("#update-info .vaccinated input").val();
    data['adoption_requirements'] = $("#update-info .adoption_requirements textarea").val();
    var result = updateAnimalInfo(animal_id,data);
    if(result && result.status.code == '20000'){
        alert('修改成功');
        window.location.href = "/pet-web/page/animal/animal-update.html?animalId=" + result.data.pet.id;
    }
})

//获取宠物相簿
function get() {
    
}