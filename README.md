# All-A-Board
Code repository for the All A-Board application created by ASP Team #35

## Team Members
- Chantal Elsa
- Daniel Rodriguez
- Lina Evjenth
- Nazia Fakhruddin
- Bryan Lau

## Setup
The application uses Node.js and Express. To start, make sure to have the [npm](https://nodejs.org/en/download/) package manager installed on your machine.

1. Clone the repo to your local machine.

```bash
git clone https://github.com/laubryan/All-A-Board
```

2. Open a terminal or command prompt and change to the project directory.

```bash
cd All-A-Board
```

3. Run `npm install` to automatically install the package dependencies. This will read the project's package file and automatically install all the packages that the application needs to run.

```bash
npm install
```

## Running the Application

### From the Command Line
1. Open a terminal or command prompt and change to the project directory.
2. Run `npm start`.
3. Open a browser and go to `http://localhost:3000`.

Note that when running the server from the command line like this, if you make changes to files you will have to restart the server and refresh your browser to see those changes.

### From Visual Studio Code
1. Open the project directory in VSCode.
2. Press F5 to run the application.
3. Choose Node as the execution environment.
4. Open a browser and go to `http://localhost:3000`.

If not already set up, VSCode can be configured to use nodemon to automatically restart the server when changes are made. You may still have to refresh your browser.


## Project Organization

### Folders

|Folder|Purpose| UI | Middleware |
|:---|:---|:---:|:---:|
| bin | Server configuration | | X |
| controllers | Handle page business logic and processing | | X |
| datalayer | Data access layer modules | | X |
| models | Data model classes for each entity | | X |
| public | Static web content, e.g, html, css, images | X | |
| routes | Handle HTTP URI requests and dispatch to controllers | | X |
| views | EJS templates and partial pages | X | |

You may also have a `node_modules` folder in your local repository folder, but this only exists on your machine. It contains your local packages and should not be committed to Git. In any case it should not show up in any of the commit lists due to the `.gitignore` filter.

Other local folders:

* .git
* .vscode

These are related to your local environment and are not committed to the repo.

## Making Changes
After making changes to your local files, you must restart the application and refresh your browser to see the changes. Automatic application restarts can be configured using nodemon if preferred.

### UI Developers
UI developers are mostly interested in:

* EJS files in /views
* CSS files in /public/stylesheets
* JS files in /public/javascripts

Each EJS partial page body has a corresponding CSS and JS file, e.g. for the Games page:

* games.ejs
* games.css
* games.js

Each main page has standard nav bar and footer, as dictated by the master EJS template `template.ejs`.

Standard nav bar and footer files:

* navbar.ejs
* footer.ejs

UI developers can also add other static (i.e. html, css, images) files to the /public folder.

### Middleware/Backend Developers
Middleware developers are mostly interested in JS and EJS files related to:

* Routes
* Controllers
* Data Layer
* Models

### Links

The following links are routes to the main application pages. You can use these links in your pages.

|Link|Page|Requires Authentication|
|:---|:---|:---:|
| / | Home | N  |
| /account | Account Creation | N |
| /dashboard | Dashboard | Y |
| /gameinfo | Game Information | N |
| /games | Games/Inventory | N |
| /postgame | Post a Game | Y |
| /tradeinfo | Trade Information | Y |
| /profile | User Profile | Y |


## IDE Setup and Conventions
Visual Studio Code is the recommended IDE.

Recommended extensions:
- Prettier

TODO: Add details about formatting conventions

## Committing Changes

DO add commit notes that explain _why_ you made the commit

DO finish a complete set of changes before pushing to the repo

DO test before pushing your changes to the repo


DON'T use Javascript to position UI elements

DON'T push changes that break the application for others

DON'T make changes to shared/common files without discussing with the team

## Page Data Services

Some pages need to pull data from backend data services. The following pages are currently enabled in the backend to pull data from specific datasets, but integrations can be added to other pages if required:

- Dashboard
- Game Information
- Games/Inventory
- Trade Information
- Login
- Profile

### Session Information

Data is shared to pages using supplied page variables. An `sessionInfo` page variable is provided for basic session information, e.g. `sessionInfo.username`. The following fields are available:

|Field|Datatype|Description|
|---:|:---|:---|
| isAuthenticated | Boolean | Whether the user is logged in or not |
| username | String | Username that the user is logged in as |

Note that some fields may be null or undefined if the user has not logged in, but this can always be checked first using `isAuthenticated`.

### Page Data

Application data is shared to pages using the `pageData` variable, which is a JavaScript object variable containing different datasets that are made available to pages. Datasets are referenced using specific names, e.g. `pageData.postedGames` returns the collection of games that the user has posted.

Here are the currently defined datasets. Note that not all datasets have been made available on all pages.

|Dataset Variable|Description|
|---:|:---|
| game | Information about a specific game, as specified by the route parameter |
| games | List of games in the system, to be filterable in the future |
| trade | Information about a specific trade, as specified by the route parameter |
| message | Any system or error message generated by the backend |
| postedGames | List of games that the user has posted |
| profileInfo | Information about a user's profile, as specified by the current session |
| suggestedGames | List of suggested games based on specific criteria. For the Game Information page, these are games with the same genre as the one being viewed |


#### Game

Fields that describe an individual game.

Dataset variable name: `game`

|Field name|Type|Length|Description|
|:---|:---|---|:---|
| id | Number | | Internal ID of the game |
| posted_by_username | Text | 20 | Username who posted the game |
| posted_by_first_name | Text | 20 | First name of the user who posted the game |
| posted_by_last_name | Text | 20 | Last name/surname of the user who posted the game |
| posted_by_rating | Number | | Numerical rating of the user who posted the game |
| name | Text | 30 | Name of the game |
| genre | Text | 20 | Genre of the game |
| num_players | Text | 10 | Number of players |
| condition |Text | 255 | Condition of the game |
| description |Text | 255 | Long description of the game |
| photo | Base64 | | Uploaded photo of the game |


#### Trade

Fields that describe an individual trade.

Dataset variable name: `trade`

|Field name|Type|Length|Description|
|:---|:---|---|:---|
| id | Number | | Internal ID of the trade |
| receiver_username | Text | 20 | Username of the person who is receiving the trade |
| receiver_game_name | Text | 30 | The game belonging to the person who is receiving the trade |
| initiator_username | Text | 20 | Username of the person who is initiating the trade |
| initiator_game_name | Text | 30 | The game belonging to the person who is initiating the trade |


#### User Profile

Fields that describe a user profile.

Dataset variable name: `profile`

|Field name|Type|Length|Description|
|:---|:---|---|:---|
| id | Number | | Internal ID of the user |
| username | Text | 20 | Username/login of the user |
| first_name | Text | 20 | First name |
| last_name | Text | 20 | Last name/surname |
| email_address | Text | 25 | Email address |
| phone_number | Text | 20 | Phone number |
| address | Text | 255 | Mailing address |
| photo | Base64 |  | Uploaded user profile photo |
| password | Text | 20 | Password |
| rating | Number | | Numerical rating of the user |
