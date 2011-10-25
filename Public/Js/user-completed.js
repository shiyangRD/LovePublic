$(document).ready(function(){
        $('#L_compt').show();
        $('.L_tabs li:first').addClass('L_active');
        $('.L_tabs li a').each(function(e){
            $(this).click(function(e){

                // $(this).addClass('L_active');
                // $(this).removeClass('L_active');
                var target = $(this).attr('rel');
                $('.L_right-top > div').hide();
                $('#'+target).removeClass("L_d").fadeIn();

                });
            });
        $(".L_right-down").click(function(){
            if ( $('#L_div1 > input').val() != $('#L_div2 > input').val() ){
            $("#L_LL").text("两次输入的密码不同").show();
            alert ($("#L_LL").text());
            return false;
            }; 
            });

});
   
