///////////////////////////////////////////////////////////
// Logout controller
//
// - Handles processing for logout routes
//
const { getCurrentSession } = require("../models/Session");

//
// Process the logout request
//
const getLogout = (req, res, next) => {
  
	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Check user's authentication
	if (sessionInfo.isAuthenticated) {

		// User is authenticated, we invalidate their session
		req.session.destroy();
	}

	// Go to the logout page
	res.redirect("/");
};

module.exports = {
	getLogout,
};
