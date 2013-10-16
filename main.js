
var self        = require("sdk/self");
var addontab    = require("sdk/addon-page");

exports.main = function() {
    require("sdk/page-mod").PageMod({
        include: "http://www.memrise.com/course/*",
        contentScriptFile: [self.data.url("page-mod/json_tool.js"), self.data.url("page-mod/add_input.js"), self.data.url("page-mod/upload.js")],
        contentScriptWhen: 'end',
        onAttach: function(worker) {
            worker.port.on("populated", function(obj){
                    worker.port.emit("upload", obj);
                });
                
            worker.port.on("Uploaded", function(){
                var notifications = require("sdk/notifications");
                    notifications.notify({
                        title: "Uploaded",
                        text: "Matching words hve been uploaded.",
                        iconURL: self.data.url("img/memrise-icon-32.ico")
                });
            });
        }
    });
    require("sdk/widget").Widget({
        id : "memrise-uploader",
        label : "Memrise Uploader",
        contentURL: self.data.url("img/memrise-icon-32.ico"),
        onClick: function() {
            require("sdk/tabs").open(self.data.url("index.html"));
        }
    });
}
    
    
