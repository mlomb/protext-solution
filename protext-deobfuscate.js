// This is meant to be executed on http://protext.hackerrank.com

var gibberish = document.getElementById('gibberish').innerText;

// Simple function to decode the html entities (from SO https://goo.gl/PYo6Jt)
function parseHtmlEntities(str) { return str.replace(/&#([0-9]{1,3});/gi, function(match, numStr) { var num = parseInt(numStr, 10); return String.fromCharCode(num); }); }
// Simple function to swap key with value and decode the html entities
function swap(json){
	var res = {};
	for(var key in json)
		res[parseHtmlEntities(json[key])] = parseHtmlEntities(key);
	return res;
}

var seed = document.styleSheets[0].cssRules[1].style.src.substr(23, 32);
var xhr = new XMLHttpRequest();
xhr.open('GET', 'static/gen/font_' + seed + '._map_', true);
xhr.responseType = 'json';
xhr.onload = function() {
	var map = swap(xhr.response);
	
	var deobfuscated_text = "";
	for(c of gibberish)
		deobfuscated_text += map[c];
	console.log("The obfuscated text says: " + deobfuscated_text);
};
xhr.send();
