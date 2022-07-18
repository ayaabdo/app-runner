///////////////////////////////////////////////////////////
// Auth controller
//
// - Handles processing for auth routes
//
const { getCurrentSession } = require("../models/Session");
const { getUser } = require("../models/User");
const crypto = require("node:crypto");

//
// Process the authentication request
//
const getAuth = (req, res, next) => {
	
	// Get the login form data
	let formData = req.body;

	// Extract the username
	let username = formData.username;
	username = username.toLowerCase();

	// Retrieve the user's stored password
	getUser(username).then(user => {

		// Check whether user exists
		if (user) {

			// Hash the password with the user's salt
			let password = formData.password;
			let hashedPassword = crypto.scryptSync(password, user.salt, 64);
			let hashedPasswordBase64 = Buffer.from(hashedPassword).toString("base64");

			// Check hashed password against user's stored hash
			if (hashedPasswordBase64 == user.password) {
	
				// Good username and password

				// Set user's authenticated session
				let session = req.session;
				session.userid = username;
	
				// Go to the dashboard
				res.redirect("/dashboard");
			}
		}

		// Bad username or password
		
		// Get the session info
		let sessionInfo = getCurrentSession(req);

		// Set error
		let pageData = { message: "Sorry, the username or password was not recognized" };

		// Bad username or password... go to login page
		res.render("template", { partial: "login", sessionInfo, pageData });
			
	}).catch((err) => {

		// Error occured
		next(err);

	});

};

module.exports = {
	getAuth,
};
