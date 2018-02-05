$('.goBack')
    .on('click', function () {
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