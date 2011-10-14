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
     * Sub scroll menu in index page
     */

    var menu = Y.one("#topBar");
    if (menu != null) {
        var hh    = parseInt(Y.one("#header").getStyle("height"));
        var accul = Y.one("#accul");
        var accS  = Y.one("#accS");
        YUI().use('event', 'transition', function (Y) {
    /*
     * Fixed the top menu in browser
     */
            Y.on('scroll', function (Y) {
                ( menu.get("docScrollY") <= hh ) ? menu.removeClass("topBarFixed") : menu.addClass("topBarFixed");
            });

    /*
     * Toggle menu : account and message
     */
            Y.one("#accS").on('mousemove', function (Y) { accul.show(); accS.addClass("accSDown"); });
            Y.on('click', function (e) { if ( e.target.get('id') != 'accS' ) { accul.hide(); accS.removeClass("accSDown"); }; });
        });
    };

    /*
     * Handle box 
     * Extending Base for Box MVC
     */
    var boxWrap    = Y.one("#boxWrap");
    var blankBlock = Y.one("#blankBlock"); 
    var body       = Y.one('body');
    var refrB     = Y.one('#refrB a');

    if ( boxWrap != null ) {
        YUI().use('model', 'view', 'transition', 'io', function (Y) {
    /*
     * Model: Update box
     * 'uri'   : property,  Storage request link;
     * 
     * 'format': method,    Format JSON type data to js object;
     */
            Y.UpdateBox = Y.Base.create('UpdateBox', Y.Model, [], {
    /*
     * Format JSON to array,bake it by format(i)
     */

                format : function (index) {
                    try{
                        var res   = Y.JSON.parse(this.data);
                            index = index || 0;
                        this.set('imagePath',res[index]);
                        return res.length;
                    }
                    catch(error) {
                        return 0;
                    };
                }
            }, {
                ATTRS  : {
                    imagePath : {
                        value: '/Public/Images/tempBlock.png'
                    }
                }
            });

    /*
     * Render box by View's mehod render()
     */

            Y.RenderBox = Y.Base.create('renderBox', Y.View, [], {

                container   : boxWrap,

                template    : '<div class="block"><img src="{imagePath}" /></div>',

                origin      : 0,

                render      : function (page) {
                    var page = page,
                        len  = this.model.format(); 
                        
                    this.origin = page*len;

                    if (len != 0) {

                        for (var i=0; i<len; i++) {
                            this.model.format(i);
                            this.container.insert(Y.Lang.sub(
                                this.template, this.model.getAttrs(['imagePath'])
                            ));
                        };
                        blankBlock.setStyle('height', '70px');
    /*
     * Animation of boxes,after the render method
     */
                        var all  = Y.all('.block');
                        var size = all.size();
                        var i   = this.origin-1;
                        function anim () {
                            i+=1;
                            if (i<size) {
                                all.item(i).transition({
                                    duration : 0.12,
                                    easing   : 'ease-in-out',
                                    opacity  : 1 
                                    //width    : '160px',
                                    //height   : '160px'
                                }, function (){anim()});
                            }
                            else {
                                return false;
                            }
                        };
                        anim();
                    }
                    else {
                        blankBlock.setStyle('height', '90px');
                        blankBlock.setContent('没有更多了');
                    };
                }
            });

    /*
     * Handle render and data of boxes
     * 'req'   : method,    Send XHR with page number, and get response data, put data to this.model.data, go this.render
     * 'uri'   : property,  Initial the XHR's uri
     */
            Y.HandleBox = Y.Base.create('handleBox', Y.Base, [], {
                view   : '',

                model  : '',

                page   : 0,

                uri    : '../box.php?page=',

                req    : function (page) {
                    var page = page;
                    
                    var uri  = this.uri+page;

                    var that = this;

                    var cfg  = {
                        method : 'GET',
                        on     : {
                            start    : function () {
                                boxWrap.addClass('loading');
                                blankBlock.setStyle('height', '90px');
                            },
                            complete : function (id, o) {
                                that.model.data = o.responseText;
                                that.view.render(page);
                                boxWrap.removeClass('loading');
                            },
                            failure  : function () {
                                blankBlock.setStyle('height', '90px');
                                blankBlock.setContent('网络故障，请检查网络链接');
                            }
                        }
                    };

                    Y.io(uri, cfg);
                },

                handle : function () {
                    var page = this.page;
                    var that = this;
                    this.req(page)
                    
                    Y.on('scroll', function () {
                        var scrlH = boxWrap.get('docScrollY'),
                            docH  = body.get('docHeight'),
                            scrnH = body.get('winHeight'),
                            bool;

                        ( scrlH + scrnH == docH ) ? bool = 1 : bool = 0;

                        if ( bool ==1) {
                            page+=1;
                            that.req(page);
                        }
                        else {
                            return false;
                        };
                    });
                },

                init   : function (view, model) {
                    this.view = view;
                    this.model= model;
                } 
            });
    /*
     * Instantiated M V C
     */
            var boxM = new Y.UpdateBox();
            var boxV = new Y.RenderBox({model: boxM});
            var boxC = new Y.HandleBox();
                boxC.init(boxV, boxM);
    /*
     * Run this Contoller
     */
            boxC.handle();
    /*
     * Refresh the page
     */
            refrB.on('click', function () {
                boxWrap.setContent('');
                boxC.req(0);
            });
        });
    };
});
