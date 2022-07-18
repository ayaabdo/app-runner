///////////////////////////////////////////////////////////
// Create Account route
//
// - Handles routing for account creation URIs
//
var express = require("express");
var router = express.Router();
var accountController = require("../controllers/account");
var multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });

/* POST new account details */
router.post("/", upload.single("photo"), accountController.createAccount);

module.exports = router;
