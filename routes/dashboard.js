///////////////////////////////////////////////////////////
// Dashboard route
//
// - Handles routing for dashboard URIs
//
var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboard");

/* GET Dashboard page */
router.get("/", dashboardController.getDashboard);

module.exports = router;
