$(function(){
  $(".S_font1").click(function(){
  	  if($('#S_div_box').html()!=''){
	  	 //ajax submit content
		 $.ajax({
			url:'/chat/ajaxPushMessage',
			data:"content="+$('#S_div_box').html(),
			type:'post',
			success:function(msg){
               var obj=eval('('+msg+')');
               if(obj!=null){
		          var content= $('.S_t ul').find('.S_mc').eq(0).clone(true);
                  content.find('S_tcBox').children('.S_Smid').html($('#S_div_box').html());
                  content.appendTo('.S_t ul');
                  content.focus();
                  $("#S_div_box").html('');
               }
            },
            error:function(){
                $('.S_font1').click();
            }
		 });
	  }
  });
  /* setInterval(function(){
     $.ajax({
			url:'/chat/ajaxPullMessage',
			data:'content=1',
			type:'post',
			success:function(msg){
		       var content= $('.S_t ul').find('.S_tc').eq(0).clone(true);
               var obj=eval("("+msg+")");
               if(obj!=null){
                 content.find('.S_tcBox').children('.S_Smid').html(obj.data);
                 content.appendTo($(".S_t ul"));
                 content.focus();
               }
            },
            error:function(){
                $('.S_font1').click();
            }
		 });
    },1000); 
  }; */
})
