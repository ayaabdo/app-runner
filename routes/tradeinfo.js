///////////////////////////////////////////////////////////
// Trade Information route
//
// - Handles routing for trade information URIs
//
var express = require("express");
var router = express.Router();
var tradeinfoController = require("../controllers/tradeinfo");

/* GET Trade Information page */
router.get("/:id", tradeinfoController.getTradeInfo);

module.exports = router;
