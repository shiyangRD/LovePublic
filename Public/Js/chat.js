/**
+----------------------------------------------------------------
* handle Chat Choose 
+----------------------------------------------------------------
*/
$(function(){

   //Handle every Items(Person) hover behavior
   if($('.S_item')[0]){
	   $('.S_item').each(function(){
		  $(this).hover(function(){
			  $(this).css('backgroundColor','#E0E0E0');
			  $(this).find('.S_button').show();
		  },function(){
			  $(this).css('backgroundColor','');
			  $(this).find('.S_button').hide();
		  })
	   });
	   
	   //Handle  BottomBar's items for detail
	   $('.S_bottomBar .items').each(function(i){
		  $(this).click(function(){
			  $('.S_bottomBar .items').css('background',"url('../Images/S_bottomBar.png') repeat-x");			 
			  $(this).css('background',"url('../Images/bmBarhover.png') repeat-x");
			  $('#S_top').slideUp('slow');
			  $('.S_line').fadeOut('normal');
			  $(".S_layer").show();
			  $('#S_all').show();//the layer Show 
			  $('.S_layer').find('.S_list').removeClass("grey").eq(i).addClass("grey")
		  })
	   })
	}
   
   
   //handle chat request
   $(".S_button a").click(function(){
   		
   })
   
   
   
   
   //Handle mouseout Layer hide behavier
   
   //handle the layerItems 's hover behaivor
   $(".S_list").each(function(i){
		$(this).hover(function(){
			$(".items").eq(i).click();
		})						  
   });
   
   //Handle show carePerson
   $('#S_boxList li').each(function(i){
   	  $(this).hover(function(){
	  	  $(this).find(".S_outlayer").show();
	  },function(){
	  	  $(this).find(".S_outlayer").hide();
	  })
   });

   //handle font change
   $('#font').click(function(){
	   $('.S_face').hide();
       $(this).next('.S_fontbox').slideDown();
   }); 
   
  //handle font family change
  $("#fontFamily").change(function(){
     $('#S_div_box').css(
         'font-family',$("#fontFamily").find('option:selected').val()
     )
  });

  //handle over person touxiang
  $('.S_talkper').hover(function(){
     $(this).find('.S_all').css({'background-color':'#A6c8c7',width:'240px'});
      $('.S_hiddenBox').show();
      $(this).find('.S_banner').css('background','url("../Images/ownBg.png") no-repeat');
  },function(){
      $(this).find('.S_all').css({'background-color':'#58A39F',width:'170px'});
      $('.S_hiddenBox').hide();
      $(this).find('.S_banner').css('background','url("../Images/originstatus.png") no-repeat');
  })
  
  //handle show submit style
  $("#S_boxShow img").click(function(){
		$(".S_style").slideDown('slow');							 
  })
  
  //handle send style select
  var enter='enter';
  $(".S_style a").each(function(i){
	 $(this).click(function(){
		enter=(i==0)?'enter':'ctrl+enter';
		$(".S_style a").removeClass('S_selected').eq(i).addClass('S_selected').parent().hide();
	 })  
  });
  
  //handle submit talk contents
  
  $(".S_font1").click(function(){
  	  if($('#S_div_box').html()!=''){
	  	 //ajax submit content
		 $.ajax({
			url:'/chat/chatpage',
			data:$('#S_div_box').html(),
			type:'post',
			success:function(msg){
		       var content= $('.S_t ul').find('.S_tc').clone(true);
               content.find('S_tcBox').children('.S_Smid1').html(msg);
            },
            error:function(){
                $('.S_font1').click();
            }
		 });
	  }
  })
  
  

  //handle top three items on chatPage
	  //handle click
	  function check(obj){
		 for(var m=0;m<3;m++){
		 	if(obj[m])
				return true;
			return false;
		 }
	  }
	  function setfalse(active){
	  	 for(var k=0;k<3;k++)
		 	active[k]=false;
	  }
	  var active=[false,false,false];
  	  $('.S_bannerList ul li').find('a.white').each(function(i){
  	  	 $(this).click(function(){
			if(!active[i]){
				$('.S_bannerList').css("width","340px");
				setfalse(active);
				$('.S_bannerList ul li').css("width","82px");
				active[i]=true;//active Item
				$(".S_pershow").show();
				$(".S_pershow .S_list_show_box").hide().eq(i).show();
				$('.S_bannerList ul li').eq(i).css({"width":"160px"});//active item width
			}else {
				active[i]=false;
				if(!check(active))
					$('.S_bannerList').css("width","262px");
				$(this).parent().css('width','82px');
				$(".S_pershow").hide();
				$(".S_pershow .S_list_show_box").hide();
			}
	  	 })
  	  })
      //handle mouseover  on Top Three Items
	  $('.S_bannerList li').each(function(i){
  	  	 $(this).hover(function(){
	  	 	$(this).css({"background":"url(../Images/barhover.png) no-repeat"});
	  	 },function(){
			 $(this).css({"background":"url(../Images/barclick.png) no-repeat"});
		 })
  	  })
   
   //handle personInfo items(up) 's behavior
   $("#S_showMe").click(function(){
		var height=document.getElementById("list").scrollHeight,
		top=parseInt(height)-316;
       $(this).animate({'marginTop':"-"+top+"px"})
   })
   
  //handle  take attention
  var attention=false;
  $('.S_hiddenBox a').click(function(){
       if(attention==false){
          /*$.ajax({
            url:'',
            data:'',
            success:function(){
                $(this).html('已关注');
                attention=true;
            },
            error:function(){
                alert('出错啦');
            }
          })*/
       }
  })

  //handle chat bar Items3 for more photo 
  $('#upload').click(function(){
     $('#photo').click()||$('#photo').focus();
  })
  $('#photo').change(function(){
	  var val=$(this).val();
	  alert(/\.(jpg|png|gif)$/.test(val));
	  if(/\.(jpg|png|gif)$/.test(val))
  	 	 $("#S_div_box").html($("#S_div_box").html()+'<img src='+$(this).val()+' />');
	  else{
		  alert('不支持当前文件格式');
		  $(this).val('');
	  }
  })
  //handle font size change
  
  $('#fontSize').change(function(){
    $('#S_div_box').css('font-size',$("#fontSize").find('option:selected').val()+"px")
  });
  
  //handle div.Content focus and click  'Enter'
  $('#S_div_box').keypress(function(e){
  	 if(e.keyCode==13&&enter=='enter'){
	 	 $(".S_font1").click();
	 }else if(e.keyCode==10){
		 $(".S_font1").click();
	 }
  })
  
  //handle faceList showOrhide
  $("#faseList").toggle(function(){
  	  $('.S_face').show();
	  $('.S_fontbox').hide();
  },function(){
  	  $('.S_face').hide();
  })
  $(".S_face li img").each(function(){
  	 $(this).click(function(){
	 	$("#S_div_box").html($("#S_div_box").html()+$(this).parent().html());
		 $('.S_face').hide();
	 })
  })
  
  //handle Ie6 ScrollBar
  var ie6 = function () { if ( $.browser.msie && $.browser.version.slice(0, 3) == "6.0") return true;};
  if($('.S_record_content_list')[0])
	  if(ie6()){
		 $(".S_record_content").css('width','476px');
	  }else{
	  	  $(".S_record_content").css('width','496px');	 
	  }
  
  //handle div editer focus
   $('#S_div_box').click(function(){
      $('.S_fontbox').hide();
   }) 
   
   //handle open record window
   $("#record").click(function(){
   	  $('.S_chat_record').show();
   })
   
   //handle close record window
   $('#close').hover(function(){
   	    $(this).css('background','url("../Images/closeHover.png")');
   },function(){
	    $(this).css('background','url("../Images/close.png")');
   }).click(function(){
   		$('.S_chat_record').hide();
   })
   
   /*list_choose*/
   if($("#chatList")[0]){
	   $('.S_itemslist').each(function(){
		  $(this).hover(function(){
			  $(this).css('backgroundColor','#E0E0E0');
			  $(this).find('.S_button').show();
		  },function(){
			  $(this).css('backgroundColor','');
			  $(this).find('.S_button').hide();
		  })
	   });
   }
   /*End list_choose*/

   //chat request
   $('.S_button a').click(function(){
     var _self=$(this);
     $(this).text('正在请求...');
      var id='54';
      $.ajax({
        url:'/chat/start',
        data:id,
        type:'post',
        success:function(msg){
           var msg=eval('('+msg+')');
            if(msg.status=='0'){
                alert('请求失败，请重新点击');
                _self.text('请求聊天');
            }

        },
        error:function(){
           alert('请求出错了！(╯﹏╰）)'); 
        }
      })
   })
})

