///////////////////////////////////////////////////////////
// Dashboard controller
//
// - Handles processing for dashboard routes
//
const { getCurrentSession } = require("../models/Session");
const gamesModel = require("../models/Games");
const tradesModel = require("../models/Trades");

//
// Render the dashboard page
//
const getDashboard = (req, res, next) => {

	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Check user's authentication
	if (sessionInfo.isAuthenticated) {

		// Set up page data
		let pageData = {};

		// Get the list of games that the user has posted
		gamesModel.getPostedGames(sessionInfo.username).then(postedGames => {

			// Store posted games list
			pageData["postedGames"] = postedGames;

			// Process received trades
			return tradesModel.getReceivedTrades(sessionInfo.username);

		}).then(receivedTrades => {

			// Store received trades list
			pageData["receivedTrades"] = receivedTrades;

			// Process sample of inventory
			return gamesModel.getSampleGames(4);

		}).then(sampleGames => {

			// Store sample games list
			pageData["sampleGames"] = sampleGames;

			// Render page
			res.render("template", { partial: "dashboard", sessionInfo, pageData });
			
		}).catch((err) => {

			// Error occured
			next(err);
	
		});

	} else {

		// User is NOT authenticated
		res.redirect("/login");
		
	}
};

module.exports = {
	getDashboard,
};
