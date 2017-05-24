//页面加载完成时执行，显示全部动物信息
$(document).ready(function() {
    //path.basePash为服务器URL存在properties.js文件里
    var data = getAllAnimals();

    if(data.status.code == '20000'){
        showAnimals(data.data.pets);
        showPage(data.data.total_pages,1);
    }
});

//获取全部动物信息，每页显示12条，显示第一条，用于首次进入页面显示的内容
function getAllAnimals() {
    var animals;
    $.ajax({
        method: "get",
        url: path.basePath + "pets.json",
        data: {},
        dataType: "json",
        async: false,
        success:function (data) {
            animals = data;
        }
    })
    return animals;
}

//查找页面中选择的宠物筛选条件
function AnimalsCondition() {
    var search = {};
    //是否被领养
    var adopter = $('#adopter .active').attr("id");
    if (adopter == 'not_adopted'){
        search["adopter_id"] = null;
    }
    if (adopter == 'adopted'){
        search["not_adopter_id"] = null;
    }
    //动物物种
    var species = $("#show-animals #All .animal-species select").val();
    if (species != 'all'){
        search["species"] = species;
    }
    //动物性别
    var gender = $("#show-animals #All .animal-gender select").val();
    if (gender != 'all'){
        search["gender"] = gender;
    }
    //排序
    var order = $("#show-animals #All .animal-order select").val();
    search["order"] = order;
    console.log(search);
    return search;
}

//获取动物列表
function getAnimals(pageIndex, search){
    var page_index = pageIndex;
    var per = 12;
    var search = search;
    var order = search.order;
    var animals;
    $.ajax({
        method: "get",
        url: path.basePath + "pets.json",
        data:{search: search, order: order, per: per, page: page_index},
        dataType: "json",
        async: false,
        success:function (data) {
            animals = data;
        }
    })
    return animals;
}

//展示动物列表
function showAnimals(data){
    $("#animal-list").empty();
    var html = '';
    $.each(data, function(index, content)
    {
        var id = content.id;
        var name = content.name;
        var place = content.place;
        var description = content.description != null ? content.description : '无';
        var isAdopter = content.adopter != null ? '已领养' : '待领养';
        var collection = '12';
        var user = content.adopter != null ? content.adopter : content.provider;
        var userName = user.username;
        var userId = user.id;
        var avatarUrl = content.avatar.url != null ? path.basePath + content.avatar.url : '/pet-web/images/200x200.png';
        var animalUrl = '/pet-web/page/animal/animal-show.html?animalId='+content.id;

        var htmlPart = '<div class="col-md-3"><div class="animal"><div class="animal_picture text-center"><a href="{animalUrl}"><img src="{avatarUrl}" alt="样图"/></a><span class="place">{place}</span><span class="master">{isAdopter}</span></div><p>{name} &nbsp;<span class="glyphicon glyphicon-heart">{collection}</span></p><p>{description}</p><p>{user}</p></div></div>    '

        html += htmlPart.format({animalUrl:animalUrl, avatarUrl:avatarUrl, place:place, isAdopter:isAdopter, name:name, collection:collection, description:description, user:userName});

    });
    $("#animal-list").append(html);
}

//显示分页
function showPage(page,page_index) {
    // var page = $.getUrlParam('page');
    $(".good_page .pagination").empty();
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
    $(".good_page .pagination").append(html);
}

//分页的跳转功能
$('.good_page .pagination').on('click',function(e){
    var page = e.target.text;
    var data = AnimalsCondition();
    var animals = getAnimals(page, data);
    if(animals.status.code == '20000'){
        showAnimals(animals.data.pets);
        showPage(animals.data.total_pages,page);
        // $(e.target).parent('li').attr('class',"active");
        // $('.good_page .pagination li[page='+page+']').attr('class',"active");
        // $('.good_page .pagination li[page='+page+']').siblings().attr('class',"");
    }
})

//点击新建宠物
$("#publication-form").submit(function (e) {
    //阻止按钮的默认提交操作
    e.preventDefault();
    var formData = new FormData($( "#publication-form" )[0]);
    formData.append("provider_id", $.cookie('userId'));
    // var data = {};
    // data['name'] = $('#animal-name').val();
    // data['description'] = $('#animal-description').val();
    // data['species'] = $('#species').val();
    // data['gender'] = $('#gender').val();
    // data['provider_id'] = $.cookie('userId');
    var result = createAnimal(formData);
    if(result.responseJSON.status.code == "20000"){
        alert("创建成功");
        window.location.href = "/pet-web/page/animal/animal-show.html?animalId=" + result.responseJSON.data.pet.id;
    }
})

//创建宠物的ajax请求
function createAnimal(data) {
    return(
    $.ajax({
        method: "post",
        url: path.basePath + 'pets.json',
        data: data,
        dataType: "json",
        async: false,
        cache: false,
        contentType: false,
        processData: false
    }))
}

//宠物种类改变
$("#show-animals #All .animal-species select").change(function () {
    var data = AnimalsCondition();
    var animals = getAnimals(1, data);
    if(animals.status.code == '20000'){
        showAnimals(animals.data.pets);
        showPage(animals.data.total_pages,1);
    }
})
//宠物性别改变
$("#show-animals #All .animal-gender select").change(function () {
    var data = AnimalsCondition();
    var animals = getAnimals(1, data);
    if(animals.status.code == '20000'){
        showAnimals(animals.data.pets);
        showPage(animals.data.total_pages,1);
    }
})
// 宠物排序改变
$("#show-animals #All .animal-order select").change(function () {
    var data = AnimalsCondition();
    var animals = getAnimals(1, data);
    if(animals.status.code == '20000'){
        showAnimals(animals.data.pets);
        showPage(animals.data.total_pages,1);
    }
})
//宠物领养条件
$("#show-animals #adopter li").click(function () {
    var data = AnimalsCondition();
    delete data.adopter_id;
    delete data.not_adopter_id;

    var adopter = $(this).attr("id");
    if (adopter == 'not_adopted'){
        data["adopter_id"] = null;
    }
    if (adopter == 'adopted'){
        data["not_adopter_id"] = null;
    }

    var animals = getAnimals(1, data);
    if(animals.status.code == '20000'){
        showAnimals(animals.data.pets);
        showPage(animals.data.total_pages,1);
    }
})

