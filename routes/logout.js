///////////////////////////////////////////////////////////
// Logout route
//
// - Handles routing for logout URIs
//
var express = require("express");
var router = express.Router();
var logoutController = require("../controllers/logout");

/* GET logout page */
router.get("/", logoutController.getLogout);

module.exports = router;
