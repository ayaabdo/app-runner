///////////////////////////////////////////////////////////
// User model
//
// Handles user data
//
const dataLayer = require("../datalayer/DataLayer");

//
// Create the user account
//
const createUser = (userInfo) => {
	return dataLayer.createUser(userInfo);
}

//
// Get the user's profile information
//
const getProfileInfo = (username) => {
	return dataLayer.getProfileInfo(username);
};

//
// Get the user details from the database
//
const getUser = (username) => {
	return dataLayer.getUser(username);
};

module.exports = {
	createUser,
	getProfileInfo,
	getUser,
}