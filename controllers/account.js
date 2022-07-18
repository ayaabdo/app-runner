///////////////////////////////////////////////////////////
// Account controller
//
// - Handles processing for account routes
//
const { getCurrentSession } = require("../models/Session");
const crypto = require("node:crypto");
const userModel = require("../models/User");
const sharp = require("sharp");

//
// Render the account page
//
const getAccount = (req, res, next) => {

	// Get the session info
	let sessionInfo = getCurrentSession(req);

	// Set up page data
	let pageData = {};
	pageData["message"] = "";

	// Render the page
	res.render("template", { partial: "account", sessionInfo, pageData });
};

//
// Create a new account
//
const createAccount = (req, res, next) => {

	// Get the new account details from the form
	let formData = req.body;
	let accountInfo = {
		username: formData.username,
		first_name: formData.first_name,
		last_name: formData.last_name,		
		email_address: formData.email_address,
		phone_number: formData.phone,
		address: formData.address,
		photo: "",
		password: formData.password,
		salt: "",
		rating: 5,
	};

	// Hash and store the password
	let salt = crypto.randomBytes(16).toString("base64");
	let hashedPassword = crypto.scryptSync(accountInfo.password, salt, 64);
	let hashedPasswordBase64 = Buffer.from(hashedPassword).toString("base64");
	accountInfo.salt = salt;
	accountInfo.password = hashedPasswordBase64;

	// Resize the uploaded image
	let resizePromise = null;
	if (req.file) {

		// Resize image
		resizePromise = sharp(req.file.buffer).resize(null, 150).toBuffer();
	}
	else {

		// Create dummy Promise if there was no image
		resizePromise = new Promise((resolve, reject) => { resolve(null) });
	}

	// Process the image resize Promise
	resizePromise.then(resizedImage => {

		// Set the image if resize operation was successful
		if (resizedImage) {
			accountInfo.photo = resizedImage;
		}
		else {

			// Otherwise null the photo field
			accountInfo.photo = null;
		}
		
		// Process user creation
		return userModel.createUser(accountInfo);

	}).then(result => {
		
		// Account was created successfully
		if (result.success) {

			// Go to the home page
			res.redirect("/");
		}
		else {

			// Account was not created

			// Username already exists
			if (result.error.code == 'ER_DUP_ENTRY') {

				// Set up page data
				let pageData = {};
				let sessionInfo = {};

				// Set error message
				pageData["message"] = "This username already exists! Please choose a different username.";

				// Render the page
				res.render("template", { partial: "account", sessionInfo, pageData });
			}
		}

	}).catch(err => {
		// Log error to console
		if (err.error) {
			console.log("** Error creating user: " + err.error.message);
		}
		else if (err.message) {
			console.log("** Error creating user: " + err.message);
		}
		res.redirect("/error");
	});
};

async function resizeImage(buffer) {
	return await sharp(buffer).resize(null, 200).toBuffer();
}

module.exports = {
	getAccount,
	createAccount,
};
