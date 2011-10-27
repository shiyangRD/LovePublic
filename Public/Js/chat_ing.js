$(function(){
  if($("#record_content")[0]){
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
  });
   setInterval(function(){
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
  }; 
})
