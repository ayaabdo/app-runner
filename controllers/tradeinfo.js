///////////////////////////////////////////////////////////
// Trade Information controller
//
// - Handles processing for trade information routes
//
const { getCurrentSession } = require("../models/Session");
const tradesModel = require("../models/Trades");

//
// Render the Trade Information page
//
const getTradeInfo = (req, res, next) => {

	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Get trade information object from database
	let tradeId = req.params.id;
	tradesModel.getTradeInfo(sessionInfo.username, tradeId).then(trade => {

		// Set up page data
		let pageData = {};
		pageData["trade"] = trade;

		// Render the page
		res.render("template", { partial: "tradeinfo", sessionInfo, pageData });

	}).catch((err) => {

		// Error occured
		next(err);

	});
};

module.exports = {
	getTradeInfo,
};
