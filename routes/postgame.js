///////////////////////////////////////////////////////////
// Post a Game route
//
// - Handles routing for game posting URIs
//
var express = require("express");
var router = express.Router();
var postgameController = require("../controllers/postgame");

/* GET Post a Game page */
router.get("/", postgameController.getPostGame);

module.exports = router;
