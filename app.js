var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

// Routers
var homeRouter = require("./routes/home");
var accountRouter = require("./routes/account");
var accountCreationRouter = require("./routes/createAccount");
var loginRouter = require("./routes/login");
var authRouter = require("./routes/auth");
var dashboardRouter = require("./routes/dashboard");
var gamesRouter = require("./routes/games");
var gameCreationRouter = require("./routes/createGame");
var profileRouter = require("./routes/profile");
var postgameRouter = require("./routes/postgame");
var gameinfoRouter = require("./routes/gameinfo");
var tradeinfoRouter = require("./routes/tradeinfo");
var logoutRouter = require("./routes/logout");

var app = express();

// Initialize session
app.use(session({
  resave: false,						// Don't save the session if unmodified
  saveUninitialized: false, 			// Don't create the session until something is stored
  secret: "&:^)}dyVCgee+?x", 			// Secret key we're using to sign the session cookie
  cookie: { maxAge: 1000 * 60 * 60 },	// The session cookie has a one hour expiry
}));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Set available routes
app.use("/", homeRouter);
app.use("/account", accountRouter);
app.use("/createAccount", accountCreationRouter);
app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/games", gamesRouter);
app.use("/createGame", gameCreationRouter);
app.use("/profile", profileRouter);
app.use("/postgame", postgameRouter);
app.use("/gameinfo", gameinfoRouter);
app.use("/tradeinfo", tradeinfoRouter);
app.use("/logout", logoutRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {

	// Set locals, only providing error in development
	console.log(err.message);
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// Render the error page
	res.status(err.status || 500);
	res.render("error", { error: err, requested_url: req.originalUrl });
});

module.exports = app;
