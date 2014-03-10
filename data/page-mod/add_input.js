var newForm     = $('<form></form>', {
	id:'uploader',
	class: 'full-width center'
});
$('<p></p>').html('Upload audio').appendTo(newForm);
$('<input>', {
	id:'radio_choice',
	name: 'choice',
	type: 'radio',
	value: 'audio',
	checked: 'checked'
}).appendTo(newForm);
$('<p></p>').html('Upload image').appendTo(newForm);
$('<input>', {
	id:'radio_choice',
	name: 'choice',
	type: 'radio',
	value: 'photo'
}).appendTo(newForm);
$('<input>', {
	id:'multi-upload',
	class: 'center',
	type: 'file',
	multiple: 'multiple'
}).appendTo(newForm);
$('<button></button>', {
	id:'upload-button',
	type: 'button',
	text: 'Click to upload!'
}).on('click', function(event) {
	console.log('Click!');
}).appendTo(newForm);

$('#content').append(newForm);