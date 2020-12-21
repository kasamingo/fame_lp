$(function() {

    $(document).off('click', '#line_overlay_close');
    $(document).on('click', '#line_overlay_close', function() {

        var returnUrl = document.referrer;
        if (returnUrl == null || returnUrl == undefined) {
            returnUrl = "/";
        }
        location.href = returnUrl;
    });


    if (window.history && window.history.pushState) {

        // . ブラウザ履歴に１つ追加
        history.pushState("otasukelp", null, "");
        $(window).on("popstate", function(event) {
            // . このページで「戻る」を実行
            if (!event.originalEvent.state) {

                $.ajax({
                    type : 'POST',
                    url: './line-at-pop/line-at-url.php',
                    data: null,
                    dataType:'json'
                })
                .done(function(data) {

                    // ポップアップ表示
                    if (data["display"] == 1) {

                        var ad_id = 0;
                        if ($.cookie('ad_id') === null) {
                            ad_id = 0;
                        } else {
                            ad_id = $.cookie('ad_id');
                        }

                        $.ajax({
                            type : 'POST',
                            url : './line-at-pop/lineat_increment.php',
                            data : {
                                ad_id : ad_id
                            }
                        });

                        var line_url = "https://lin.ee/sOA1yXb";

                        var lp_overlay =
                              '<div id="line" style="opacity: 0;">'
                            + '<p class="button"><button id="line_overlay_close" class="cross_button next close"></button></p>'
                            + '<p class="img_note"><img src="./line-at-pop/img/linepopup_img1.png" alt=""></p>'
                            + '<div class="line_button_b_back"><a href="' + line_url + '"></a></div>'
                            + '<div class="popup_cover"></div>'
                            + '</div>';

                        $('body').append(lp_overlay);
                        $("#line").stop().animate({
                            opacity : '1'
                        }, 1000);

                        // . もう一度履歴を操作して終了
                        history.pushState("otasukelp", null, "");

                    }

                });
            }
        });
    }
});