/*
 * Based on YUI 3.4.1 (build 4118)
 * Copyright 2011 yerya.com All rights reserved.
 */
/*
 * bootstrap
 * DOM access code according to different
 */

YUI().use('node', function (Y) {

    /*
     * sub scroll menu in index page
     */

    var menu = Y.one("#topBar");
    if (menu != null) {
        var hh    = parseInt(Y.one("#header").getStyle("height"));
        var accul = Y.one("#accul");
        var accS  = Y.one("#accS");
        YUI().use('event', 'transition', function (Y) {
    /*
     * fixed the top menu in browser
     */
            Y.on('scroll', function (Y) {
                ( menu.get("docScrollY") <= hh ) ? menu.removeClass("topBarFixed") : menu.addClass("topBarFixed");
            });

    /*
     * toggle account menu
     */
            Y.one("#accS").on('click', function (Y) {
                accul.show();
                accS.addClass("accSDown");

            });
            Y.one("#mainWrap").on('click', function (e) {
                if ( e.target.get('id') != 'accS' ) {
                    accul.hide();
                    accS.removeClass("accSDown");
                };
            });
        });
    };

    /*
     * handle box 
     */

    var boxWrap = Y.one("#boxWrap");
    if ( boxWrap != null ) {
    /*
     * Extending Base for Box MVC
     */
        YUI().use('model', 'view', 'transition', function (Y) {
    /*
     * update box
     */
            Y.UpdateBox = Y.Base.create('UpdateBox', Y.View, [], {
                data : '["../Images/block01.png","../Images/block01.png","../Images/block02.png","../Images/block03.png","../Images/block04.png","../Images/block06.png","../Images/block02.png","../Images/block02.png","../Images/block03.png","../Images/block04.png","../Images/block06.png","../Images/block02.png","../Images/block03.png","../Images/block04.png","../Images/block06.png","../Images/block07.png","../Images/block07.png","../Images/block04.png","../Images/block06.png","../Images/block07.png","../Images/block07.png","../Images/block02.png","../Images/block03.png","../Images/block04.png","../Images/block06.png","../Images/block07.png","../Images/block08.png","../Images/block05.png","../Images/block06.png","../Images/block07.png","../Images/block08.png","../Images/block06.png","../Images/block06.png","../Images/block07.png","../Images/block08.png","../Images/block07.png","../Images/block08.png","../Images/block09.png","../Images/block10.png","../Images/block11.png","../Images/block12.png","../Images/block13.png","../Images/block14.png","../Images/block15.png","../Images/block16.png","../Images/block17.png","../Images/block18.png"]',
                json : function (index) {
                    var res   = eval('('+this.data+')'),
                        index = index || 0;
                    this.set('imagePath',res[index]);
                    return res.length;
                }
            }, {
                ATTRS : {
                    imagePath : {
                        value: '../Images/tempBlock.png'
                    }
                }
            });

    /*
     * render box
     */
            Y.RenderBox = Y.Base.create('renderBox', Y.View, [], {

                container   : boxWrap,

                template    : '<div class="block"><img src="{imagePath}" /></div>',

                initializer : function () {
                    var model = this.model;
                },
                
                render      : function () {
                    var origin = Y.all('.block').size();
                        len = this.model.json();
                        len = len + origin;

                    for (var i=origin; i<len; i++) {
                        this.model.json(i);
                        this.container.insert(Y.Lang.sub(
                            this.template, this.model.getAttrs(['imagePath'])
                        ));
                    };

                    var all = Y.all('.block');
                    len = all.size()-origin;
                    var i = origin-1;
                    function anim () {
                        i+=1;
                        if (i<len) {
                            all.item(i).transition({
                                duration : 0.12,
                                easing   : 'ease-in-out',
                                width    : '160px',
                                height   : '160px'
                            }, function (){anim()});
                        }
                        else {
                            return false;
                        }
                    };
                    anim();
                }
            });

        var boxModel = new Y.UpdateBox(),
            boxView  = new Y.RenderBox({model: boxModel});

        boxView.render();
        });
    };

});
