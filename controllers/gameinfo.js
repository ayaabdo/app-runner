///////////////////////////////////////////////////////////
// Game Information controller
//
// - Handles processing for game information routes
//
const { getCurrentSession } = require("../models/Session");
const gamesModel = require("../models/Games");

//
// Render the Game Information page
//
const getGameInfo = (req, res, next) => {

	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Set up page data
	let pageData = {};

	// Get game information object from database
	gamesModel.getGame(req.params.id).then(game => {

		// Populate game information
		pageData["game"] = game;

		// Process suggested games
		return gamesModel.getGamesWithGenre(game.genre, 6);

	}).then(suggestedGames => {

		// Populate suggested games
		pageData["suggestedGames"] = suggestedGames;

		// Render the page
		res.render("template", { partial: "gameinfo", sessionInfo, pageData });

	}).catch((err) => {

		// Error occured
		next(err);

	});
};

module.exports = {
	getGameInfo,
};
