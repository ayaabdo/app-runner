///////////////////////////////////////////////////////////
// Session model
//
// Handles session data
//
function SessionInfo() {
	this.username = "";
	this.isAuthenticated = false;
};

//
// Get current session information
//
const getCurrentSession = (req) => {

	// Check the session
	let session = req.session;

	// Create session info object
	let sessionInfo = new SessionInfo();

	// Check user's authentication
	if (session.userid) {

		// User is authenticated
		sessionInfo.username = session.userid.toLowerCase();
		sessionInfo.isAuthenticated = true;

	} else {

		// User is NOT authenticated
		sessionInfo.username = "";
		sessionInfo.isAuthenticated = false;
		
	}

	return sessionInfo;
};

module.exports = {
	getCurrentSession,
}