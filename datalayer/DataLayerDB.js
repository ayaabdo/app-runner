///////////////////////////////////////////////////////////
//
// Data Layer (DB)
//
// Proxy data access layer that retrieves data
// from the atual database
//
const mysql = require("mysql");

//
// Create connection pool
//
const connectionPool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "allaboard",
	connectionLimit: 10
});

//
// Create new game record
//
const createGame = (gameInfo) => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"insert into games (posted_by_id, name, genre, num_players, cond, description, photo, available) \
		select u.user_id, ?, ?, ?, ?, ?, ?, ? \
		from users u \
		where u.username = ?";
	let queryParameters = [
		gameInfo.name,
		gameInfo.genre,
		gameInfo.num_players,
		gameInfo.condition,
		gameInfo.description,
		gameInfo.photo,
		gameInfo.available,
		gameInfo.posted_by_username
	];
	connectionPool.query(queryString, queryParameters, (error, results) => {

		// Query returned valid results
		if (results && results.affectedRows) {
			resolve({ success: true });
		}
		else {
			// An error occured
			console.log("** DB error creating game: " + error.message);
			resolve({ success: false, error: error });
		}
	});
});

//
// Create user account
//
const createUser = (userInfo) => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"insert into users (username, password, first_name, last_name, email_address, phone_number, address, photo, rating) \
		values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
	let queryParameters = [
		userInfo.username,
		userInfo.password,
		userInfo.first_name,
		userInfo.last_name,
		userInfo.email_address,
		userInfo.phone_number,
		userInfo.address,
		userInfo.photo,
		userInfo.rating
	];
	connectionPool.query(queryString, queryParameters, (error, results) => {

		// Query returned valid results
		if (results && results.affectedRows) {
			resolve({ success: true });
		}
		else {
			// An error occured
			console.log("** DB error creating user: " + error.message);
			resolve({ success: false, error: error });
		}
	});
});

//
// Retrieve specific game by ID
//
const getGame = (id) => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"select g.game_id, u.username, u.first_name, u.last_name, u.rating, g.name, g.genre, g.num_players, g.cond, g.description, g.photo \
		from games g, users u \
		where g.posted_by_id = u.user_id \
		and g.game_id = ?";
	connectionPool.query(queryString, [id], (error, results) => {

		// Query returned valid results
		if (results) {
			resolve(toGame(results[0]));
		}
		else {
			// An error occured
			console.log("** Database error");
			reject(error);
		}
	});
});

//
// Retrieve all available games
//
const getGames = () => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"select g.game_id, u.username, u.first_name, u.last_name, u.rating, g.name, g.genre, g.num_players, g.cond, g.description, g.photo \
		from games g, users u \
		where g.posted_by_id = u.user_id";
	connectionPool.query(queryString, (error, results) => {

		// Query returned valid results
		if (results) {
			let games = [];
			for (game of results) {
				games.push(toGame(game));
			}
			resolve(games);
		}
		else {
			// An error occured
			console.log("** Database error");
			reject(error);
		}
	});
});

//
// Get games with a specific genre
//
const getGamesWithGenre = (genre, limit) => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"select g.game_id, u.username, u.first_name, u.last_name, u.rating, g.name, g.genre, g.num_players, g.cond, g.description, g.photo \
		from games g, users u \
		where g.posted_by_id = u.user_id\
		and g.genre = ? \
		order by rand() \
		limit ?";
	connectionPool.query(queryString, [genre, limit], (error, results) => {

		// Query returned valid results
		if (results) {
			let games = [];
			for (game of results) {
				games.push(toGame(game));
			}
			resolve(games);
		}
		else {
			// An error occured
			console.log("** Database error");
			reject(error);
		}
	});
});

//
// Retrieve user's posted games
//
const getPostedGames = (username) => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"select g.game_id, u.username, u.first_name, u.last_name, u.rating, g.name, g.genre, g.num_players, g.cond, g.description, g.photo \
		from games g, users u \
		where g.posted_by_id = u.user_id\
		and u.username = ?";
	connectionPool.query(queryString, [username], (error, results) => {

		// Query returned valid results
		if (results) {
			let games = [];
			for (game of results) {
				games.push(toGame(game));
			}
			resolve(games);
		}
		else {
			// An error occured
			console.log("** Database error");
			reject(error);
		}
	});
});

//
// Get user profile information
//
const getProfileInfo = (username) => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"select u.user_id, u.username, u.first_name, u.last_name, u.email_address, u.phone_number, u.address, u.photo, u.password, u.rating \
		from users u \
		where u.username = ?";
	connectionPool.query(queryString, [username], (error, results) => {

		// Query returned valid results
		if (results) {
			resolve(toUser(results[0]));
		}
		else {
			// An error occured
			console.log("** Database error");
			reject(error);
		}
	});
});

//
// Get random sample of games
//
const getRandomGames = (number) => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"select g.game_id, u.username, u.first_name, u.last_name, u.rating, g.name, g.genre, g.num_players, g.cond, g.description, g.photo \
		from games g, users u \
		where g.posted_by_id = u.user_id \
		order by rand() \
		limit ?";
	connectionPool.query(queryString, [number], (error, results) => {

		// Query returned valid results
		if (results) {
			let games = [];
			for (game of results) {
				games.push(toGame(game));
			}
			resolve(games);
		}
		else {
			// An error occured
			console.log("** Database error");
			reject(error);
		}
	});
});

//
// Get trades for user id
//
const getTrades = (username) => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"select t.trade_id, ur.username as receiver_username, gr.name as receiver_game_name, ui.username as initiator_username, gi.name as initiator_game_name \
		from trades t, users ur, games gr, users ui, games gi \
		where t.receiver_user_id = ur.user_id \
		and t.receiver_game_id = gr.game_id \
		and t.initiator_user_id = ui.user_id \
		and t.initiator_game_id = gi.game_id \
		and ur.username = ?";
	connectionPool.query(queryString, [username], (error, results) => {

		// Query returned valid results
		if (results) {
			let trades = [];
			for (trade of results) {
				trades.push(toTrade(trade));
			}
			resolve(trades);
		}
		else {
			// An error occured
			console.log("** Database error");
			reject(error);
		}
	});
});

//
// Get information for trade
//
const getTradeInfo = (username, tradeId) => new Promise((resolve, reject) => {

	// Execute query
	let queryString =
		"select t.trade_id, ur.username as receiver_username, gr.name as receiver_game_name, ui.username as initiator_username, gi.name as initiator_game_name \
		from trades t, users ur, games gr, users ui, games gi \
		where t.receiver_user_id = ur.user_id \
		and t.receiver_game_id = gr.game_id \
		and t.initiator_user_id = ui.user_id \
		and t.initiator_game_id = gi.game_id \
		and ( ur.username = ? or ui.username = ? ) \
		and t.trade_id = ?";
	connectionPool.query(queryString, [username, username, tradeId], (error, results) => {

		// Query returned valid results
		if (results) {
			resolve(toTrade(results[0]));
		}
		else {
			// An error occured
			console.log("** Database error");
			reject(error);
		}
	});
});

//
// Get user data
//
const getUser = (username) => new Promise((resolve, reject) => {

	// Execute query
	let queryString = "select * from users where username = ?";
	connectionPool.query(queryString, [username], (error, results) => {

		// Query returned valid results
		if (results) {
			resolve(results[0]);
		}
		else {
			// An error occured
			console.log("** Database error");
			reject(error);
		}
	});
});

//
// Convert DB game record to page object
//
const toGame = (dbRecord) => {

	// Process photo if there is one
	let base64photo = "";
	if (dbRecord.photo) {
		base64photo = "data:image/jpeg;base64," + Buffer.from(dbRecord.photo).toString("base64");
	}

	return {
		id: dbRecord.game_id,
		posted_by_username: dbRecord.username,
		posted_by_first_name: dbRecord.first_name,
		posted_by_last_name: dbRecord.last_name,
		posted_by_rating: dbRecord.rating,
		name: dbRecord.name,
		genre: dbRecord.genre,
		num_players: dbRecord.num_players,
		condition: dbRecord.cond,
		description: dbRecord.description,
		photo: base64photo
	};
}

//
// Convert DB trade record to page object
//
const toTrade = (dbRecord) => {
	return {
		id: dbRecord.trade_id,
		receiver_username: dbRecord.receiver_username,
		receiver_game_name: dbRecord.receiver_game_name,
		initiator_username: dbRecord.initiator_username,
		initiator_game_name: dbRecord.initiator_game_name
	};
}

//
// Convert DB user record to page object
//
const toUser = (dbRecord) => {

	// Process photo if there is one
	let base64photo = "";
	if (dbRecord.photo) {
		base64photo = "data:image/jpeg;base64," + Buffer.from(dbRecord.photo).toString("base64");
	}

	return {
		id: dbRecord.user_id,
		username: dbRecord.username,
		first_name: dbRecord.first_name,
		last_name: dbRecord.last_name,
		email_address: dbRecord.email_address,
		phone_number: dbRecord.phone_number,
		address: dbRecord.address,
		photo: base64photo,
		password: dbRecord.password,
		rating: dbRecord.rating,
	};
}

module.exports = {
	createGame,
	createUser,
	getGame,
	getGames,
	getGamesWithGenre,
	getPostedGames,
	getProfileInfo,
	getRandomGames,
	getTrades,
	getTradeInfo,
	getUser,
};
