/**
 +------------------------------------------------
 * geziAddDiary part's js 
 * coded by smallfish
 +------------------------------------------------
 */

//addTitle button click event
$(function(){
	var thisButton = $('#Y_diaAddTitle p a');
	var thisInput = $('#Y_input');
	thisButton.click( function() {
		thisButton.parent().hide();
		thisInput.show();
		thisInput.focus();
	})
})


//addTag button click event
$(function() {
	
	var addTagButton = $('#Y_diaTag p a');
	var creatTagDiv = $('#Y_creatTag');
	var tagUl = $('#Y_tagUl');
	
	addTagButton.click( function() {
		addTagButton.parent().hide();
		creatTagDiv.fadeIn(500);
	})
	
	$('#Y_addedTag').delegate('a','click',function() {
					var thisA = $(this);
					var thisAVal = $(this).text();
					var addTemplate = '<li><span>'+ thisAVal + '</span><a title="删除" class="Y_remove">×</a></li>';
					tagUl.append( addTemplate );
					thisA.parent().css({
						'background':'#fff'
					})
					thisA.css({
						'color':'#BF1E2E',
					});
	})
	
})
//when #Y_creatTag's textarea foucs,clear the text of textarea 
$(function(){
	var thisInput = $('#Y_tagForm input');
	var tagUl = $('#Y_tagUl');
	var tagInput = $('#Y_tagInput');
	
	//click tagInput div,clear input's value
	
	tagInput.click(function(e){
		thisInput.val("").focus();
		thisInput.css('color','#000');
	})
	
	//enter spaceKey ,then add tag
	
	thisInput.keydown(function(e) {
			var keyCode = e.keyCode;
			if ( keyCode == 32 ) {
				var inputValue = thisInput.val();
				var tagTemplate = '<li><span>'+ inputValue + '</span><a title="删除" class="Y_remove">×</a></li>';
				tagUl.append( tagTemplate );
				thisInput.val("").focus();
			}
		})
		
	//when mouse leave the input,the input show "在这里添加分隔符，用空格分隔"
	thisInput.blur(function() {
		thisInput.val("在这里添加分隔符，用空格分隔").css('color','#ccc');
	})
	
})


$(function() {
	$('#Y_tagUl').delegate('a','click',function() {
		var thisTagLi = $(this).parent();
		console.log(thisTagLi);
		thisTagLi.remove();
	})
})
