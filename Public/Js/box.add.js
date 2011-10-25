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
					var addTemplate = '<li><span>'+ thisAVal + '</span><a title="删除" class="Y_remove" id="Y_aId">×</a></li>';
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
	var empty = function() {
		thisInput.val("").focus();
		thisInput.css('color','#000');

	}
	
	tagInput.click(empty);
	
	//enter spaceKey ,then add tag
	
	thisInput.keydown(function(e) {
			var keyCode = e.keyCode;
			if ( keyCode == 32 || keyCode ==13 ) {
				var inputValue = thisInput.val();
				var regexpStr = new RegExp('\\S');
				if ( regexpStr.test(inputValue) ) {
					var tagTemplate = '<li><span>'+ inputValue + '</span><a title="删除" class="Y_remove" id="Y_aId">×</a></li>';
					tagUl.append( tagTemplate );
					thisInput.val("").focus();
				} else {
					thisInput.val("");
				}
				
			}
		})
		
	//when mouse leave the input,the input show "在这里添加分隔符，用空格分隔"
	$(window).click(function(e) {
		var target = e.target.id;
		if ( target != 'Y_tagUl' && target != 'Y_tagForm' && target != 'Y_addIn' && target != 'Y_aId' && target != 'Y_tagInput') {
			thisInput.val("在这里添加分隔符，用空格分隔").css('color','#ccc');
		}else{
			thisInput.val("").focus();
		}
	})
	
	//
	$('#Y_tagUl').delegate('a','click',function() {
		var thisTagLi = $(this).parent();
		thisTagLi.remove();
	})
	
})

//ajax request
$(function() {
	var boxPost = function( uri, handler, method, getData ) {
		var _this = this;
		
		this.method = method || "GET";
		
		this.uri = uri;
		
		this.handler = handler;
		
		this.sendReq = function ( option ) {
			//solve IE cache question
			var second = new Date();
		
			var thisUrl = _this.uri + option + "&null=" + second.getTime();
			 
			$.ajax({
				type   : _this.method,
				url    : thisUrl,
				data   : getData,
				success: function( textStatus ){
					_this.handler( textStatus );
				}
			})
		}
	}

	$(".Y_bg").click(function() {
		
		var clickButton = $('.Y_bg input');
		clickButton.val('发布中')
		
		//get the title
		var titleObj = $('#Y_diaAddTitle input')
		var getTitle = titleObj.val();
		
		//get CKeditor's html
		
		var getHTML = CKEDITOR.instances.editor1.document.getBody().getText().toString();
		
		//get the tags
		var getTags = [];
		$('#Y_tagUl li span').each(function(){
			var tagValue = $(this).text();
			getTags.push( tagValue );	
		})
		var getTagString = getTags.toString();
		
		var postJsondata = "&title=" + getTitle + "&type=0" +"&content=" + getHTML +"&tag=" + getTagString;
		
		//send ajax request
		
		var postUri = "/grid/add/";
		
		//create callback function
		
		var answer = function( data ) {
			var dataObj = $.parseJSON( data );
			var answerStatus = dataObj.status;
			var answerInfo = dataObj.info;
			var answerData = dataObj.data;
			
			if ( answerStatus == 1){
				
				titleObj.val("");
				CKEDITOR.instances.editor1.document.getBody().setText("");
				clickButton.val('发布成功~正在跳转').delay(1000).queue( function() {
					window.location.href = '/';
				})
			}else{
				alert('阿哦，出现问题了~')
			}
		}
		
		var method = "POST";
		
		if (getHTML != "") {
			var article = new boxPost(postUri, answer, method, postJsondata);
			article.sendReq();
		}else{
			alert("请输入内容后在发布哦，亲~");
		}
		
	})
})
/**
 +------------------------------------------------
 * geziAddImage part's js 
 * coded by smallfish
 +------------------------------------------------
 */

//addTitle&addText&netUpload button click event
	
	
$(function(){
	var imgTitle1 = $('.Y_imgAT1');
	var imgTitle2 = $('.Y_imgAT2');
	var imgInput = $('.Y_imgInput').children();
	var imgArea = $('.Y_imgTextarea').children();
	var imgNetA = $('.Y_imgNetA');
	var imgNetInput = $('#Y_imgNetInput');
	var addButton = $('#Y_imgNetInput a');
	var netInput = imgNetInput.children();
	var imgBoxP = $('#Y_imgSearchBox p');
	
	//addTitle button click event
	
	imgTitle1.click(function() {
		$(this).hide();
		imgInput.val("为本组图片添加标题").show();
	})
	
	imgInput.focus(function() {
		imgInput.val("");
	})
	
	imgInput.blur(function() {
		imgInput.val("为本组图片添加标题");
	})
	
	//addText button click event
	var editor, html = '';

	function createEditor()
	{
		if ( editor )
			return;
	
		// Create a new editor inside the <div id="editor">, setting its value to html
		var config = {height:'76px;'};
		editor = CKEDITOR.appendTo( 'Y_imgTextarea', config, html );
	}

	imgTitle2.click(function() {
		$(this).hide();
		createEditor();
	})
	
	//netUpload button click event
	imgNetA.click(function() {
		$(this).hide();
		imgNetInput.show();
	})
	
	netInput.click(function() {
		$(this).val("").css('color','#474747');
	})
	
	//picture address from net 
	addButton.click(function(){
		// RegExp match
		var regExp2 = new RegExp("(^.+\\.jpg$)|(^.+\\.png$)|(^.+\\.gif$)");
		if ( !regExp2.test(netInput.val()) ){
			imgBoxP.text("不支持的图片格式");
		}else{
			imgBoxP.text("");
		}
	})
	
	//this page ajax request
	
})




 