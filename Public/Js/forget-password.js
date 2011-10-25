$(document).ready(function(){
 //----------------forget_password------------
    $('.L_sented').hide();
    $("form").submit(function(){
        if($('input').val() == "lifang@epptime.com"){
    $("#L_send-submit").click(function(){
        $('#L_fgwrap').hide();
        $('.L_sented').show();
    });
        };
        $("#L_1").text("该邮箱还未注册。").show();
        $('#L_2 > a').text("立即注册？").show();
        return false;
    });
});
