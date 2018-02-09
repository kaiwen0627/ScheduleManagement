var hostUrl = 'http://127.0.0.1:4000';
$('.goBack').on('click', function () {
    window.location.href = '/index.html';
});
var id = window
.location
.search
    .split('=')[1];
(function () {
    var i = 1;
    $('.isAllDay').on('click', function () {
        if (i == 1) {
            $(this).addClass('on');
            $('.view2').show();
            $('.view1').hide();
            i = -i;
        } else {
            $(this).removeClass('on');
            $('.view2').hide();
            $('.view1').show();
            i = -i;
        }
    });
})();

(function () {
    var i = 1;
    $('.isAlert').on('click', function () {
        if (i == 1) {
            $(this).addClass('on');
            $('.isAlert-con').slideDown();
            i = -i;
        } else {
            $(this).removeClass('on');
            $('.isAlert-con').slideUp();
            i = -i;
        }
    });
})();
(function () {
    var i = 1;
    $('.isRepeat').on('click', function () {
        if (i == 1) {
            $(this).addClass('on');
            $('.isRepeat-con').slideDown();
            i = -i;
        } else {
            $(this).removeClass('on');
            $('.isRepeat-con').slideUp();
            i = -i;
        }
    });
})();

//提交日程
$('.submitEvent p').on('click', function () {      
        submit(id); 
    
})

//取时间值
function getval(ele) {
    $(ele)
        .on('change', function () {
            console.log($(this).val())
            return $(this).val();
        })
}
var val1 = getval('#startTime1');
var val2 = getval('#startTime2');
var val3 = getval('#overTime1');
var val4 = getval('#overTime2');
var $title = $('#title');




var startTime = '';
var overTime = '';
function submit(id) {
    console.log($('#overTime1').val())  
        title = $title.val() || '新日程';
    var address = $('#address').val() || '';
    var dec = $('#dec').val() || '';
    var isAllDay = $('#isAllDay').hasClass('on');
    if (isAllDay) {
        isAllDay = 1;
        var d1 = moment(val2).format('YYYY-MM-DD HH:mm:ss');
        startTime = d1;
        var d2 = moment(val4).format('YYYY-MM-DD HH:mm:ss');
        overTime = d2;
    } else {
        var monent1 = moment('2017-06-02 13:20:25');
        console.log(monent1.format('YYYY-MM-DD HH:mm:ss'));

        isAllDay = 0;
        var dd = moment(val1).format('YYYY-MM-DD HH:mm:ss');
        startTime = dd;
        var dd2 = moment(val3).format('YYYY-MM-DD HH:mm:ss');
        overTime = dd2;
    }
    var alertTime = [];
    var alertTimeIndex = [];
    $('input[name = "tixing"]:checked').each(function () {
        var val = $(this).val();
        console.log(val);
        switch (val) {
            case '10':
                val = moment(startTime)
                    .add(10, 'm')
                    .format('YYYY-MM-DD HH:mm:ss');
                break;
            case '15':
                val = moment(startTime)
                    .add(15, 'm')
                    .format('YYYY-MM-DD HH:mm:ss');
                break;
            case '30':
                val = moment(startTime)
                    .add(30, 'm')
                    .format('YYYY-MM-DD HH:mm:ss');
                break;
            case '60':
                val = moment(startTime)
                    .add(60, 'm')
                    .format('YYYY-MM-DD HH:mm:ss');
                break;
            case '1d':
                val = moment(startTime)
                    .add(1, 'd')
                    .format('YYYY-MM-DD HH:mm:ss');
                break;
            case '1w':
                val = moment(startTime)
                    .add(1, 'w')
                    .format('YYYY-MM-DD HH:mm:ss');
                break;
            default:
                //5min
                val = moment(startTime)
                    .add(5, 'm')
                    .format('YYYY-MM-DD HH:mm:ss');

        }
        alertTime.push(val);
    });
    $('input[name = "tixing"]').each(function (i, v) {
        if ($(this).is(":checked")) {           
            alertTimeIndex.push(i);
        }
    });

    if (alertTime.length == 0) {
        alertTime.push(moment(startTime).add(5, 'm').format('YYYY-MM-DD HH:mm:ss'));
    }

    var cycleTime = $('input[name = "cycleTime"]:checked').val();
    console.log(alertTimeIndex);
    var sData = {
        "title": title,
        "name": 'kaiwen3',
        "phone": '17629258733',
        "desc": dec,
        "address": address,
        "alertTime": alertTime,
        "isAllDay": isAllDay,
        "startTime": startTime,
        "endTime": overTime,
        "alertTimeIndex": alertTimeIndex
    }

    console.log(sData);
    alert(id);
    if (!id) {
        alert(id);
        fetch(hostUrl + '/api/addSchedule', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sData)
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res)
            if (res.status == 'success') {
                alert('添加日程成功！');
                //window.location.href = '/index.html';
            }
        })
    } else {
        fetch(hostUrl + '/api/updateSchedule', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                '_id': id,
                'updata':sData
            })
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res)
            if (res.status == 'success') {
                alert('修改日程成功！');
                //window.location.href = '/index.html';
            } else {
                alert(res.mes);
            }
        })
}

   

};

//修改日程逻辑

(function () {
    var id = window
        .location
        .search
        .split('=')[1];
    if (!id) {
        return false;
    }
    fetch(hostUrl + '/api/findScheduleByAttr', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({attr: "_id", val: id})
    }).then((res) => {
        return res.json()
    }).then((res) => {
        console.log(res)
        //设置页面值
        $('#title').val(res.title);
        $('#address').val(res.address);
        $('#address').val(res.address);
        $('#dec').val(res.desc);
        if (!res.isAllDay) {
            //非全天
            $('#isAllDay').addClass('on');
            $('#startTime1').val(res.startTime.split(' ')[0] + 'T' + res.startTime.split(' ')[1]);
            $('#overTime1').val(res.endTime.split(' ')[0] + 'T' + res.endTime.split(' ')[1]);

        } else {
            $('#startTime2').val(res.startTime.split(' ')[0] + 'T' + res.startTime.split(' ')[1]);
            $('#overTime2').val(res.endTime.split(' ')[0] + 'T' + res.endTime.split(' ')[1]);

        }
        if (res.alertTimeIndex.length) {
            $('#isAlert').addClass('on');
            $('.isAlert-con').show();
            $('.isAlert').click();
            $(res.alertTimeIndex).each(function (i, v) {
                $('input[name = "tixing"]')
                    .eq(v)
                    .prop('checked', true);
            })
       }
        

    })
})();
