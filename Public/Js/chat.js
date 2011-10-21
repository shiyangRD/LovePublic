/**
+----------------------------------------------------------------
* handle Chat Choose 
+----------------------------------------------------------------
*/
$(function(){

   //Handle every Items(Person) hover behavior
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
   
   //Handle mouseout Layer hide behavier
   
   //handle the layerItems 's hover behaivor
   $(".S_list").each(function(i){
		$(this).hover(function(){
			$(".items").eq(i).click();
		})						  
   });
   
   //Handle show carePer
   $('#S_boxList li').each(function(i){
   	  $(this).hover(function(){
	  	  $(this).find(".S_outlayer").show();
	  },function(){
	  	  $(this).find(".S_outlayer").hide();
	  })
   })
})

