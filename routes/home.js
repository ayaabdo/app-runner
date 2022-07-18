///////////////////////////////////////////////////////////
// Home route
//
// - Handles routing for home page URIs
//
var express = require("express");
var router = express.Router();
var homeController = require("../controllers/home");

/* GET Home page */
router.get("/", homeController.getHome);

module.exports = router;
