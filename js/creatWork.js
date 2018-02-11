$(function () {
    var username = getCookie('username');
    var userphone = getCookie('userphone');
    var st1 = $('#startTime1');
    var st2 = $('#startTime2');
    var ot1 = $('#overTime1');
    var ot2 = $('#overTime2');
    var $title = $('#title');
    var startTime = '';
    var overTime = '';
    var id = window
        .location
        .search
        .split('=')[1];

    $('.goBack').on('click', function () {
        window.location.href = '/index.html';
    });

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

    });

    function submit(id) {
        console.log(st1.val().replace(/T/g, ' '))
        console.log(st2.val().replace(/T/g, ' '))
        console.log(ot1.val().replace(/T/g, ' '))
        console.log(ot2.val().replace(/T/g, ' '))

        //处理修改日程时间格式
        var st1_val = st1
            .val()
            .replace(/T/g, ' ');
        var ot1_val = ot1
            .val()
            .replace(/T/g, ' ');
        if (id) {
            st1_val = st1
                .val()
                .replace(/T/g, ' ') + ':00';
            ot1_val = ot1
                .val()
                .replace(/T/g, ' ') + ':00';
        }

        title = $title.val() || '新日程';
        var address = $('#address').val() || '';
        var dec = $('#dec').val() || '';
        var isAllDay = $('#isAllDay').hasClass('on');
        if (isAllDay) {
            isAllDay = 1;
            startTime = moment(st2.val()).format('YYYY-MM-DD HH:mm:ss');
            overTime = moment(ot2.val()).format('YYYY-MM-DD HH:mm:ss');
        } else {
            isAllDay = 0;
            if (!id) {
                startTime = moment(st1_val).format('YYYY-MM-DD HH:mm:ss');
                overTime = moment(ot1_val).format('YYYY-MM-DD HH:mm:ss');
            } else {
                startTime = st1_val;
                overTime = ot1_val;
                //console.log(startTime);
            }

        }
        var alertTime = [];
        var alertTimeIndex = [];
        $('input[name = "tixing"]:checked').each(function () {
            var val = $(this).val();
            console.log(val);
            switch (val) {
                case '10':
                    val = moment(startTime)
                        .subtract(10, 'm')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '15':
                    val = moment(startTime)
                        .subtract(15, 'm')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '30':
                    val = moment(startTime)
                        .subtract(30, 'm')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '60':
                    val = moment(startTime)
                        .subtract(60, 'm')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '1d':
                    val = moment(startTime)
                        .subtract(1, 'd')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                case '1w':
                    val = moment(startTime)
                        .subtract(1, 'w')
                        .format('YYYY-MM-DD HH:mm:ss');
                    break;
                default:
                    //5min
                    val = moment(startTime)
                        .subtract(5, 'm')
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
        //console.log(alertTimeIndex);
        var sData = {
            "title": title,
            "name": username,
            "phone": userphone,
            "desc": dec,
            "address": address,
            "alertTime": alertTime,
            "isAllDay": isAllDay,
            "startTime": startTime,
            "endTime": overTime,
            "alertTimeIndex": alertTimeIndex
        }

        console.log(sData);
        //alert(id);
        if (!id) {
            //alert(id);
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
                    window.location.href = '/index.html';
                }
            })
        } else {
            console.log(sData);
            console.log(startTime);
            console.log(overTime);
            fetch(hostUrl + '/api/updateSchedule', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'_id': id, 'updata': sData})
            }).then((res) => {
                return res.json()
            }).then((res) => {
                console.log(res)
                if (res.status == 'success') {
                    alert('修改日程成功！');
                    window.location.href = '/index.html';
                } else {
                    alert(res.mes);
                }
            })
        };

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

})