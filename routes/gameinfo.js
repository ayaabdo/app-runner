///////////////////////////////////////////////////////////
// Game Information route
//
// - Handles routing for game information URIs
//
var express = require("express");
var router = express.Router();
var gameinfoController = require("../controllers/gameinfo");

/* GET Game Information page */
router.get("/:id", gameinfoController.getGameInfo);

module.exports = router;
