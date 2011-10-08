/*
 * Based on YUI 3.4.1 (build 4118)
 * Copyright 2011 yerya.com All rights reserved.
 */
/*
 * bootstrap
 * DOM access code according to different
 */
//dsfkasdflkdsj

YUI().use('node', function (Y) {

    /*
     * sub scroll menu in index page
     */
    var menu = Y.one("#topBar");
    
    if (menu != null) {
        YUI().use('event', 'node', 'transition', function (Y) {
    /*
     * fixed the top menu in browser
     */
            var h = parseInt(Y.one("#header").getStyle("height"));
            Y.on('scroll', function (Y) {
                ( menu.get("docScrollY") <= h ) ? menu.removeClass("topBarFixed") : menu.addClass("topBarFixed");
            });

    /*
     * toggle account menu
     */
            var ul = Y.one("#accul");
            var b  = Y.one("#accS");
            Y.one("#accS").on('click', function (Y) {
                ul.show();
                b.addClass("accSDown");

            });
            Y.one("#mainWrap").on('click', function (e) {
                if ( e.target.get('id') != 'accS' ) {
                    ul.hide();
                    b.removeClass("accSDown");
                };
            });
        });
    };

    /*
     * update box 
     */
    var boxWrap = Y.one("#boxWrap");

    if ( boxWrap != null ) {

        for ( var i = 0; i <= 47; i++ ) {
            boxWrap.insert("<div class='block'></div>");
        }
    };

});
