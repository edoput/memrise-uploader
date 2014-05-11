'use strict';
function populate(tipo, callBack) {
    var thingList      = null;
    var myJson          = {};
    thingList = $('.thing').each(
        function () {
            let word = $(this).filter('.text').first().html();
            myJson[word] = {
                'word': word,
                'id': $(this).attr('data-thing-id'),
                'hasFile': !('disabled' in $(this).
                    filter(tipo).
                    filter('button').
                    attr('class')
                    )
                };
        });

    callBack(myJson);
}

function comunication (myWord) {
    if( Object.getOwnPropertyNames(myWord).length > 0){
        self.port.emit('list populated', myWord);
    }
    else{
        self.port.emit('list empty');
    }
}

self.port.on('filetype', function () {
    // get asked to return which filetype the user is uploading
    if( $('#choice').prop('checked') ) {
        console.log('audio');
        self.port.emit('audio');
    } else {
        self.port.emit('image');
        console.log('image');
    }
});

self.port.on('check', function (data) {
    // search for the correct column to upload
    if ($('td').filter(data.tipo)) {
        self.port.emit('targetColumn', {
            targetColumn : $('td').filter(data.tipo).attr('data-key')
        });
    } else {
        self.port.emit('No appropriate column', data);
    }

} );

self.port.on('populate', function (data) {
    populate(data.targetColumn, comunication);
});