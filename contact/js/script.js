$(function(){
    $('select').on('change',function(){
        $(this).css('color',$(this).find('option:selected').get(0).style.color);
    }).trigger('change');


    var sending_flg = false;

    window.onpageshow = function(){
        sending_flg = false;
    }

    $('.sendmail_btn').off('click');
    $('.sendmail_btn').on('click', function(){

        if (sending_flg) {
            return false;
        } else {
            sending_flg = true;
        }
    });


});