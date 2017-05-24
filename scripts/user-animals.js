//页面加载完成时执行，显示我的动物信息
$(document).ready(function() {
    var userId = $.cookie("userId");
    console.log(userId);
    var searchAdopter = {};
    searchAdopter["adopter_id"] = userId
    var searchProvier = {};
    searchProvier["provider_id"] = userId

    var dataAdopter = getAnimals(searchAdopter);
    var dataProvider = getAnimals(searchProvier);
    var dateAll = dataAdopter.data.pets

    if(dataAdopter.status.code == '20000'){
        showAdopterAnimals(dataAdopter.data.pets);
    }
    if(dataProvider.status.code == '20000'){
        showProvideAnimals(dataProvider.data.pets);
    }

    showAllAnimals(dataProvider.data.pets , dataAdopter.data.pets);
});

//获取动物列表
function getAnimals(search){
    var search = search;
    var animals;
    $.ajax({
        method: "get",
        url: path.basePath + "pets.json",
        data:{search: search},
        dataType: "json",
        async: false,
        success:function (data) {
            animals = data;
        }
    })
    return animals;
}

//显示在全部tab上
function showAllAnimals(dataProvider,dataAdopter) {
    $("#animals-all ul").empty();
    var html = '';
    $.each(dataProvider, function(index, content)
    {
        var id = content.id;
        var name = content.name;
        var species = content.species;
        var provider = content.provider.username;
        var adopter = content.adopter != null ? content.adopter.username : '未领养';
        var animalUrl = '/pet-web/page/animal/animal-show.html?animalId='+content.id;

        var htmlPart = '<li class="row"><div class="hidden id">{animalId}</div><div class="col-md-3"><a href="{animalUrl}">{name}</a></div><div class="col-md-3">提供者：{provider}</div><div class="col-md-3">领养人：{adopter}</div><div class="col-md-3"><button>更新宠物信息</button></div></li>'

        html += htmlPart.format({animalId:id, name:name, animalUrl:animalUrl, provider:provider, adopter:adopter});

    });
    $.each(dataAdopter, function(index, content)
    {
        var id = content.id;
        var name = content.name;
        var species = content.species;
        var provider = content.provider.username;
        var adopter = content.adopter != null ? content.adopter.username : '未领养';
        var animalUrl = '/pet-web/page/animal/animal-show.html?animalId='+content.id;

        var htmlPart = '<li class="row"><div class="hidden id">{animalId}</div><div class="col-md-3"><a href="{animalUrl}">{name}</a></div><div class="col-md-3">提供者：{provider}</div><div class="col-md-3">领养人：{adopter}</div><div class="col-md-3"><button>更新宠物信息</button></div></li>'

        html += htmlPart.format({animalId:id, name:name, animalUrl:animalUrl, provider:provider, adopter:adopter});

    });
    $("#animals-all ul").append(html);
}

//显示在领养tab上
function showAdopterAnimals(data) {
    $("#animals-adopter ul").empty();
    var html = '';
    $.each(data, function(index, content)
    {
        var id = content.id;
        var name = content.name;
        var species = content.species;
        var provider = content.provider.username;
        var adopter = content.adopter != null ? content.adopter.username : '未领养';
        var animalUrl = '/pet-web/page/animal/animal-show.html?animalId='+content.id;

        var htmlPart = '<li class="row"><div class="hidden id">{animalId}</div><div class="col-md-3"><a href="{animalUrl}">{name}</a></div><div class="col-md-3">提供者：{provider}</div><div class="col-md-3">领养人：{adopter}</div><div class="col-md-3"><button>更新宠物信息</button></div></li>'

        html += htmlPart.format({animalId:id, name:name, animalUrl:animalUrl, provider:provider, adopter:adopter});

    });
    $("#animals-adopter ul").append(html);
}

//显示在提供tab上
function showProvideAnimals(data) {
    $("#animals-provide ul").empty();
    var html = '';
    $.each(data, function(index, content)
    {
        var id = content.id;
        var name = content.name;
        var species = content.species;
        var provider = content.provider.username;
        var adopter = content.adopter != null ? content.adopter.username : '未领养';
        var animalUrl = '/pet-web/page/animal/animal-show.html?animalId='+content.id;

        var htmlPart = '<li class="row"><div class="hidden id">{animalId}</div><div class="col-md-3"><a href="{animalUrl}">{name}</a></div><div class="col-md-3">提供者：{provider}</div><div class="col-md-3">领养人：{adopter}</div><div class="col-md-3"><button>更新宠物信息</button></div></li>'

        html += htmlPart.format({animalId:id, name:name, animalUrl:animalUrl, provider:provider, adopter:adopter});

    });
    $("#animals-provide ul").append(html);
}

//修改宠物信息按钮
$('#myTabContent ul').on('click','li',function(e){
    var id = $(this).children(".id").text();
    window.location.href = "/pet-web/page/animal/animal-update.html?animalId=" + id;
})