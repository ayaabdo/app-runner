///////////////////////////////////////////////////////////
// Auth route
//
// - Handles routing for authentication URIs
//
var express = require("express");
var router = express.Router();
var authController = require("../controllers/auth");

/* POST authentication credentials */
router.post("/", authController.getAuth);

module.exports = router;
