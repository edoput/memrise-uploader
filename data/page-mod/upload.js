'use strict';
//Old dog, new tricks
var myUrl = 'http://www.memrise.com/ajax/thing/cell/upload_file/';
var targetColumn = null;
//------------------------------------------------------
function uploadFile(url, file, obj, targetColumn) {

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
        document.cookie.match(/\bcsrftoken=(.{1,32})/)[1]
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
        document.cookie
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

self.port.on('list avaiable', function (data) {
    var uploader = document.getElementById('multi-upload');
    var filesToUpload = uploader.files;
    var numFiles = filesToUpload.length;
    for (let i = 0; i < numFiles; ++i) {
        // we need a reference to the file currently uploading
        let file = filesToUpload.item(i);
        var name = file.name.split(['.'], [1])[0].toLowerCase();
        console.log(name);
        console.log(JSON.stringify(data));
        if( data.hasOwnProperty(name) && !data[name].hasFile ) {            
            uploadFile(
                myUrl,
                file,
                data[name],
                targetColumn
            );
        }
    }
    self.port.emit('Uploaded', data);
});
self.port.on('populate', function (data) {
    targetColumn = data.targetColumn;
});