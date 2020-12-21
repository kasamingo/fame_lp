$(function() {

    let from = new FormClass();
});


function FormClass() {

    this.pm = new Object();

    this.is_submit = false;

    this.pm.ad_id = $.cookie('ad_id');
    this.pm.agent_id = $.cookie('agent_id');
    this.pm.agent_kbn = $.cookie('agent_kbn');


    var status_id = Number($.cookie('status_id'));

    if (status_id < 2) {
        status_id = 2;
    }

    this.status_id = status_id;

    var self = this;

    self.update_status(status_id);

    self.init();
}

FormClass.prototype.init = function() {

    var self = this;

    self.pm.prop_type_id = '';
    self.pm.pref_id = '';
    self.pm.building_age_id = '';
    self.pm.insurance_id = '';
    self.pm.comment = '';
    self.pm.name = '';
    self.pm.phone1 = '';
    self.pm.phone2 = '';
    self.pm.phone3 = '';
    self.pm.email = '';


    $(document).on('change', 'select', function() {
        if (empty($(this).val())) {
            $(this).css('color', '#d2d2d2');
        } else {
            $(this).css('color', '#000');
        }
    });

    $('#phone1').off('keyup change');
    $('#phone1').on('keyup change', function() {
        if ($(this).val().length > 2) {
            $('#phone2').focus();
        }
    });

    $('#phone2').off('keyup change');
    $('#phone2').on('keyup change', function() {
        if ($(this).val().length > 3) {
            $('#phone3').focus();
        }
    });

    $(document).off('click', '#submit');
    $(document).on('click', '#submit', function() {
        if (!self.validated()) {
            return false;
        }

        if (self.is_submit) {
            alert('処理中です。\nしばらくお待ち下さい。');
            return false;
        }

        self.submit();
    });


    //レンダリング後に走るように遅延
    setTimeout(function() {
        $('select').map(function(){
            if (empty($(this).val())) {
                $(this).css('color', '#d2d2d2');
            } else {
                $(this).css('color', '#000');
            }
        });
    }, 10);
};

FormClass.prototype.validated = function() {

    var self = this;
    let err = [];


    if (empty($('input[name="prop_type_id"]:checked').val())) {
        err.push('物件情報を選択して下さい。');
    } else {
        self.pm.prop_type_id = $('input[name="prop_type_id"]:checked').val();
    }


    if (empty($('#pref_id').val())) {
        err.push('都道府県を選択して下さい。');
    } else {
        self.pm.pref_id = $('#pref_id').val();
    }


    if (empty($('#building_age_id').val())) {
        err.push('築年数を選択して下さい。');
    } else {
        self.pm.building_age_id = $('#building_age_id').val();
    }


    if (empty($('#insurance_id').val())) {
        err.push('保険の種類を選択して下さい。');
    } else {
        self.pm.insurance_id = $('#insurance_id').val();
    }


    if (!empty($('#comment').val())) {
        self.pm.comment = $('#comment').val();
    }


    if (!empty($('#name').val())) {
        self.pm.name = $('#name').val();
    }


    $('#phone1').val(full2Half($('#phone1').val()));
    $('#phone2').val(full2Half($('#phone2').val()));
    $('#phone3').val(full2Half($('#phone3').val()));
    let phone1 = $('#phone1').val();
    let phone2 = $('#phone2').val();
    let phone3 = $('#phone3').val();
    let phone = phone1 + phone2 + phone3;

    if (empty(phone1) || empty(phone2) || empty(phone3)) {
        err.push('電話番号を入力して下さい。');
    } else if (!phone.match(/^[0-9]+$/)) {
        err.push('電話番号は数字で入力して下さい。');
    } else if (!phone.match(/^(090|080|070)/)) {
        err.push('電話番号は携帯番号を入力して下さい。');
    } else {

        if (!phone.match(/^[0-9]{11}$/)) {
            err.push("電話番号は11ケタで入力して下さい。");
        }

        let ng_phones = [];
        ng_phones.push('12345678');
        ng_phones.push('11111111');
        ng_phones.push('22222222');
        ng_phones.push('33333333');
        ng_phones.push('44444444');
        ng_phones.push('55555555');
        ng_phones.push('66666666');
        ng_phones.push('77777777');
        ng_phones.push('88888888');
        ng_phones.push('99999999');

        let reg = new RegExp('(' + ng_phones.join('|') + ')$');
        if (phone.match(reg)) {
            err.push("無効な電話番号です。");
        }

        if (err.length == 0) {
            self.pm.phone1 = phone1;
            self.pm.phone2 = phone2;
            self.pm.phone3 = phone3;
        }
    }


    $('#email').val(full2Half($('#email').val()));
    let email = $('#email').val();

    if (!empty(email)) {
        if (!chMail(email)) {
            err.push('正しいメールアドレスを入力して下さい。');
        } else {
            self.pm.email = email;
        }
    }


    if (err.length > 0) {
        alert(err.join('\n'));
        return false;
    }

    return true;
};

FormClass.prototype.submit = function() {

    var self = this;
    var php_name = "sim_ajax_type2.php";

    self.is_submit = true;
    self.pm.type = 3;

    $('<p id="loader"><img src="img/preload.gif" alt="" width="30" height="30" /></p>')
    .appendTo('body')
    .hide()
    .fadeIn(100);

    $.ajax({
        url : '../js/' + php_name,
        type : 'post',
        data : self.pm,
        dataType : 'json'
    }).done(function(response) {

        if (response.err.length > 0) {
            alert(response.err.join("\n"));
            return false;
        }

        // thanks
        let url = 'thanks.php?visitor_id=' + response.visitor_id;
        location.href = url;

    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert('エラーが発生しました。');
    }).always(function(jqXHR, textStatus) {
        $('#loader').remove();
        self.is_submit = false;
    });
};

FormClass.prototype.update_status = function(status_id) {

    var php_name = "sim_ajax_type2.php";

    var status_max = 2;

    var pm = new Object();

    pm.type = 5;
    pm.ad_id = $.cookie('ad_id');
    pm.status_id = status_id;

    if ($.cookie('status_id') <= status_max) {
        if ($.cookie('status_id') < status_id) {
            $.ajax({
                type : 'POST',
                url : '../js/' + php_name,
                data : pm,
                dateType : 'JSON'
            }).done(function(data) {
                $.cookie("status_id", status_id, {
                    expires : 3,
                    path : '/',
                    domain : location.hostname
                });
            }).fail(function(XMLHttpRequest, textStatus, errorThrown) {

            });
        }
    }
};

function full2Half(str) {

    if (empty(str)) {
        return;
    }

    str = str.replace(/[ａ-ｚＡ-Ｚ０-９！-～]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    });

    str = str.replace('￥', '\\');
    str = str.replace('’', '\'');
    str = str.replace('〜', '~');
    str = str.replace('　', ' ');

    return str;
}

function chMail(mf) {
    ml = /.+@.+\..+/;
    if (!mf.match(ml)) {
        return false;
    }
    return true;
}

function empty(val) {
    if (val == null || val == undefined || val == 0 || val == '') {
        return true;
    }

    if (val instanceof Array) {
        if (val.length == 0) {
            return true;
        }
    }

    return false;
}