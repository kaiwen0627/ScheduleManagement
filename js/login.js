$(function () {
 
    $('.submit').on('click', function () {
        var name = $('#username').val();
        var pwd = $('#pwd').val();

        //获取账户信息
        fetch(hostUrl + '/api/checkpassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'attr': 'name', 'val': name, 'password': pwd})
        }).then((res) => {
            return res.json()
        }).then((res) => {
            console.log(res.status);
            if (res.status == 'success') {
                //设置cookie
                console.log(cookie_time);
                if (getCookie('username') == '' || getCookie('username') != res.userMes.name) {
                    setCookie('username', res.userMes.name, cookie_time);
                    setCookie('userphone', res.userMes.phone, cookie_time);                   
                }
                window.location.href = './index.html';

            } else {
                alert(res.mes);
            }

        })
    })

})