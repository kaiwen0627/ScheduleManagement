//cookie 时间
const cookie_time = 7;

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document
        .cookie
        .split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) 
            return c.substring(name.length, c.length);
        }
    return "";
}
//设置cookie

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//服务器地址
var hostUrl = 'http://127.0.0.1:3004';
