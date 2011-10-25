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
    var boxWrap = $("#boxWrap");
    if ( boxWrap[0]) {
        // Initial Render Page
        var renderBox = function (data) {
            //Determine the box 
            //if ( box.id == 'boxWrap') return false;

            // Parse box data
            var originDATA = $.parseJSON(data) || null;

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

            // Render the box
            boxWrap.masonry({
                itemSelector : '.box',
                isAnimated   : true
            });

            for ( var i in DATA) {
                // Template of Text Box
                if ( DATA[i].type == 0 ) {
                    var templateText = '<div class="box"><span gridid="' + DATA[i].gridid + ' class="title" >' + DATA[i].title + '</span></span><div class="description">' + DATA[i].description + '</div><a href="' + DATA[i].homepage + '" class="author">' + DATA[i].author + '</a><span class="time">' + DATA[i].time_edit + '</span><span class="like"></span><span class="num_like">' + DATA[i].num_like + '</span></div>';
                        templateText = $(templateText);
                        boxWrap.append( templateText ).masonry('appended', templateText);
                };

                // Template of Image Box
                if ( DATA[i].type == 1 ) {
                    var templateImage = 'div class="box"><img gridid="' + DATA[i].gridid + '" src="' + DATA[i].thumb + '" /><span class="title">' + DATA[i].title + '</span><a href="' + DATA[i].homepage + '" class="author">' + DATA[i].author + '</a><span class="time">' + DATA[i].time_edit + '</span><span class="like"></span><span class="num_like">' + DATA[i].num_like + '</span></div>';
                        templateImage = $(templateImage);
                        boxWrap.append( templateImage ).masonry('appended', templateImage);
                };
                $(window).resize();
            };
        };

        // Instantiate Box
        var page = 1;
        var updateBox = new Box("/grid/showList/", renderBox);
        updateBox.req("/page/1/size/30");

        // Scroll control 
        $(window).scroll(function () {
            $(window).resize();
            if ( $(document).height() == $(window).scrollTop() + $(window).height()) {
                page += 1;
                updateBox.req("/page/" + page + "/size/18");
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
            openBoxContent        = $("#openBoxContentContent"),
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

            // User Information
            openBoxAuthorAvatar.attr("src", DATA.avatar);
            openBoxAuthorName.text( DATA.author );

            // Box content
            if ( boxType == 1 ) {
                openBoxTitle.text( DATA.title );
                contentTemplate = '<div class="openBoxImg" ><img src="' + DATA.thumb + '" /></div>' + DATA.content;
                openBoxContent.html( contentTemplate )
            };

            // Todo : 标签
            /*
            tags.append( DATA.tags )
            for ( var i in DATA.tag ) {
                tagTemplate = '<a href="' + DATA.tag[i].url + '">#' + DATA.tag[i].name+ '</a>';
            };
            */

            // Debug : 热度
            var hotNum = eval(DATA.num_comment + DATA.num_collect + DATA.num_like)
            openBoxHot.text( hotNum );
            openBoxCommentNum.text( DATA.num_comment );
            openBoxColletNum.text( DATA.num_collect );

            // Todo : 评论
            for ( var i in comment) {
                commentTemplate = '<li><div></div class="openBoxAvatar"><a href="/home/home/index/id/' + comment[i].userid + '"><img src="' + comment[i].thumb + '" /></a><div class="openBoxCommentContent"><a class="author" href="/home/home/index/id/' + comment[i].userid + '/">' + comment[i].author + '</a><span>' + comment[i].content + '</span><a class="reply" author="' + comment[i].author + '" href="#">回复</a></div></li>';
                openBoxCommentListul.append( commentTemplate );
            };
            
            // Current box offset
            var top   = $(box).offset().top,
                left  = $(box).offset().left,
                width = $(window).width();

            // Scroll page to the box
            $("html, body").animate({ scrollTop : top - 40 }, 650);

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
                var addData = openBoxCommentAddText.text();
                // Todo 获得当前用户的头像，昵称，个人主页地址
                // Todo 插入评论

                // 清空输入框
                openBoxCommentAddText.text("");
                
            } else {
                // Todo 评论失败，网络连接失败
                openBoxCommentButton.val("可能由于网络原因，提交失败了，请重试");
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
            openBoxCommentAddText.focus(function () {
                openBoxCommentButton.fadeIn("fast");
            });

        };
        editReply();

        // Instantiate Box
        var replyBox = new Box("/grid/comment/", addReply);
        
        // Handle : send the reply
        openBoxCommentButton.click(function () {
        alert(openBoxCommentAddText.val())
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
