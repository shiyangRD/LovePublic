/**
 +--------------------------------------
 *tab change on activity.js 
 +--------------------------------------
 */
$(document).ready(function(){
	$('#Y_bannerUl li a').each(function(e){
		$(this).click(function(e){
			var tab=$(this).attr('rel'); 
			var target=$('#'+tab);
			console.log(target);
			if(target.size()>0){
				$('#Y_bannerUl li a').removeClass('on');
				$(this).addClass('on');
				$('#Y_tab>div').hide();
				target.show();
			}
		})
	})
})
