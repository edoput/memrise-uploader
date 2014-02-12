function addText(node, text){
	node.appendChild(document.createTextNode(text));
}
function addRadio(node, obj){
	var radio 	= document.createElement("input");
	radio.id 	= obj.id;
	radio.type 	= "radio";
	radio.name 	= obj.name;
	radio.value = obj.value;
	radio.checked = obj.checked;
	node.appendChild(radio);
	addText(node, obj.text);
}
function customizeNode(node,obj){
	var attribute_list = ["id", "class", "type", "multiple"];
	for (var i = attribute_list.length - 1; i >= 0; i--) {
		if(obj.hasOwnProperty(attribute_list[i])){
			var attribute = attribute_list[i];
			node.setAttribute(attribute, obj[attribute]);
		}
	}
}
function appendChildren(node, array){
	for (var i = 0; i < array.length; i++) {
		node.appendChild(array[i]);
	}
}

var newForm     = null;
var input       = null;
var button      = null;
var content     = null;

customizeNode(newForm	,{"id":"uploader"		, "class":"full-width center"});
customizeNode(input		,{"id":"multi-upload"	, "class":"center", "type":"file", "multiple":"multiple"});
customizeNode(button 	,{"id":"upload-button"	, "type":"button"});

button.innerHTML = "Upload!"

addRadio(newForm, {"id":"radio_choice", "name":"choice", "value":"audio","checked":"checked","text":"Upload audio"});
addRadio(newForm, {"id":"radio_choice", "name":"choice", "value":"image","checked":""		,"text":"Upload image"});

appendChildren(newForm,[input, button]);

content.parentElement.insertBefore(newForm, document.getElementById("footer"));