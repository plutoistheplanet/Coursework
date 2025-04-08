let levelReached = localStorage.getItem("levelReached") || 0;
let totPlayers = 0;

let timePlayed = parseFloat(localStorage.getItem("playerTime")) || 0;
let hours = Math.floor(timePlayed / 3600);
let minutes = Math.floor((timePlayed % 3600) / 60);
let seconds = Math.floor(timePlayed % 60);

//count how many user ids
async function getTotalUsers() {
	let sqlQuery = `SELECT COUNT(userID) AS totalUsers FROM PLAYER_INFO`;
	dbConfig.set("query", sqlQuery);

	try {
		let response = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});
		let result = await response.json();
		// console.log("Raw result from PHP:", result);
		if (result.success && result.data.length > 0) {
			let count = result.data[0].totalUsers;
			totPlayers = count;
			console.log("Total users:", totPlayers);
			totPlayersDisplay.innerText = ` The Abyss Corporation Total users: ${totPlayers}`;
		} else {
			console.error("Failed to retrieve user count.");
		}
	} catch (error) {
		console.error("Error fetching user count:", error);
	}
}

let totPlayersAvgTime = 0;

//time played multipled by something for ppoints rounded to a whole number
let points = 0;

const levelDisplay = document.getElementById("levelDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const pointsDisplay = document.getElementById("pointsDisplay");
const totPlayersDisplay = document.getElementById("totPlayers");
const bossDecisionDisplay = document.getElementById("bossDecisionDisplay");

const endButton = document.getElementById("endButton");

function display() {
	let x = localStorage.getItem("bossDecision");
	console.log(x);
	levelDisplay.innerText = levelReached;
	bossDecisionDisplay.textContent = x;
}

timeDisplay.innerText = `Time Played: ${hours} hours ${minutes} minutes ${seconds} seconds`;

function endGame() {
	window.location.href = "login.html";
}

getTotalUsers();
display();

//event listeners for button
endButton.addEventListener("click", endGame);