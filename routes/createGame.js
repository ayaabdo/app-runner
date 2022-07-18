///////////////////////////////////////////////////////////
// Create Game route
//
// - Handles routing for game creation URIs
//
var express = require("express");
var router = express.Router();
var gamesController = require("../controllers/games");
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });

/* POST new game */
router.post("/", upload.single("photo"), gamesController.createGame);

module.exports = router;
