Alloy.Globals.MainController = $;

var osname = Ti.Platform.osname;    
Alloy.Globals.isIOS = function() {
    return osname === 'iphone' || osname === 'ipad';
};
Alloy.Globals.isAndroid = function() {
    return osname === 'android';
};

if(Alloy.Globals.isIOS()) {
	Alloy.Globals.codeUrl = 'http://localhost:8085/code';	
} else if(Alloy.Globals.isAndroid ) {
	Alloy.Globals.codeUrl = 'http://10.0.2.2:8085/code';
}

var welcome = Alloy.createController('welcome');

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

function createTextView() {
	var testView = Titanium.UI.createView({
		layout: "absolute",
		backgroundColor:"white",
	});
	var testCloseLabel = Ti.UI.createLabel({
		id: "test_close",
		text:"Click to close!",
	    accessibilityLabel:"test_close",
		accessibilityValue:"Click to close!",
		bottom: 0,
		height: 'auto',
		width: 'auto',
		visible: true,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		color: "#336699",
		font: {
			fontSize: 16
		}
	});
	testCloseLabel.addEventListener('click', function(e) {
		Alloy.Globals.MainController.switchToWelcomeView();
	});
	testView.add(testCloseLabel);
	return testView;
}

exports.switchToTestView = function(code) {
	clear();
	var testView = createTextView();
	eval('var runCode = ' + code + ';');
	runCode(testView);
	activeView = testView;
	$.index.add(testView );
};
switchToWelcomeView();
$.index.open();
