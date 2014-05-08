'use strict';
var self = require('sdk/self');
var notifications = require('sdk/notifications');

exports.main = function() {
    require('sdk/page-mod').PageMod({
        include: [
        /.*memrise\.com\/course\/\d{1,}\/.*\/edit\/database\/.*/
        ],
        contentScript: 'window.alert("pages matches ruleset")',
        contentScriptFile: [
            self.data.url('zepto.min.js'),
            self.data.url('page-mod/addInput.js'),
            self.data.url('page-mod/jsonTool.js'),
            self.data.url('page-mod/upload.js')
        ],
        onAttach: function(worker) {
            worker.port.on('upload', function () {
                worker.port.emit('filetype');
            });
            worker.port.on('audio', function () {
                worker.port.emit('upload', {
                    'tipo' : '.audio'
                });
            });
            worker.port.on('image', function () {
                worker.port.emit('upload', {
                    'tipo' : '.image'
                });
            });

            worker.port.on('list populated', function(obj){
                worker.port.emit('list_avaiable', obj);
            });
            worker.port.on('list empty', function(){
                notifications.notify({
                        title: 'No words detected',
                        text: 'Please add words to your database',
                        iconURL: self.data.url('img/memrise-icon-32.ico')
                });
            });
                
            worker.port.on('Uploaded', function(){
                    notifications.notify({
                        title: 'Uploaded',
                        text: 'Matching files have been uploaded.',
                        iconURL: self.data.url('img/memrise-icon-32.ico')
                });
            });
            worker.port.on('No appropriate column', function(){
                var notifications = require('sdk/notifications');
                    notifications.notify({
                        title: 'No audio column detected',
                        text: 'Please add the correct column to your database.',
                        iconURL: self.data.url('img/memrise-icon-32.ico')
                });
            });
        }
    });
    /*require('sdk/widget').Widget({
        id : 'memrise-uploader',
        label : 'Memrise Uploader',
        contentURL: self.data.url('img/memrise-icon-32.ico'),
        onClick: function() {
            require('sdk/tabs').open(self.data.url('index.html'));
        }
    });*/
};