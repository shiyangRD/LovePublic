$(function () {
/**
+----------------------------------------------------------------
* Determine the browser version
+----------------------------------------------------------------
*/
    var ie6 = function () { if ( $.browser.msie && $.browser.version.slice(0, 3) == "6.0") return true;}

/**
+----------------------------------------------------------------
* Control the behavior of all the menu
+----------------------------------------------------------------
*/
    var menu        = $("#topBar");
    var accS        = $("#accS"); 
    var accul       = $("#accul");
    if ( menu[0]) {
        // When scroll,fix the menu to the top of this window
        if ( !ie6()) {
            $(window).scroll(function () {
                ( $(window).scrollTop() <= 90 ) ? menu.removeClass("topBarFixed") : menu.addClass("topBarFixed");
            });
        };

        // Account Submenu control
        accS.click(function () {
            accS.addClass("accSDown");
            accul.slideDown('fast');
        });

        // All cancel click event
        $(window).click(function (e) {
            var tar = e.target.id;

            // Delegate all cancel click event
            if ( tar != "accS" ) {
                accS.removeClass("accSDown");
                accul.slideUp('fast');
            };
        });
    };

/**
+----------------------------------------------------------------
* Control the behavior of block'tool
+----------------------------------------------------------------
*/
    var boxTool     = $("#boxTool");
    var makeB       = $("#makeB a");
    var makeBul     = $("#makeBul");
    var makeBarr    = $("#makeBarr");
    var makeBcancel = $("#makeB .cancel")
    if ( boxTool[0]) {
        // Customize block Submenu control
        makeB.click(function () {
            makeB.addClass("makeBDown");
            makeBul.fadeIn(200);
            makeBarr.show();
        });

        // Cancel Customize block dialog
        makeBcancel.click(function () {
            makeB.removeClass("makeBDown");
            makeBul.hide();
            makeBarr.hide();
        });
    };

/**
+----------------------------------------------------------------
* Load script by dependency
+----------------------------------------------------------------
*/
    // Handle all box behavior
    var boxWrap = $("#boxWrap");
    if ( boxWrap[0]) {
        $.getScript("../Js/plugin/jquery.masonry.min.js");
        $.getScript("../Js/box.js");
    }; 
    
    //Handle chat Layer
    var bottomBar=$('#boxWrap_1');
    if(bottomBar[0]){
        $.getScript("chat.js");
    }
	
	//handle chat window
	//var chatBox=$('.S_chat_record');
	//if(chatBox[0]){
	//	$.getScript("chat.js");
	//	$.getScript('../Js/plugin/documentation.js');
	//	$.getScript('../Js/plugin/jquery.MetaData.js');
	//	$.getScript('../Js/plugin/jquery.rating.js');
	//}
	
});


