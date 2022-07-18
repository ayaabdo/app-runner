///////////////////////////////////////////////////////////
//
// Data Layer Abstraction Point
//
// Abstration interface to switch between simulated
// and real database data layer
//

// Switch this to DataLayerDB to use the DB instead
const abstractionLayer = require("../datalayer/DataLayerSim");
//const abstractionLayer = require("../datalayer/DataLayerDB");

// Call defined layer via this abstraction level
const createGame = (gameInfo) => abstractionLayer.createGame(gameInfo);
const createUser = (userInfo) => abstractionLayer.createUser(userInfo);
const getGame = (id) => abstractionLayer.getGame(id);
const getGames = () => abstractionLayer.getGames();
const getGamesWithGenre = (genre, limit) => abstractionLayer.getGamesWithGenre(genre, limit);
const getPostedGames = (username) => abstractionLayer.getPostedGames(username);
const getRandomGames = (number) => abstractionLayer.getRandomGames(number);
const getProfileInfo = (username) => abstractionLayer.getProfileInfo(username);
const getTrades = (username) => abstractionLayer.getTrades(username);
const getTradeInfo = (username, tradeId) => abstractionLayer.getTradeInfo(username, tradeId);
const getUser = (username) => abstractionLayer.getUser(username);

module.exports = {
	createGame,
	createUser,
	getGame,
	getGames,
	getGamesWithGenre,
	getPostedGames,
	getRandomGames,
	getProfileInfo,
	getTrades,
	getTradeInfo,
	getUser,
};
