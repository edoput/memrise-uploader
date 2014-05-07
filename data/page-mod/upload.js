'use strict';
//Old dog, new tricks
var myUrl = 'http://www.memrise.com/ajax/thing/cell/upload_file/';
var uploader = $('multi-upload:first');
//------------------------------------------------------
function uploadFile(url, file, obj, targetColumn, token, cookie) {

    var formData = new FormData();
    formData.append(
        'thing_id',
        obj.id
    );
    formData.append(
        'cell_id',
        targetColumn
    );
    formData.append(
        'cell_type',
        'column'
    );
    formData.append(
        'csrfmiddlewaretoken',
        token
    );
    formData.append(
        'f',
        file
    );
    var xhr = new XMLHttpRequest();
    xhr.open(
        'POST',
        url,
        true
    );
    xhr.setRequestHeader(
        'Cookie',
        cookie
    );
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.log(xhr.status);
        }
    };
    xhr.send(formData);  // multipart/form-data
}
//--------------------------------------------------------

self.port.on('upload', function(obj){
        $('#upload-button').on( 'click', function (e) {
            e.preventDefault();
            let filesToUpload = uploader.files;
            let numFiles = filesToUpload.length;
            for (let i = 0; i < numFiles; ++i) {
                let file = filesToUpload.item(i);
                let name = file.name.split(['.'],[1])[0].toLowerCase();
                
                if( obj.hasOwnProperty(name) && !obj[name].hasFile ) {
                    uploadFile(
                        myUrl,
                        file,
                        obj[name],
                        obj.targetColumn,
                        document.cookie.slice(10,42),
                        document.cookie
                    );                    
                }
            }
            self.port.emit('Uploaded');
    },
    false);
});
