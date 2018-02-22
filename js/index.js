(function () {

    //设置cookie
    setCookie('username', 'user1', 7);
    setCookie('userphone', '12354154645', 7);
    //*************** */

    var nowTime = moment();
    console.log(nowTime);

    var username = getCookie('username');
    var userphone = getCookie('userphone');

    function data() {
        var mySchedule = new Schedule({
            el: '#schedule-box',
            //date: '2018-9-20',
            clickCb: function (y, m, d) {
                riChengZhanShi();
                console.log(y, m, d);
                dataChuLi(y, m, d);
            },
            nextMonthCb: function (y, m, d) {
                console.log(y, m, d);
                riChengZhanShi();
                dataChuLi(y, m, d);
            },
            nextYeayCb: function (y, m, d) {
                console.log(y, m, d);
                riChengZhanShi();
                dataChuLi(y, m, d);
            },
            prevMonthCb: function (y, m, d) {
                console.log(y, m, d);
                riChengZhanShi();
                dataChuLi(y, m, d)
            },
            prevYearCb: function (y, m, d) {
                console.log(y, m, d);
                riChengZhanShi();
                dataChuLi(y, m, d);
            }
        });
        riChengZhanShi();
    };
    data();

    function dataChuLi(y, m, d) {
        m > 9
            ? m = m
            : m = '0' + m;
        d > 9
            ? d = d
            : d = '0' + d;
        scheduleList(y + '-' + m + '-' + d);
    }

    //切换视图
    $('.views-btn .otherView')
        .on('click', function () {
            window.location.href = './Schedule.html';
        });

    $('.views-btn .search').on('click', function () {
        window.location.href = './searchinfo.html';
    });

    $('.addNew').on('click', function () {
        window.location.href = './creatWork.html';
    });

    $('.mainList').on('click', 'li', function () {
        window.location.href = './listinfo.html?id=' + this.id;
    });

    $('.views-btn .gotoday').on('click', function () {
        data();
    });

    //展示当天日程
    function scheduleList(time) {
        fetch(hostUrl + '/api/findScheduleListByTime', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({phone: userphone, time: time})
            })
            .then(response => response.json())
            .then((res) => {
                console.log(res.length);
                var dom = '';
                if (res.length) {
                    $(res)
                        .each(function () {
                            dom += ' <li id=' + this._id + '><p class="L-name">' + this.title + '</p><p class = "doThingsTime" ><span class="fromTime">' + this
                                .startTime
                                .substring(0, 16) + '</span><span> -- </span><span class = "toTime" > ' + this
                                .endTime
                                .substring(0, 16) + '</span></p></li>';
                        });
                    $('.mainList').removeClass('on');
                } else {
                    $('.mainList').addClass('on');
                }

                $('#list')
                    .html('')
                    .append(dom);
            })
    }

    //页面刚进入查询日程
    {
        var time = nowTime.format('YYYY-MM-DD');
        scheduleList(time);
    }

    function riChengZhanShi() {

        dataD('2');

    }

    function dataD(time) {
        fetch(hostUrl + '/api/findScheduleListByAttr', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: userphone, timeDian: time // '1':当日  ，'2'：本月 ，'0':本年
            })
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res);
            var dom = '';
            if (res.length) {
                $(res)
                    .each(function () {
                        var t = this
                            .startTime
                            .split(' ')[0];
                        $('#schedule-box .current-month').each(function () {
                            // console.log($(this).find('span').attr('title'));
                            if (t == $(this).find('span').attr('title')) {
                                $(this).addClass('on');
                            }
                        });
                    })
            }

        })
    }

})()