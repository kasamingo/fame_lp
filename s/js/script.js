$(function() {

    /* nav menu */
    $('button#nav_button').click(function() {
        if ($('#menu').hasClass('open')) {
            $('#menu').removeClass('open');
            $('button#nav_button span').removeClass('close');
        } else {
            $('#menu').addClass('open');
            $('button#nav_button span').addClass('close');
        }
    });
    /* トップページ メニューから移動 */
    $('nav li a[href*="#"]').click(function(e) {
        e.preventDefault();
        var id = $(this).attr('href');
        id = id.replace(/^(.*)#(.*)$/, '$2');
        var MOVE = $('#' + id).offset().top;

        $('html, body').animate({
            scrollTop : MOVE
        }, 1000);
        {
            $('#menu').removeClass('open');
            $('button#nav_button span').removeClass('close');
        }
    });

    /* totopボタン登場 */
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 150) {
            $('p.totop').addClass('see');
        } else {
            $('p.totop').removeClass('see');
        }
    });
    /* totop */
    $('p.totop').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop : 0
        }, 1500);
    });

    /* 提携工務店募集中div.builder登場 */
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 125) {
            $('div.builder').addClass('see');
        } else {
            $('div.builder').removeClass('see')
        }
    });

});
