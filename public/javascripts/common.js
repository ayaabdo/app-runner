///////////////////////////////////////////////////////////
// Common Javascript Page Functions
//
// Provides some functions that can be used across
// all pages
//

//
// Function to redirect to the Game Information page
// for a particular game ID
//
function viewGameInfo(id) {
	window.location.href = `/gameinfo/${id}`;
}

//
// Function to redirect to the Trade Information page
// for a particular trade ID
//
function viewTradeInfo(id) {
	window.location.href = `/tradeinfo/${id}`;
}
