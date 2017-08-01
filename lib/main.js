'use strict';
var self = require('sdk/self');
var notifications = require('sdk/notifications');

exports.main = function() {
    var prefs = require('sdk/simple-prefs').prefs;

    require('sdk/page-mod').PageMod({
        include: [
        /.*memrise\.com\/course\/\d{1,}\/.*\/edit\/edit\/.*/
        ],
        contentScriptFile: [
            self.data.url('zepto/zepto.min.js'),
            self.data.url('page-mod/addInput.js'),
            self.data.url('page-mod/jsonTool.js'),
            self.data.url('page-mod/upload.js')
        ],
        contentScriptOptions: prefs,
        onAttach: function (worker) {
            // message from addInput
            worker.port.on('upload', function () {
                // user clicked upload button
                // search for file type
                worker.port.emit('filetype');
            });
            // messages from jsonTool
            worker.port.on('audio', function () {
                // the user selcted audio
                worker.port.emit('check', {
                    'tipo' : '.audio'
                });
            });
            worker.port.on('image', function () {
                // the user selected images
                worker.port.emit('check', {
                    'tipo' : '.image'
                });
            });
            worker.port.on('targetColumn', function (data) {
                // we have a valid targetColumn, populate the list of words
                // data is {'targetColumn': number}
                if(data.targetColumn) {
                    worker.port.emit('populate', data);
                } else {
                    notifications.notify({
                        title: 'Column not detected',
                        text: 'Please add the correct column to your database.',
                        iconURL: self.data.url('img/memrise-icon-32.ico')
                    });
                }
                
            });

            worker.port.on('list populated', function (data) {
                // we have a valid list of words, upload will begin shortly
                notifications.notify({
                        title: 'Please wait',
                        text: 'Upload begun, please wait; this' + 
                        ' could take some time',
                        iconURL: self.data.url('img/memrise-icon-32.ico')
                });
                worker.port.emit('list avaiable', data);
            });
            worker.port.on('list empty', function () {
                notifications.notify({
                        title: 'No words detected',
                        text: 'Please add words to your database',
                        iconURL: self.data.url('img/memrise-icon-32.ico')
                });
            });
            worker.port.on('Uploaded', function () {
                    notifications.notify({
                        title: 'Uploaded',
                        text: 'Matching files have been uploaded.',
                        iconURL: self.data.url('img/memrise-icon-32.ico')
                });
            });
            worker.port.on('help', function () {
                require('sdk/tabs').open(self.data.url('index.html'));
            });
        }
    });
};
