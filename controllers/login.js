///////////////////////////////////////////////////////////
// Login controller
//
// - Handles processing for login routes
//
const { getCurrentSession } = require("../models/Session");

//
// Render the Login page
//
const getLogin = (req, res, next) => {

	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Set page data
	let pageData = {};

	// Set initial message
	let message = "";

	// Render the page
	res.render("template", { partial: "login", sessionInfo, message: message, pageData });
};

module.exports = {
	getLogin,
};
