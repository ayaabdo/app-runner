///////////////////////////////////////////////////////////
// Login route
//
// - Handles routing for login URIs
//
var express = require("express");
var router = express.Router();
var loginController = require("../controllers/login");

/* GET Login page */
router.get("/", loginController.getLogin);

module.exports = router;
