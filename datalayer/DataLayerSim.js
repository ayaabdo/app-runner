///////////////////////////////////////////////////////////
//
// Data Layer (Simulated)
//
// Proxy data access layer using dummy data to
// simulate DB interactions
//

//
// Create new game record
//
const createGame = (gameInfo) => new Promise((resolve, reject) => {

	// For simulated data, store photo as base64
	if (gameInfo.photo) {
		let base64photo = "data:image/jpeg;base64," + Buffer.from(gameInfo.photo).toString("base64");
		gameInfo.photo = base64photo;
	}

	// Set the game id
	gameInfo.id = dummyGames.length;

	// Populate user info
	let userInfo = getUserSync(gameInfo.posted_by_username);
	if (userInfo) {
		gameInfo.posted_by_first_name = userInfo.first_name;
		gameInfo.posted_by_last_name = userInfo.last_name;
		gameInfo.posted_by_rating = userInfo.rating;
	}

	// Add record to db
	dummyGames.push(gameInfo);
	resolve({ success: true });

});

//
// Create user account
//
const createUser = (userInfo) => new Promise((resolve, reject) => {

	// Check for existing username
	let duplicate = false;
	for (user of dummyUsers) {
		if (user.username == userInfo.username) {
			duplicate = true;
			break;
		}
	}

	// Add user
	if (!duplicate) {

		// For simulated data, store photo as base64
		if (userInfo.photo) {
			let base64photo = "data:image/jpeg;base64," + Buffer.from(userInfo.photo).toString("base64");
			userInfo.photo = base64photo;
		}

		// Add record to db
		dummyUsers.push(userInfo);
		resolve({ success: true });
	}
	else {
		// Duplicate user
		resolve({ success: false, error: { code: 'ER_DUP_ENTRY'} });
	}
});

//
// Retrieve specific game by ID
//
const getGame = (id) => new Promise((resolve, reject) => {
	for (game of dummyGames) {
		if (game.id == id) resolve(game);
	}
	reject(null);
});

//
// Retrieve all games
//
const getGames = () => new Promise((resolve, reject) => {
	resolve(dummyGames);
});

//
// Get games with a specific genre
//
const getGamesWithGenre = (genre, limit) => new Promise((resolve, reject) => {

	// Assemble list of games with this genre
	let fullList = [];
	for (game of dummyGames) {
		if (game.genre == genre) {
			fullList.push(game);
		}
	}

	// Select random number up to the limit
	let games = selectRandomGames(fullList, limit);

	resolve(games);
});

//
// Retrieve user's posted games
//
const getPostedGames = (username) => new Promise((resolve, reject) => {

	// Assemble list of posted games for user
	let postedGames = [];
	for (game of dummyGames) {
		if (game.posted_by_username == username) {
			postedGames.push(game);
		}
	}
	resolve(postedGames);
});

//
// Get user profile information
//
const getProfileInfo = (username) => new Promise((resolve, reject) => {

	// Search data for user
	username = username.toLowerCase();
	for (user of dummyUsers) {

		// Copy matched user's info
		if (user.username == username) {
			resolve(user);
		}
	}

	reject(null);
});

//
// Get random sample of games
//
const getRandomGames = (number) => new Promise((resolve, reject) => {

	// Select several random games from the list
	let randomGames = selectRandomGames(dummyGames, number);

	resolve(randomGames);
});

//
// Get trades for user id
//
const getTrades = (username) => new Promise((resolve, reject) => {

	// Accumulate trades for this user
	let trades = [];
	for (trade of dummyTrades) {
		if (trade.receiver_username == username) {
			trades.push(trade);
		}
	}

	resolve(trades);
});

//
// Get information for trade
//
const getTradeInfo = (username, id) => new Promise((resolve, reject) => {
	// Search dummy data for matching trade
	for (trade of dummyTrades) {
		if (trade.id == id) {
			resolve(trade);
		}
	}
	reject(null);
});

//
// Get user data
//
const getUser = (username) => new Promise((resolve, reject) => {

	// Search for user match
	username = username.toLowerCase();
	for (user of dummyUsers) {
		if (user.username == username) {
			resolve(user);
		}
	}

	resolve(null);
});

//
// Get user data (synchronous)
//
const getUserSync = (username) =>  {

	// Search for user match
	username = username.toLowerCase();
	for (user of dummyUsers) {
		if (user.username == username) {
			return user;
		}
	}

	return null;
};

//
// Create random subset of games
//
const selectRandomGames = (list, limit) => {

	// Determine the maximum number in the subset
	let maxNumGames = list.length < limit ? list.length : limit;

	// Copy the list to avoid modification by reference
	let gamesList = list.map((x) => x);

	// Extract random sample
	let games = [];
	while (games.length < maxNumGames) {

		// Add random game to list
		let randomIndex = Math.floor(Math.random() * gamesList.length);
		games.push(gamesList[randomIndex]);

		// Remove game from original list
		gamesList.splice(randomIndex, 1);
	}

	return games;
};

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

// GAMES
let dummyGames = [
	{
		id: 0,
		posted_by_username: "bryan",
		posted_by_first_name: "Bryan",
		posted_by_last_name: "Lau",
		posted_by_rating: 3,
		name: "Monopoly",
		genre: "Family",
		num_players: "2-8",
		condition: "Good",
		description: "A real estate trading game where you try to bankrupt everyone else",
		photo: "data:image/jpeg;base64,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",
	},
	{
		id: 1,
		posted_by_username: "chantal",
		posted_by_first_name: "Chantal",
		posted_by_last_name: "Elsa",
		posted_by_rating: 5,
		name: "Scrabble",
		genre: "Family",
		num_players: "2-4",
		condition: "Excellent",
		description: "Spell out the longest word from a set of tiles and win with the most points in the end",
		photo: "data:image/jpeg;base64,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",
	},
	{
		id: 2,
		posted_by_username: "lina",
		posted_by_first_name: "Lina",
		posted_by_last_name: "Evjenth",
		posted_by_rating: 5,
		name: "The Game of Life",
		genre: "Family",
		num_players: "2-4",
		condition: "Fair",
		description: "Make smart decisions as you go through life and be the first to retire",
		photo: "data:image/jpeg;base64,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",
	},
	{
		id: 3,
		posted_by_username: "nazia",
		posted_by_first_name: "Nazia",
		posted_by_last_name: "Fakhruddin",
		posted_by_rating: 5,
		name: "Clue",
		genre: "Family",
		num_players: "2-4",
		condition: "Fair",
		description: "The classic murder mystery game",
		photo: "data:image/jpeg;base64,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",
	},
	{
		id: 4,
		posted_by_username: "daniel",
		posted_by_first_name: "Daniel",
		posted_by_last_name: "Rodriguez",
		posted_by_rating: 5,
		name: "Battleship",
		genre: "Wargame",
		num_players: "2-4",
		condition: "Good",
		description: "Strategy game where each player takes turns trying to sink the other player's fleet",
		photo: "data:image/jpeg;base64,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",
	},
	{
		id: 5,
		posted_by_username: "bryan",
		posted_by_first_name: "Bryan",
		posted_by_last_name: "Lau",
		posted_by_rating: 3,
		name: "Chess",
		genre: "Strategy",
		num_players: "2-4",
		condition: "Fair",
		description: "One of the oldest strategy games in the world",
		photo: "data:image/jpeg;base64,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",
	},
	{
		id: 6,
		posted_by_username: "nazia",
		posted_by_first_name: "Nazia",
		posted_by_last_name: "Fakhruddin",
		posted_by_rating: 5,
		name: "Trivial Pursuit",
		genre: "Trivia",
		num_players: "2-4",
		condition: "Fair",
		description: "Answer trivia questions and be the first to reach the center of the board",
		photo: "data:image/jpeg;base64,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",
	},
];

// TRADES
let dummyTrades = [
	{
		id: 0,
		receiver_username: "bryan",
		receiver_game_name: "Monopoly",
		initiator_username: "chantal",
		initiator_game_name: "Scrabble",
		accepted: false,
	},
	{
		id: 1,
		receiver_username: "bryan",
		receiver_game_name: "Chess",
		initiator_username: "daniel",
		initiator_game_name: "Battleship",
		accepted: false,
	},
	{
		id: 2,
		receiver_username: "chantal",
		receiver_game_name: "Scrabble",
		initiator_username: "lina",
		initiator_game_name: "The Game of Life",
		accepted: false,
	},
	{
		id: 3,
		receiver_username: "chantal",
		receiver_game_name: "Scrabble",
		initiator_username: "nazia",
		initiator_game_name: "Trivial Pursuit",
		accepted: false,
	},
	{
		id: 4,
		receiver_username: "daniel",
		receiver_game_name: "Battleship",
		initiator_username: "nazia",
		initiator_game_name: "Trivial Pursuit",
		accepted: false,
	},
	{
		id: 5,
		receiver_username: "daniel",
		receiver_game_name: "Battleship",
		initiator_username: "chantal",
		initiator_game_name: "Scrabble",
		accepted: false,
	},
	{
		id: 6,
		receiver_username: "lina",
		receiver_game_name: "The Game of Life",
		initiator_username: "bryan",
		initiator_game_name: "Monopoly",
		accepted: false,
	},
	{
		id: 7,
		receiver_username: "lina",
		receiver_game_name: "The Game of Life",
		initiator_username: "nazia",
		initiator_game_name: "Trivial Pursuit",
	},
	{
		id: 8,
		receiver_username: "nazia",
		receiver_game_name: "Trivial Pursuit",
		initiator_username: "bryan",
		initiator_game_name: "Scrabble",
		accepted: false,
	},
	{
		id: 9,
		receiver_username: "nazia",
		receiver_game_name: "Trivial Pursuit",
		initiator_username: "daniel",
		initiator_game_name: "Battleship",
		accepted: false,
	},
];

// USERS
let dummyUsers = [
	{
		id: 0,
		username: "bryan",
		password: "nGB8xNe9gR2W6O9gSWcRVYxCxpgUNDQrFlWWM+16ZY550rWG+du/OxE2fIZi0GFxhOEtD8vIuIwqliGDubyRtg==",
		salt: "qLG5cs1Dgto75MPubrhTkA==",
		first_name: "Bryan",
		last_name: "Lau",
		email_address: "bryan@test.com",
		phone_number: "1234567890",
		address: "21 Boardwalk Ave",
		photo: "",
		rating: 3,
	},
	{
		id: 1,
		username: "chantal",
		password: "ZtY1ewn6m/rI0DTiyCZfPRWkXxvNXdmDtdm4e118fssbk8M+tIThL0fLkJYm7q6tvJEtpRQs3+1VLzyTPfmixA==",
		salt: "kS5FjPeSDsGmbo+6NG+7MA==",
		first_name: "Chantal",
		last_name: "Elsa",
		email_address: "chantal@test.com",
		phone_number: "1234567890",
		address: "21 Boardwalk Ave",
		photo: "",
		rating: 5,
	},
	{
		id: 2,
		username: "daniel",
		password: "KOu5k7VmcyTIN66h5IM0dWdPnmXLvwYTRNHAomeDET3DgQFrsEoSvNCetqI6j9wPLCjYcl3GLny8mr0JK09soA==",
		salt: "C9DgQoDxFi0J+lpLpxHG3w==",
		first_name: "Daniel",
		last_name: "Rodriguez",
		email_address: "daniel@test.com",
		phone_number: "1234567890",
		address: "21 Boardwalk Ave",
		photo: "",
		rating: 5,
	},
	{
		id: 3,
		username: "lina",
		password: "K0DYaT8Qhy7A+Ndll4naTLPBR25Rr0TKDs9fqCPZvgwTxAIwtKoUGA8E3Axf0Ykp16tg6bpJU2O4v8tctofZFw==",
		salt: "1ZyK/A2+fTs1etxqhG8Rug==",
		first_name: "Lina",
		last_name: "Evjenth",
		email_address: "lina@test.com",
		phone_number: "1234567890",
		address: "21 Boardwalk Ave",
		photo: "",
		rating: 5,
	},
	{
		id: 4,
		username: "nazia",
		password: "N7dGtro6iasoOQS3vgQbS019TDKBe7TliKaBRRzSQrTxjBnxUJtTVRz8WiuQaQbUMPOHjTaI8pW/CULBH3qAmQ==",
		salt: "yExgG7J1NYFgY5mybEXnHw==",
		first_name: "Nazia",
		last_name: "Fakhruddin",
		email_address: "nazia@test.com",
		phone_number: "1234567890",
		address: "21 Boardwalk Ave",
		photo: "",
		rating: 5,
	},
	{
		id: 5,
		username: "test",
		password: "F7gciQfYIvXPzD1Evr3t23NFcRKTmD3iRNDsaftlothNemhDffLOguzEwFSPNlJDfwHkC627eyMgD43vXz3zDQ==",
		salt: "H61jYBSLN0pjLxYxQFfOTg==",
		first_name: "Test",
		last_name: "Test",
		email_address: "test@test.com",
		phone_number: "1234567890",
		address: "33 Tester Ave",
		photo: "",
		rating: 5,
	}
];
