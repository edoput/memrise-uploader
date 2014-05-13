var newForm = $('<form></form>', {
	id: 'uploader',
	class: 'full-width center container container-main'
});

var table = $('<table></table>', {
	class: 'table'
});
var line1 = $('<tr></tr>', {});
var line2 = line1.clone();
$('<td></td>', {
	class: 'cell column',
	'data-cell-type': 'column'
}).html('Upload audio').appendTo(line1);
$('<td></td>', {
	class: 'cell column',
	'data-cell-type': 'column'
}).append($('<input>', {
	id: 'choice',
	name: 'choice',
	type: 'radio',
	value: 'audio',
	checked: 'checked'
})).appendTo(line1);
$('<td></td>', {
	class: 'cell column',
	'data-cell-type': 'column'
}).html('Upload image').appendTo(line2);
$('<td></td>', {
	class: 'cell column',
	'data-cell-type': 'column'
}).append($('<input>', {
	id: 'choice',
	name: 'choice',
	type: 'radio',
	value: 'image'
})).appendTo(line2);

line1.appendTo(table);
line2.appendTo(table);
table.appendTo(newForm);
$('<br>').appendTo(newForm);

$('<input>', {
	id: 'multi-upload',
	class: 'center',
	type: 'file',
	multiple: 'multiple'
}).appendTo(newForm);
$('<button></button>', {
	id: 'upload-button',
	type: 'button',
	text: 'Upload!'
}).on('click', function (e) {
	'use strict';
	e.preventDefault();
	self.port.emit('upload');
}).appendTo(newForm);
$('<br><a href="">Help</a>').appendTo(newForm).on('click', function (e) {
	'use strict';
	e.preventDefault();
	self.port.emit('help');
});


$('#content').append(newForm);