///////////////////////////////////////////////////////////
// Account route
//
// - Handles routing for account URIs
//
var express = require("express");
var router = express.Router();
var accountController = require("../controllers/account");

/* GET Account page */
router.get("/", accountController.getAccount);

module.exports = router;
