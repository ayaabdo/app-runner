///////////////////////////////////////////////////////////
// Games model
//
// Handles games data
//
const dataLayer = require("../datalayer/DataLayer");

//
// Create new game record
//
const createGame = (gameInfo) => {
	return dataLayer.createGame(gameInfo);
};

//
// Get game information from the database
//
const getGame = (gameId) => {
	return dataLayer.getGame(gameId);
};

//
// Get list of games from the database
//
const getGames = () => {
	return dataLayer.getGames();
};

//
// Get list of games with a specific genre
//
const getGamesWithGenre = (genre, limit) => {
	return dataLayer.getGamesWithGenre(genre, limit);
};

//
// Get list of posted games by the user
//
const getPostedGames = (username) => {
	return dataLayer.getPostedGames(username);
};

//
// Get a sample of available games
//
const getSampleGames = (samples) => {
	return dataLayer.getRandomGames(samples);
};

module.exports = {
	createGame,
	getGame,
	getGames,
	getGamesWithGenre,
	getPostedGames,
	getSampleGames,
};
