Alloy.Globals.MainController = $;
var welcome = Alloy.createController('welcome');

exports.switchToTestView = function(code) {
	$.index.remove(welcome.getView());
	console.log(code);
	eval(code);
};
	// $.welcome.hide();

$.index.add(welcome.getView());
$.index.open();
