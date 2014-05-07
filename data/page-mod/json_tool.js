function populate (tipo, callBack) {
    var thing_list      = null;
    var myJson          = {};
    var target_column   = null;
    if ( $('td').filter(tipo) ) {
        target_column = $('td').filter(tipo).attr('data-key');
    } else {
        self.port.emit("No appropriate column");
    }
    thing_list = $('.thing').each(
        function (index, item) {
            word = $(this).filter('.text:first').html();
            myJson[word] = {
                'word': word,
                'id': $(this).attr('data-thing-id'),
                'hasFile': !('disabled' in $(this).filter(tipo).filter('button').attr('class') )
                }
            };
    });

    callBack(myJson);
}

function comunication (myWord) {
    if( Object.getOwnPropertyNames(myWord).length > 0){
        self.port.emit("list populated", myWord);
    }
    else{
        self.port.emit("list empty");
    }
}
self.port.on('list_avaiable', function (obj) {
    populate(obj.tipo, comunication);
});

self.port.on('filetype', function () {
    if( $('#choice').prop('checked') ) {
        self.port.emit('audio');
    } else {
        self.port.emit('image');
    }
});