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
        // Initial Render
        var renderBox = function (data) {
            // Box data
            var data = $.parseJSON(data);

            // Box information
            var type = 0,
                title = "无题",
                author = "TA",
                thumb = "../Images/tempBlock.png",
                description = "",
                time_edit = "未知时间",
                num_like = 0;

            // Render the box
            boxWrap.masonry({
                itemSelector : '.box',
                isAnimated   : true
            });

            for ( var i in data) {
                // Template of Image Box
                if ( data[i].type = 1) {
                    var templateImage = '<div class="box" gridid="' + data[i].gridid + '"><img src="' + data[i].thumb + '" /><span class="title">' + data[i].title + '</span><a href="' + data[i].homepage + '" class="author">' + data[i].author + '</a><span class="time">' + data[i].time_edit + '</span><span class="like"></span><span class="num_like">' + data[i].num_like + '</span></div>';
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
            if ( $(document).height() == $(window).scrollTop() + $(window).height()) {
                page += 1;
                updateBox.req("?page=" + page);
            };
        });

    };
});
