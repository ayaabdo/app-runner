--
-- All A-Board Database Initialization Script
--
-- For Dockerized DBs:
--   docker exec -i mysql-dev mysql -u root < datalayer/initialize-database.sql
--

-- Create database
drop database if exists allaboard;
create database if not exists allaboard;
use allaboard;

-- Create Users table
drop table if exists users;
create table users (  
    user_id int not null primary key auto_increment comment 'Primary Key',
    username varchar(20) not null comment 'Username',
    password varchar(100) not null comment 'Password',
	salt varchar(32) not null comment 'Salt',
	first_name varchar(20) comment 'First name',
	last_name varchar(20) comment 'Last name',
	email_address varchar(25) comment 'Email address',
	phone_number varchar(20) comment 'Phone number',
	address varchar(255) comment 'Address',
	photo blob comment 'Profile photo',
	rating int comment 'Rating',
	unique(username)
) default charset UTF8 comment 'Users';

-- Create Games table
drop table if exists games;
create table games (  
    game_id int not null primary key auto_increment comment 'Primary Key',
	posted_by_id int comment 'Posted by User ID',
    name varchar(30) comment 'Name',
    genre varchar(20) comment 'Genre',
	num_players varchar(10) comment 'Number of players',
	cond varchar(30) comment 'Condition',
	description varchar(255) comment 'Description',
	photo blob comment 'Photo',
	available boolean comment 'Game is available for trade',
	foreign key (posted_by_id) references users (user_id)
) default charset UTF8 comment 'Games';

-- Create Trades table
drop table if exists trades;
create table trades (  
    trade_id int not null primary key auto_increment comment 'Primary Key',
    receiver_user_id int comment 'Receiver user ID',
    receiver_game_id int comment 'Receiver game ID',
    initiator_user_id int comment 'Initiator user ID',
    initiator_game_id int comment 'Initiator game ID',
	accepted boolean comment 'Trade accepted',
	foreign key (receiver_user_id) references users (user_id),
	foreign key (receiver_game_id) references games (game_id) on delete cascade,
	foreign key (initiator_user_id) references users (user_id),
	foreign key (initiator_game_id) references games (game_id) on delete cascade
) default charset UTF8 comment 'Trades';

-- ----------------------------------------------------------------------------
-- TEST DATA
-- ----------------------------------------------------------------------------

-- TEST USERS
insert into users (username, password, salt, first_name, last_name, email_address, phone_number, address, rating)
values
	('bryan', 'nGB8xNe9gR2W6O9gSWcRVYxCxpgUNDQrFlWWM+16ZY550rWG+du/OxE2fIZi0GFxhOEtD8vIuIwqliGDubyRtg==', 'qLG5cs1Dgto75MPubrhTkA==', 'Bryan', 'Lau', 'bryan@test.com', '012-345-6789', '99 Test Rd', 3),
	('chantal', 'ZtY1ewn6m/rI0DTiyCZfPRWkXxvNXdmDtdm4e118fssbk8M+tIThL0fLkJYm7q6tvJEtpRQs3+1VLzyTPfmixA==', 'kS5FjPeSDsGmbo+6NG+7MA==', 'Chantal', 'Elsa', 'chantal@test.com', '012-345-6789', '99 Test Rd', 5),
	('daniel', 'KOu5k7VmcyTIN66h5IM0dWdPnmXLvwYTRNHAomeDET3DgQFrsEoSvNCetqI6j9wPLCjYcl3GLny8mr0JK09soA==', 'C9DgQoDxFi0J+lpLpxHG3w==', 'Daniel', 'Rodriguez', 'daniel@test.com', '012-345-6789', '99 Test Rd', 5),
	('lina', 'K0DYaT8Qhy7A+Ndll4naTLPBR25Rr0TKDs9fqCPZvgwTxAIwtKoUGA8E3Axf0Ykp16tg6bpJU2O4v8tctofZFw==', '1ZyK/A2+fTs1etxqhG8Rug==', 'Lina', 'Evjenth', 'lina@test.com', '012-345-6789', '99 Test Rd', 5),
	('nazia', 'N7dGtro6iasoOQS3vgQbS019TDKBe7TliKaBRRzSQrTxjBnxUJtTVRz8WiuQaQbUMPOHjTaI8pW/CULBH3qAmQ==', 'yExgG7J1NYFgY5mybEXnHw==', 'Nazia', 'Fakhruddin', 'nazia@test.com', '012-345-6789', '99 Test Rd', 5),
	('test', 'F7gciQfYIvXPzD1Evr3t23NFcRKTmD3iRNDsaftlothNemhDffLOguzEwFSPNlJDfwHkC627eyMgD43vXz3zDQ==', 'H61jYBSLN0pjLxYxQFfOTg==', 'Test', 'Test', 'test@test.com', '012-345-6789', '99 Test Rd', 5);

-- TEST GAMES
insert into games (posted_by_id, name, genre, num_players, cond, description, available)
values
	(1, 'Monopoly', 'Family', '2-8', 'Good', 'A real estate trading game where you try to bankrupt everyone else', true),
 	(2, 'Scrabble', 'Family', '2-4', 'Excellent', 'Spell out the longest word from a set of tiles and win with the most points in the end', true),
 	(4, 'The Game of Life', 'Family', '2-4', 'Fair', 'Make smart decisions as you go through life and be the first to retire', true),
 	(5, 'Clue', 'Family', '2-4', 'Fair', 'The classic murder mystery game', true),
 	(3, 'Battleship', 'Wargame', '2-4', 'Good', 'Strategy game where each player takes turns trying to sink the other player''s fleet', true),
 	(1, 'Chess', 'Strategy', '2-4', 'Fair', 'One of the oldest strategy games in the world', true),
 	(5, 'Trivial Pursuit', 'Trivia', '2-4', 'Fair', 'Answer trivia questions and be the first to reach the center of the board', true);

-- TEST TRADES
insert into trades (receiver_user_id, receiver_game_id, initiator_user_id, initiator_game_id, accepted)
values
	(1, 1, 2, 2, false),
	(1, 6, 3, 5, false),
	(2, 2, 4, 3, false),
	(2, 2, 5, 7, false),
	(3, 5, 5, 7, false),
	(3, 5, 2, 2, false),
	(4, 3, 1, 1, false),
	(4, 3, 5, 7, false),
	(5, 7, 1, 2, false),
	(5, 7, 3, 5, false);
