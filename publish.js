'use strict';
var http = require('http');
http.post = require('http-post');
console.log('prova');
var files = {
    param: 'file',
    path: './tmp/dist-stable/memrise-uploader.xpi'
};
http.post('http://localhost:8888', [], files, function () {
	//...
});