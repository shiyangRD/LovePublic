$(function () {
/**
+----------------------------------------------------------------
* Class    : Box 
* Property : uri, XHRmethod 
* Method   : req(option)
+----------------------------------------------------------------
*/
    var Box = function (uri, handle, XHRmethod) {
        // Reg this pointer
        var _this = this;

        // Server path 
        this.uri = uri;

        // XHR method
        this.XHRmethod = XHRmethod || "GET"; 

        // Afer XHR finished handle
        this.handle = handle;

        // Ajax Initial
        this.req = function (option) {
            var t = new Date();

            // Request to send, "null" is debug for IE
            URL = _this.uri + option + "&null=" + t.getTime();

            // XHR and handle
            $.ajax({
                type    : _this.XHRmethod,
                url     : URL,
                success : function (data) {
                    _this.handle(data);
                }
            });
        };
    };

/**
+----------------------------------------------------------------
* Control all box action
+----------------------------------------------------------------
*/
    var content = $("#content");
    var boxWrap = $("#boxWrap");
    if ( boxWrap[0]) {
        // Initial Render Page
        var renderBox = function (data) {
            // Loading 
            var MSG = $("#msg");
            MSG.addClass("loading");
            MSG.animate({
                height: "30",
            },300);

            // Parse box data
            var originDATA = $.parseJSON(data) || null;

            try{
                var status = originDATA.status;
                var info   = originDATA.info;
                var DATA   = originDATA.data;
                var comment= originDATA.data.comment;

                if ( status == 0 ) {
                    MSG.removeClass("loading");
                    MSG.text("Network Error!");
                    return false;
                };

                if ( DATA == "" || DATA == null || DATA == undefined ) {
                    MSG.removeClass("loading");
                    MSG.text("No More");
                    return false;
                };
            } 
            catch(e) {
                MSG.removeClass("loading");
                MSG.text("Network Error!");
                return false;
            };

            // Template of Box
            var templateBox = '';

            for ( var i in DATA) {
                // Template of Text Box
                if ( DATA[i].type == 0 ) {
                    templateBox += '<div class="box"><span gridid="' + DATA[i].gridid + '" class="title titleBig" >' + DATA[i].title + '</span><div class="description">' + DATA[i].description + '</div><a href="/home/home/index/id/' + DATA[i].userid + '" class="author">' + DATA[i].author + '</a><span class="time">' + DATA[i].time_edit + '</span><span class="like"></span><span class="num_like">' + DATA[i].num_like + '</span></div>';
                };

                // Template of Image Box
                if ( DATA[i].type == 1 ) {
                    templateBox += '<div class="box"><img gridid="' + DATA[i].gridid + '" src="' + DATA[i].thumb + '" /><span gridid="' + DATA[i].gridid + '" class="title">' + DATA[i].title + '</span><a href="/home/home/index/id/' + DATA[i].userid + '" class="author">' + DATA[i].author + '</a><span class="time">' + DATA[i].time_edit + '</span><span class="like"></span><span class="num_like">' + DATA[i].num_like + '</span></div>';
                };
            };

            // Render the box
            boxWrap.imagesLoaded( function () {
                boxWrap.masonry({
                    itemSelector : '.box',
                    columnWidth : 1,
                    isAnimated : true
                });
            });

            // Append Into boxWrap
            templateBox = $( templateBox );
            templateBox.imagesLoaded( function () {
                templateBox.animate( { opacity : 1 } );
                boxWrap.append( templateBox ).masonry( 'appended', templateBox );
            });

            // Clear Loading Message
            MSG.animate({
                height: "0",
            },130);

        };

        // Instantiate Box
        var page = 1;
        var updateBox = new Box("/grid/showList/", renderBox);
        updateBox.req("/page/1/size/30");

        // Scroll control 
        $(window).scroll(function () {
            if ( $(document).height() == $(window).scrollTop() + $(window).height()) {
                page += 1;
                updateBox.req("/page/" + page + "/size/12");
            };
        });
/**
+----------------------------------------------------------------
* Open box action
+----------------------------------------------------------------
*/
        // Open box template
        var openBox               = $("#openBox"),
            openBoxCancel         = $("#openBoxCancel"),
            openBoxAuthorAvatar   = $("#openBoxAuthorAvatar"),
            openBoxAuthorName     = $("#openBoxAuthorName span"),
            openBoxTitle          = $("#openBoxTitle"),
            openBoxContent        = $("#openBoxContent"),
            openBoxImg            = $("#openBoxImg"),
            openBoxContentContent = $("#openBoxContentContent"),
            tags                  = $("#tags"),
            openBoxCommentNum     = $("#openBoxCommentNum"),
            openBoxHot            = $("#openBoxHot"),
            openBoxColletNum      = $("#openBoxColletNum"),
            openBoxComment        = $("#openBoxComment"),
            openBoxCommentAddText = $("#openBoxCommentAddText"),
            openBoxCommentListul  = $("#openBoxCommentListul"),
            openBoxCommentButton  = $("#openBoxCommentButton");

        // Grid ID, and the box
        var gridid, box;

        // Render the open Box
        var openBoxRender = function ( data) {
            // Determine the box
            if ( $(box).attr('id') == "boxWrap") return false;

            // Clear Input
            openBoxCommentAddText.val("");
            openBoxCommentButton.text("写好了");
            openBoxCommentListul.html("");
            
            // Parse box data
            var originDATA = $.parseJSON(data) || null;

            try{
                var status = originDATA.status;
                var info   = originDATA.info;
                var DATA   = originDATA.data.grid;
                var boxType= DATA.type;
                var comment= originDATA.data.comment;
            } 
            catch(e) {
                // Todo

                //alert("网络错误，数据不可用");
            };

            // Data to template 
            var commentTemplate;
            var tagTemplate;
            var contentTemplate;

            // Clear Tags
            tags.html("");

            // User Information
            openBoxAuthorAvatar.attr("src", DATA.avatar);
            openBoxAuthorName.text( DATA.author );

            // Text Box content
            if ( boxType == 0 ) {
                openBoxTitle.text( DATA.title );
                openBoxImg.html("");
                openBoxContentContent.html( DATA.content )
            };

            // Images Box content
            if ( boxType == 1 ) {
                openBoxTitle.text( DATA.title );
                /* Debug *///openBoxImg.html( '<img src="' + DATA.thumb + '" />' );
                openBoxContentContent.html( DATA.content );
            };

            // 标签
            if ( DATA.tags != "" ) {
                for ( var i in DATA.tags ) {
                    tagTemplate = '<a href="' + DATA.tags[i].url + '">' + DATA.tags[i].name+ '</a>';
                    tags.append( tagTemplate );
                };
            };

            // Debug : 热度
            var hotNum = eval(DATA.num_comment + DATA.num_collect + DATA.num_like)
            openBoxHot.text( hotNum );
            openBoxCommentNum.text( DATA.num_comment );
            openBoxColletNum.text( DATA.num_collect );

            // 评论
            if ( comment != "" ) {
                for ( var i in comment ) {
                    commentTemplate = '<li><div class="openBoxAvatar"><a href="/home/home/index/id/' + comment[i].userid + '"><img src="' + comment[i].avatar + '" /></a></div><div class="openBoxCommentContent"><a class="author" href="/home/home/index/id/' + comment[i].userid + '">' + comment[i].author + '</a>&nbsp;:&nbsp;&nbsp;&nbsp;<span>' + comment[i].content + '</span><br /><a style="/* Todo */display:none;" class="reply" author="' + comment[i].author + '">回复</a></div></li>';
                    openBoxCommentListul.append( commentTemplate );
                };
            };
            
            // Current box offset
            var top   = $(box).offset().top,
                left  = $(box).offset().left,
                width = $(window).width(),
                contentHeight;

            // 使外容器高度自适应
            contentHeight = top + openBox.height() + 500 + 'px';

            content.css( { "min-height" : contentHeight } )

            // Scroll page to the box
            $("html, body").animate({ scrollTop : top - 40 }, 130);

            // Open box position
            if ( left < width/2 ) {
                openBox.show();
                openBox.offset({ top: top, left: left});
                
            } else {
                var sLeft = left+182-566;
                openBox.show();
                openBox.offset({ top: top, left: sLeft});
            };

            // Cancel click 
            openBoxCancel.click(function () {
                openBox.fadeOut("fast");
            });

        };

        // Instantiate Box
        var openBoxHandle = new Box("/grid/show/", openBoxRender);

        // Handle open Box
        boxWrap.delegate(".box", "click", function (e) {
            // Event Object target
            var tar = $( e.target);
                gridid = tar.attr("gridid");
                box = tar[0].parentNode;

            if ( gridid != undefined) openBoxHandle.req("?gridid=" + gridid);
        });

/**
+----------------------------------------------------------------
* Send comment action 
+----------------------------------------------------------------
*/
        // Add reply
        var addReply = function ( data ) {
            // Parse box data
            var originDATA = $.parseJSON( data ) || null;

            try{
                var status = originDATA.status;
                var info   = originDATA.info;
                var DATA   = originDATA.data;
                var comment= originDATA.data.comment;
            } 
            catch(e) {
                // Todo

                //alert("网络错误，数据不可用");
            };

            if ( status == 1) {
                // Todo 成功  插入当前评论到评论列表中
                var addData         = openBoxCommentAddText.val();
                var currentAvtLink  = $("#avtIMG").attr("src");
                var currentUserLink = $("#accMNAME").attr("src");
                var currentUserName = $("#accMNAME").text();

                // Add comment
                commentTemplate = '<li><div class="openBoxAvatar"><a href="' + currentUserLink + '"><img src="' + currentAvtLink + '" /></a></div><div class="openBoxCommentContent"><a class="author" href="' + currentUserLink + '">' + currentUserName + '</a>&nbsp;:&nbsp;&nbsp;&nbsp;<span>' + addData + '</span><br /><a style="/* Todo */display:none;" class="reply" author="' + currentUserName + '">回复</a></div></li>';
                openBoxCommentListul.append( commentTemplate );

                // Clear Comment Input 
                openBoxCommentAddText.val("");
                return false;
                
            } else {
                // Todo 评论失败，网络连接失败
                openBoxCommentButton.css({ "left" : "250px" }).text("可能由于网络原因，提交失败了，请重试！");
                setTimeout("$('#openBoxCommentButton').css( { 'left' : '460px' } ).text('重试')", 2000);
                return false;
            };
        };

        // Edit of add reply
        var editReply = function () {
            // Click reply Action
            openBoxCommentListul.delegate( ".reply", "click", function (event) {
                var author = $(event.target).attr("author");

                openBoxCommentAddText.text("@" + author + ":")
                openBoxCommentAddText.focus();
                openBoxCommentAddText.append(" ");
            });

            // Textarea button Action
            openBoxCommentAddText.click(function () {
                $(this).addClass( "openBoxCommentAddTextHas" );
                openBoxCommentButton.fadeIn("fast");
            });

            openBoxCommentAddText.blur(function () {
                if ( $(this).val() == "" ) {
                    $(this).removeClass( "openBoxCommentAddTextHas" );
                    openBoxCommentButton.hide();
                };
            });

        };
        editReply();

        // Instantiate Box
        var replyBox = new Box("/grid/comment/", addReply);
        
        // Handle : send the reply
        openBoxCommentButton.click(function () {
            var commentDATA = openBoxCommentAddText.val();
            if ( commentDATA != "" ) {
                var paraments = "?gridid=" + gridid + "&comment=" + commentDATA ;
                replyBox.req( paraments );
            } else {
                alert("没有填写内容哦，亲");
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
    var makeBoption = $("#makeBoption");
    var makeBul     = $("#makeBul");
    var makeBcancel = $("#makeB .cancel")
    var makeBarr    = $("#makeBarr");
    var addB        = $("#addB a");

    if ( boxTool[0]) {
        //Toggle the Box Tool
        boxTool.hover( function () {
            boxTool.stop().animate({
            bottom : 0 
            },130 );
        }, function () {
            boxTool.stop().animate({
            bottom : -60
            },130 );
        });

        // Customize block Submenu control
        makeB.click(function () {
            makeB.addClass("makeBDown");
            makeBul.fadeIn(200);
        });

        // Cancel Customize block dialog
        makeBcancel.click(function () {
            makeB.removeClass("makeBDown");
            makeBul.hide();
        });

        // Add a new box, controller menu
        addB.click(function () {
            makeBoption.fadeIn("fast");
            addB.addClass("addBDown");
        });
    };

});
