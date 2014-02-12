function populate (){
    var thing_list      = null;
    var myJson          = {};
    var target_column   = null;

    if(document.querySelector('th[class="column audio"]')){
        target_column = document.querySelector('th[class="column audio"]').getAttribute("data-key");
        }
    else if(document.querySelector('td[class="cell audio column"]'){
            target_column = document.querySelector('td[class="cell audio column"]').getAttribute("data-key");
        }
    else{
            self.port.emit("No audio column");
        }

    thing_list = document.getElementsByClassName("thing");

    for(var i = 0, l = thing_list.length; i < l; ++i) {
        let word    = thing_list[i].children[1].firstChild.children[1].innerHTML.toLowerCase();
        let id      = thing_list[i].getAttribute("data-thing-id");
        let file    = null;
        if( thing_list[i].children[++parseInt(target_column)].firstChild.children[2].className.contains('disabled')){
            file = false;
            }
        else{
            file = true;
            }
        myJson[word] = {"word":word,"id":id,"hasFile": audio};
        }
    return myJson;
}
self.port.on("changed filetype", function(obj){
    var myWord = populate();
    if( Object.getOwnPropertyNames(myWord).length > 0){
        self.port.emit("list populated", myWord);
    }
    else{
        self.port.emit("list empty");
    }
});


