///////////////////////////////////////////////////////////
// Games route
//
// - Handles routing for games/inventory URIs
//
var express = require("express");
var router = express.Router();
var gamesController = require("../controllers/games");


/* GET Games page */
router.get("/", gamesController.getGames);

module.exports = router;
