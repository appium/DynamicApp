Alloy.Globals.MainController = $;
var welcome = Alloy.createController('welcome');
var test= Alloy.createController('test');

var activeView;

function clear() {
	if(activeView) {
		$.index.remove(activeView);
		activeView = null;
	}
}

var switchToWelcomeView = function() {
	clear();
	$.index.add(welcome.getView());
	activeView = welcome.getView();
};
exports.switchToWelcomeView = switchToWelcomeView;

exports.switchToTestView = function(code) {
	clear();
	var testView = test.getView();
	eval('var runCode = ' + code + ';');
	runCode(testView);
	activeView = testView ;
	$.index.add(testView );
};
switchToWelcomeView();
$.index.open();
