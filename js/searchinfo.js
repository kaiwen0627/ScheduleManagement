$(function () {
    $('.back').on('click', function () {       
        window.location.href = '/index.html';
    });
    $('.mainList').on('click', 'li', function () {
        window.location = './listinfo.html?id='+this.id;
    }); 
   $('.sebtn').on('click', function () {
        var word = $('.word').val();
   //全局查找相关日程列表  (yes-6)
        fetch('http://127.0.0.1:4000/api/findScheduleListByWord', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    word:word,
                    phone:'17629258733'
                })
            })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res);
                var dom = '';
                if (res.length) {
                    $(res)
                        .each(function () {
                            dom += ' <li id='+this._id+'><p class="L-name">' + this.title + '</p><p class = "doThingsTime" ><span class="fromTime">' + this.startTime + '</span><span> -- </span><span class = "toTime" > ' + this.endTime + '</span></p></li>';
                        });
                } else {
                    dom = '<h3>今天好像没有安排！</h3>'
                }
                $('#list')
                .html('')
                .append(dom);
            })
})


})