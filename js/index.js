function data() {
    console.log('ppp');
    var mySchedule = new Schedule({
        el: '#schedule-box',
        //date: '2018-9-20',
        clickCb: function (y, m, d) {
            console.log(y, m, d);
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

$('.addNew').on('click', function () {
    window.location = './creatWork.html';
});

$('.mainList').on('click', 'li', function () {
    window.location = './listinfo.html?';
});

$('.views-btn .gotoday').on('click', function () {
    data();
});



