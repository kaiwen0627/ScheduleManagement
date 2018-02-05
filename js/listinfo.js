$('.back')
    .on('click', function () {
        window.location.href = '/index.html';
    });

    $('.editer')
    .on('click', function () {
        window.location.href = '/creatWork.html';
    });
    $('.delecter')
    .on('click', function () {
       //删除数据，返回首页
       window.location.href = '/index.html'; 
    });