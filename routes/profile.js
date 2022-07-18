///////////////////////////////////////////////////////////
// User Profile route
//
// - Handles routing for user profile URIs
//
var express = require("express");
var router = express.Router();
var profileController = require("../controllers/profile");

/* GET Profile page */
router.get("/", profileController.getProfile);

module.exports = router;
