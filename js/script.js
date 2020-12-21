$(function() {

    /* totop 登場 */
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 30) {
            $('p.totop').addClass('see');
        } else {
            $('p.totop').removeClass('see')
        }
        ;
    });
    /* totop */
    $('p.totop').click(function(e) {
        // e.preventDefault();
        $('html, body').animate({
            scrollTop : 0
        }, 1000);
    });

    /* 提携工務店募集中div.builder登場 */
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 20) {
            $('div.builder').addClass('see');
        } else {
            $('div.builder').removeClass('see')
        }
        ;
    });

    /* メニューから移動 */
    $('div#menu a[href*="#"]').click(function(e) {
        /* if($('#main').size()>=1){ */
        e.preventDefault();
        var id = $(this).attr('href');
        id = id.replace(/^(.*)#(.*)$/, '$2');
        var MOVE = $('#' + id).offset().top;
        var down = $(window).scrollTop();
        /* var down =743-down; */
        if (down >= 0) {
            $('html, body').animate({
                scrollTop : MOVE
            /*-down*/}, 1000);
        } else {
            $('html, body').animate({
                scrollTop : MOVE
            }, 1000);
        }/* ; */
        /* }; */
    });

    /* フォームのセレクト文字色 */
    $('select').on('change', function() {
        $(this).css('color', $(this).find('option:selected').get(0).style.color);
    }).trigger('change');
});