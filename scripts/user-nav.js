$(document).ready(function () {
    var urlPath = window.location.pathname;
    var active;
    $(".nav-main li").each(function () {
        if(urlPath.indexOf($(this).attr("id")) != -1){
            // $(this).attr("class","active");
            $(this).find('a').tab('show');
            active = $(this).attr("id");
        }
    })
    $(".nav-follow div").each(function () {
        if(active == ("user-"+$(this).attr("id"))){
            $(this).addClass("in active");
        }
    })
})

$("#user-focus a").click(function () {
    alert('1');
    window.location.href = "/pet-web/page/user/user-focus.html";
})

$(".nav-main li").click(function () {
    var id = $(this).attr("id");
    show(id);
})

$(".nav-follow li").click(function () {
    var url = $(this).attr("id");
    window.location.href = "/pet-web/page/user/" + url+".html";
})

function show(select) {
    $(".nav-main ul #" + select + " a").tab('show');
    var active = $(".nav-main ul #" + select + " a").attr("href");
    active = active.replace(/#/,"");
    showActiveLi(active);
}

function showActiveLi(navMain) {
    // alert(navMain);
    var url = $(".nav-follow #"+ navMain +" ul .active").attr("id");
    // alert(url);
    window.location.href = "/pet-web/page/user/" + url+".html";
}