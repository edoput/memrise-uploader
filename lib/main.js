'use strict';
var self = require('sdk/self');
var notifications = require('sdk/notifications');

exports.main = function() {
    require('sdk/page-mod').PageMod({
        include: [
        /.*memrise\.com\/course\/\d{1,}\/.*\/edit\/database\/.*/
        ],
        contentScriptFile: [
            self.data.url('zepto/zepto.min.js'),
            self.data.url('page-mod/addInput.js'),
            self.data.url('page-mod/jsonTool.js'),
            self.data.url('page-mod/upload.js')
        ],
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


            worker.port.on('list populated', function (obj) {
                worker.port.emit('list_avaiable', obj);
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
            worker.port.on('No appropriate column', function (data) {
                var notifications = require('sdk/notifications');
                    notifications.notify({
                        title: ['No', data.tipo ,'column detected'].join(' '),
                        text: 'Please add the correct column to your database.',
                        iconURL: self.data.url('img/memrise-icon-32.ico')
                });
            });
            worker.port.on('help', function () {
                require('sdk/tabs').open(self.data.url('index.html'));
            });
        }
    });
};