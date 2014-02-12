//Old dog, new tricks
var myUrl = 'http://www.memrise.com/ajax/thing/cell/upload_file/';
var uploader = document.getElementById("multi-upload");
//------------------------------------------------------
function uploadFile(url, file, obj, token, cookies, cell_id) {

    var formData = new FormData();
    formData.append("thing_id",obj.id);
    formData.append("cell_id",parseInt(cell_id));
    formData.append("cell_type","column");
    formData.append("csrfmiddlewaretoken",token);
    formData.append("f",file);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Cookie",cookies);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
        else{
            console.log(xhr.status);
        }
    }
    xhr.send(formData);  // multipart/form-data
}
//--------------------------------------------------------

self.port.on("upload", function(obj){
    document.querySelector('button[id="upload-button"]').addEventListener('click', function(e) {
        
            for (let i = 0;i<uploader.files.length; ++i) {
                file = uploader.files.item(i);
                var name = file.name.split(["."],[1])[0].toLowerCase();
                console.log(name);
                var target_column = null;
                
                if( obj.hasOwnProperty(name) ) {
                    if(obj[name].hasFile){
                        //
                    }
                    else{
                        if(document.querySelector('th[class="column audio"]')){
                            target_column = document.querySelector('th[class="column audio"]').getAttribute("data-key");
                        }
                        else if(document.querySelector('td[class="cell audio column"]'){
                            target_column = document.querySelector('td[class="cell audio column"]').getAttribute("data-key");
                        }
                        else{
                            self.port.emit("No audio column");
                        }
                        console.log(target_column);
                        //uploadFile(myUrl, file, obj[name], document.cookie.slice(10,42), document.cookie, target_column);
                    }
                    
                }
            }
            self.port.emit("Uploaded");
    }, false);
});


