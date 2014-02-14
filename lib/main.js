
var self = require("sdk/self");
var notifications = require("sdk/notifications");

exports.main = function() {
    require("sdk/page-mod").PageMod({
        include: [/.*memrise\.com\/course\/\d{1,}\/.*\/edit\/database\/.*/],
        contentScriptFile: [ self.data.url("page-mod/add_input.js"), self.data.url("page-mod/type_of_file.js"), self.data.url("page-mod/json_tool.js"), self.data.url("page-mod/upload.js")],
        contentScriptWhen: 'end',
        onAttach: function(worker) {
            worker.port.on("filetype", function(obj){
                worker.port.emit("changed filetype", obj);
            });
            worker.port.on("list populated", function(obj){
                worker.port.emit("upload", obj);
            });
            worker.port.on("list empty", function(){
                notifications.notify({
                        title: "No words detected",
                        text: "Please add words to your database",
                        iconURL: self.data.url("img/memrise-icon-32.ico")
                });
            });
                
            worker.port.on("Uploaded", function(){
                    notifications.notify({
                        title: "Uploaded",
                        text: "Matching words hve been uploaded.",
                        iconURL: self.data.url("img/memrise-icon-32.ico")
                });
            });
            worker.port.on("No audio column", function(){
                var notifications = require("sdk/notifications");
                    notifications.notify({
                        title: "No audio column detected",
                        text: "Please add an audio column to your database.",
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
    
    