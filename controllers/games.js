///////////////////////////////////////////////////////////
// Games controller
//
// - Handles processing for games/inventory routes
//
const { getCurrentSession } = require("../models/Session");
const gamesModel = require("../models/Games");
const sharp = require("sharp");

//
// Create new game record
//
const createGame = (req, res, next) => {

	// Get current user session info
	let sessionInfo = getCurrentSession(req);

	// Get the new account details from the form
	let formData = req.body;
	let gameInfo = {
		posted_by_username: sessionInfo.username,
		name: formData.name,
		genre: formData.genre,
		num_players: formData.players,
		condition: formData.condition,
		description: formData.description,
		photo: formData.photo,
		available: true,
	};

	// Resize the uploaded image
	let resizePromise = null;
	if (req.file) {

		// Resize image
		resizePromise = sharp(req.file.buffer).resize(null, 200).toBuffer();
	}
	else {

		// Create dummy Promise if there was no image
		resizePromise = new Promise((resolve, reject) => { resolve(null) });
	}

	// Process the image resize Promise
	resizePromise.then(resizedImage => {

		// Set the image if resize operation was successful
		if (resizedImage) {
			gameInfo.photo = resizedImage;
		}
		else {

			// Otherwise null the photo field
			gameInfo.photo = null;
		}
		
		// Process user creation
		return gamesModel.createGame(gameInfo);

	}).then(result => {

		// Game was created successfully
		if (result.success) {

			// Go to the home page
			res.redirect("/dashboard");
		}

	});
};

//
// Render the Games page
//
const getGames = (req, res, next) => {

	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Get the list of games
	gamesModel.getGames().then(games => {

		// Pass list to page
		let pageData = {};
		pageData["games"] = games;

		// Render the page
		res.render("template", { partial: "games", sessionInfo, pageData });

	}).catch((err) => {

		// Error occured
		next(err);

	});

};

module.exports = {
	createGame,
	getGames,
};
