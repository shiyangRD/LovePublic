$(document).ready(function() {
/**
 +--------------------------------------------------------------------------------------
 *float middle
 *--------------------------------------------------------------------------------------*/
$(window).resize(function(){ 
$('#L_content').css({ 
position:'absolute', 
left: ($(window).width() - $('#L_content').outerWidth())/2, 
top: ($(window).height() - $('#L_content').outerHeight())/2 
}); 
$('#L_wrap-register').css({ 
position:'absolute', 
left: ($(window).width() - $('#L_wrap-register').outerWidth())/2, 
top: ($(window).height() - $('#L_wrap-register').outerHeight())/2 
}); 

}); 
//初始化函数 
$(window).resize(); 
/**
 /+--------------------------------------------------------------------------------------
 *pageSlide effect
 *--------------------------------------------------------------------------------------/
*/
$('#L_wrap-register').addClass('L_disp');
$('#L_rgLink').click(function(){
    $('#L_wrap').fadeOut(500);
    $('#L_wrap-register').removeClass('L_disp');
    $('#L_wrap').hide();

});
$('#L_lgLink').click(function(){
    $('#L_wrap-register').fadeOut();
    $('#L_wrap').fadeIn(1500);
 //   $('#L_wrap-register').hide();
  //  $('#L_wrap-register').removeClass('L_disp');
   });

/**
---------------------------------------------------------------------------------------
*highlight effect
---------------------------------------------------------------------------------------
*/ 
   // var elements = $("input[type!='submit'], textarea, select");
   // elements.focus(function(){
   //     $('.L_label-name').addClass('L_highlight');
   // });
    //elements.blur(function(){
   //     $('.L_label-name').removeClass('L_highlight');
    //});
    

/**
---------------------------------------------------------------------------------------
validate 
---------------------------------------------------------------------------------------
*/
    $("#L_login-form").validate({
        rules:{
                  password:{
                               required:true,
                           },
        email:{
                  required:true,
        email:true,
              },
              },
        messages:{
                     password:{
                                  required:"请输入密码",

                              },
                    email:{
                                    required:"请输入邮箱",
                                    email:"邮箱格式错误",
              }
                 },

    });

/**
---------------------------------------------------------------------------------------
validate 
---------------------------------------------------------------------------------------
*/

/**
 * --------------------------addMethod to suppose as follow----------------------------------
*/   
    jQuery.validator.addMethod("stringCheck", function(value, element) {       
        return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);       
    }, "只支持汉字、字母、数字、下划线");   

/**
 ----------------------------validate begin...-------------------------------------------
 */
    $("#L_register-form").validate({

        debug:false,                  //debug mode trun off
        errorClass:"error",           //add myown error class:error
        submitHandler:function(form){ //change submit function
            form.submit();
        },
        rules:{                       //set rules
                  password:{
                            required:true,     //password requried
                            minlength:6        //set minlength=6
                           },
                    confirm_password:{
                  
                            required:true,
                            minlength:6,
                            equalTo:"#password"
                            
                  },

                     name:{
                            stringCheck:true,
                            required:true,
                            remote:{           //***********here is the place to link to php
                                    url:"../test.php",            //change the name of it!!!!!!!
                                    type:"post",
                                    dataType:"json",
                                    data:{
                                            cname:function(){
                                            return$("#cname").val();
                                                            }
                                        }       

                                    }
                            },
                    email:{
                            required:true,
                            email:true,
                            remote:{        //****************the same....
                                    url:"../test.php",                
                                    type:"post",
                                    dataType:"json",
                                    data:{
                                        cemail:function(){
                                            return$("#cemail").val();
                                                        }
                                        }

                                    }
                        },
                                 },

        messages:{
                     password:{
                                  required:"请输入密码",
                                  minlength:jQuery.format("密码不能小于{0}个字符")
                              },
                     confirm_password:{
                                          required:"请输入密码",
                                          minlength:jQuery.format("密码不能小于{0}个字符"),
                                          equalTo:"两次输入密码不一致"
                                      },
                     name:{
                              required:"请输入昵称",
                              stringCheck:"只支持汉字、字母、数字和下划线",
                              remote:$.format("该昵称已注册，换一个吧~"),

                          },
                     email:{
                               required:"请输入邮箱",
                               email:"邮箱格式错误",
                               remote:$.format("该邮箱已注册，直接登录哦~"),
                           }
                 },
    });



});

