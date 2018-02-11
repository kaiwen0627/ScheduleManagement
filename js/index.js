var nowTime = moment();
console.log(nowTime);

var username = getCookie('username');
var userphone = getCookie('userphone');


function data() {
    var mySchedule = new Schedule({
        el: '#schedule-box',
        //date: '2018-9-20',
        clickCb: function (y, m, d) {
            console.log(y, m, d);
            m > 9
                ? m = m
                : m = '0' + m;
            d > 9
                ? d = d
                : d = '0' + d;
            scheduleList(y + '-' + m + '-' + d);
        },
        nextMonthCb: function (y, m, d) {
            console.log(y, m, d);
        },
        nextYeayCb: function (y, m, d) {
            console.log(y, m, d);
        },
        prevMonthCb: function (y, m, d) {
            console.log(y, m, d);
        },
        prevYearCb: function (y, m, d) {
            console.log(y, m, d);
        }
    });
};
data();

//切换视图
$('.views-btn .otherView').on('click', function () {
    window.location = './Schedule.html';
});

$('.views-btn .search').on('click', function () {
    window.location = './searchinfo.html';
});

$('.addNew').on('click', function () {
    window.location = './creatWork.html';
});

$('.mainList').on('click', 'li', function () {
    window.location = './listinfo.html?id='+this.id;
});

$('.views-btn .gotoday').on('click', function () {
    data();
});

//展示当天日程
function scheduleList(time) {
    fetch(hostUrl+'/api/findScheduleListByTime', {
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
                        dom += ' <li id='+this._id+'><p class="L-name">' + this.title + '</p><p class = "doThingsTime" ><span class="fromTime">' + this.startTime + '</span><span> -- </span><span class = "toTime" > ' + this.endTime + '</span></p></li>';
                    });
            } else {
                dom = '<h3>今天好像没有安排！</h3>'
            }
            $('#list')
                .html('')
                .append(dom);
        })
}

//页面刚进入查询日程(function () {
{
    var time = nowTime.format('YYYY-MM-DD');
    scheduleList(time);
}
