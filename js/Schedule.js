$(function () {
    //点击返回
    $('.goBack').on('click', function () {       
        window.location.href = '/index.html';
    });
    //选择日期
    $('.navInfo').on('click', function () {
        $('.dateMenu').slideDown();
    });
    $('.dateMenu').on('click', 'li', function () {
        $('.navInfo').text($(this).text());       
        $('.dateMenu').slideUp();
        alert('读数据库')
    });

})