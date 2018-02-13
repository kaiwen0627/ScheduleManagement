$(function () {
    var username = getCookie('username');
    var userphone = getCookie('userphone');

    $('.back').on('click', function () {       
        window.location.href = './index.html';
    });
    $('.mainList').on('click', 'li', function () {
        window.location.href = './listinfo.html?id='+this.id;
    }); 
   $('.sebtn').on('click', function () {
       var word = $('.word').val();
       if (!word) {
           alert('没有关键词我找不到数据啊，亲');
           return false;
       }
   //全局查找相关日程列表
        fetch(hostUrl+'/api/findScheduleListByWord', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    word:word,
                    phone:userphone
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
                        $('.mainList').removeClass('on');
                } else {                   
                    $('.mainList').addClass('on');
                    alert('未找到日程信息！');
                }
                
                $('#list')
                .html('')
                .append(dom);
            })
})


})