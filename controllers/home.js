///////////////////////////////////////////////////////////
// Home controller
//
// - Handles processing for home routes
//
const { getCurrentSession } = require("../models/Session");

//
// Render the Home page
//
const getHome = (req, res, next) => {

	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Render the page
	res.render("template", { partial: "home", sessionInfo });
};

module.exports = {
	getHome,
};
