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
            // Box data
            var data = $.parseJSON(data);

            // Render the box
            boxWrap.masonry({
                itemSelector : '.box',
                isAnimated   : true
            });

            for ( var i in data) {
                // Template of Image Box
                if ( data[i].type = 1) {
                    var templateImage = '<div class="box"><img gridid="' + data[i].gridid + '" src="' + data[i].thumb + '" /><span class="title">' + data[i].title + '</span><a href="' + data[i].homepage + '" class="author">' + data[i].author + '</a><span class="time">' + data[i].time_edit + '</span><span class="like"></span><span class="num_like">' + data[i].num_like + '</span></div>';
                        templateImage = $(templateImage);
                    boxWrap.append( templateImage ).masonry('appended', templateImage);
                };
                $(window).resize();
            };

        };

        // Instantiate Box
        var page = 0;
        var updateBox = new Box("../box.php", renderBox);
        updateBox.req("?page=0");

        // Scroll control 
        $(window).scroll(function () {
            $(window).resize();
            if ( $(document).height() == $(window).scrollTop() + $(window).height()) {
                page += 1;
                updateBox.req("?page=" + page);
            };
        });
/**
+----------------------------------------------------------------
* Open box action
+----------------------------------------------------------------
*/
        // Open box template
        var openBox       = $("#openBox"),
            openBoxCancel = $("#openBoxCancel");

        // Grid ID, and the box
        var gridid, box;

        // Render the open Box
        var openBoxRender = function ( data) {
            // One box data
            var data = $.parseJSON(data) || null;

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

            // Debug & Test
            openBoxRender();

            if ( gridid != undefined) openBoxHandle.req("?gridid=" + gridid);
        });

    };
});
