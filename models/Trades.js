///////////////////////////////////////////////////////////
// Trades model
//
// Handles trades data
//
const dataLayer = require("../datalayer/DataLayer");

//
// Get the list of received trades for this user
//
const getReceivedTrades = (username) => {
	return dataLayer.getTrades(username);
};

//
// Get information for a specific trade
//
const getTradeInfo = (username, id) => {
	return dataLayer.getTradeInfo(username, id);
}

module.exports = {
	getReceivedTrades,
	getTradeInfo,
}