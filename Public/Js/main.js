$(function () {
/**
+----------------------------------------------------------------
* Determine the browser version
+----------------------------------------------------------------
*/
    var ie6 = function () { if ( $.browser.msie && $.browser.version.slice(0, 3) == "6.0") return true;}

/**
+----------------------------------------------------------------
* Get body node
+----------------------------------------------------------------
*/
    var body = (window.opera) ? ( document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html, body');

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

            if ( tar != "addBa") {
                $("#addBa").removeClass("addBDown");
                $("#makeBoption").hide();
            };
        });
    };

/**
+----------------------------------------------------------------
* Control the behavior of all the menu
+----------------------------------------------------------------
*/
    var avtLINK = $("#avtLINK");
    var avtIMG  = $("#avtIMG");
    var accMNAME= $("#accMNAME");

    // Get Current User Information

    $.ajax({
        type    : "GET",
        url     : "/home/user/currentinfo",
        success : function (data) {
            if ( data != "" ) var originDATA = $.parseJSON(data);
            var status = originDATA.status;
            var DATA   = originDATA.data;
            var userID = originDATA.userid;
            var nick   = DATA.nickname;
            var avatar = DATA.thumb;

            // Update avatar
            avtIMG.attr("src", avatar);
            accMNAME.text( nick );
        }
    });

/**
+----------------------------------------------------------------
* Load script by dependency
+----------------------------------------------------------------
*/
    // Handle all box behavior
    var boxWrap = $("#boxWrap");
    if ( boxWrap[0]) {
        $.getScript("/Public/Js/plugin/jquery.masonry.min.js");
        $.getScript("/Public/Js/box.js");
    }; 

    // Handle all box behavior
    var S_box = $("#S_box");
    if ( S_box[0]) {
        $.getScript("../Js/chat.js");
    }; 

    // Activity controller
    var Y_content = $("#Y_content");
    if ( Y_content[0]) {
        $.getScript("../Js/activity.js");
    };
	
    // User-Complete js
    var L_compt = $("#L_compt");
    if ( L_compt[0]) {
        $.getScript("../Js/user-completed.js");
    };
    // Login js
    var L_rgLink = $("#L_rgLink");
    if ( L_rgLink[0]){
        $.getScript("../Js/login.js");
    };
    // Forget js
   // var L_send = $(".L_sented");
   // if ( L_send[0]){
     //   $.getScript("../Js/forget-password.js");
   // };
});
