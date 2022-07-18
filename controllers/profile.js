///////////////////////////////////////////////////////////
// Profile controller
//
// - Handles processing for profile routes
//
const { getCurrentSession } = require("../models/Session");
const userModel = require("../models/User");

//
// Render the Profile page
//
const getProfile = (req, res, next) => {

	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Check user's authentication
	if (sessionInfo.isAuthenticated) {

		// Get the user's profile information
		userModel.getProfileInfo(sessionInfo.username).then(profile => {

			// Set up page data
			let pageData = {};
			pageData["profile"] = profile;

			// Render the page
			res.render("template", { partial: "profile", sessionInfo, pageData });
			
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
	getProfile,
};
