$(function () {
    //点击返回
    $('.goBack').on('click', function () {
        console.log('999');
        window.location.href = '/index.html';
    });
    //选择日期
    (function () {
        var i = 1;
        $('.navInfo').on('click', function () {
            if(i == 1){
                $('.dateMenu').slideDown(); 
                changeData();
                i = -i;
            } else {
                $('.dateMenu').slideUp(); 
                i = -i;
            }       
        })
        function changeData() {
            $('.dateMenu').on('click','li', function () {
                $('.navInfo').text($(this).text());
                $('.dateMenu').hide();
                //在此处写数据刷新操作
                alert('读数据库')
            })
       }
  })()
})