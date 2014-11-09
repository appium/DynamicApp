function doClick(e) {
	// retrieving code
	//var url = $.url.value;
	var url = Ti.App.Properties.getString('codeUrl') || 
		'http://localhost:8085/code/abc'; // dev only
	var client = Ti.Network.createHTTPClient({
 		// function called when the response data is available
 		onload : function(e) {
    		Ti.API.warn("Received text: " + this.responseText);
			var code = JSON.parse(this.responseText).code;
			Alloy.Globals.MainController.switchToTestView(code);
 		},
 		// function called when an error occurs, including a timeout
 		onerror : function(e) {
    		Ti.API.debug(e.error);
     		alert('error');
 		},
 		timeout : 5000  // in milliseconds
 	});
 	// Prepare the connection.
 	client.open("GET", url);
	// Send the request.
	client.send();
}
