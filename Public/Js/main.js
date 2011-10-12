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
     * Handle box 
     */

    var boxWrap    = Y.one("#boxWrap");
    var blankBlock = Y.one("#blankBlock"); 
    var body       = Y.one('body');
    if ( boxWrap != null ) {
    /*
     * Extending Base for Box MVC
     */
        YUI().use('model', 'view', 'controller', 'transition', 'io', function (Y) {
    /*
     * Message and Notice
     * Class
     */

    /*
     * Model: Update box
     * 'uri'   : property,  Storage request link;
     * 'req'   : method,    Send XHR with page number, and get response data;
     * 'format': method,    Format JSON type data to js object;
     */
            Y.UpdateBox = Y.Base.create('UpdateBox', Y.Model, [], {
                that   : this,

                uri    : '../box.php?page=',

                req    : function (page) {
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
                                that.data = o.responseText;
                                boxWrap.removeClass('loading');
                            },
                            failure  : function () {
                                blankBlock.setStyle('height', '90px');
                                blankBlock.setContent('网络故障，请检查网络链接');
                            }
                        }
                    };

                    var request = Y.io(uri, cfg);
                },
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

                initializer : function () {
                    var model = this.model;
                },

                origin      : 1,

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
                    }
                    else {
                        blankBlock.setStyle('height', '90px');
                        blankBlock.setContent('网络故障，数据不可用，貌似服务器找妹纸去了……');
                    };
    /*
     * Animation of boxes,after the render method
     */
                    var all = Y.all('.block');
                        len = all.size()-this.origin;
                    var i   = this.origin-1;
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

    /*
     * Handle render and data of boxes
     */
            Y.HandleBox = Y.Base.create('handleBox', Y.Base, [], {
                view   : '',

                model  : '',

                page   : 0,

                handle : function () {
                    var page = this.page;
                    var that = this;
                    this.model.req(page);
                    Y.on('io:success', function (){
                        that.view.render(page);
                    });
                    
                    Y.on('scroll', function () {
                        var scrlH = boxWrap.get('docScrollY'),
                            docH  = body.get('docHeight'),
                            scrnH = body.get('winHeight'),
                            bool;

                        ( scrlH + scrnH == docH ) ? bool = 1 : bool = 0;

                        if ( bool ==1) {
                            page+=1;
                            that.model.req(page);
                            Y.on('io:success', function (){
                                that.view.render(page);
                            });
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
            var boxM = new Y.UpdateBox();
            var boxV = new Y.RenderBox({model: boxM});
            var boxC = new Y.HandleBox();
                boxC.init(boxV, boxM);
                boxC.handle();
        });
    };
});
