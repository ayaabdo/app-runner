///////////////////////////////////////////////////////////
// PostGame controller
//
// - Handles processing for postgame routes
//
const { getCurrentSession } = require("../models/Session");

//
// Render the Post Game page
//
const getPostGame = (req, res, next) => {

	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Check user's authentication
	if (sessionInfo.isAuthenticated) {

		// User is authenticated
		res.render("template", { partial: "postgame", sessionInfo });

	} else {

		// User is NOT authenticated
		res.redirect("/login");
		
	}
};

module.exports = {
	getPostGame,
};
