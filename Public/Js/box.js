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

            // Request to send
            URL = _this.uri + option;

            // XHR and handle
            $.ajax({
                type    : _this.XHRmethod,
                url     : URL,
                cache   : false,
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
            boxWrap.data("boxes")= $.parseJSON(data);
            console.dir(boxWrap.data("boxes"));
            
        };

        // Instantiate Box
        var updateBox = new Box("../box.php", renderBox);
        updateBox.req("?page=0");

    };
});
