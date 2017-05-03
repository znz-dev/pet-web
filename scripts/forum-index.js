function getPlates() {
    var plates;
    $.ajax({
        method: "get",
        url:"http://localhost:8080/shop-api/good/all",
        data:{},
        dataType: "json",
        async: false,
        success:function (data) {
            plates = data;
        }
    })
    return plates;
}

function showPlates(data) {
    var html = null;
    $.each(data, function (index, content) {
        html += '<div class="col-md-6">
            <img class="col-md-3" src="" alt="参照图">
            <div class="col-md-9">
            <p>食物区</p>
            <p>
            <span>主题：1</span>
        <span>帖子：2</span>
        </p>
        <p>介绍</p>
        </div>
        </div>';
        }
    })
    $(".plates").append(html);
}