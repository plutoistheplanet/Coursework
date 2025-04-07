//points to database
const dbConnectorUrl = "https://bherron08.webhosting1.eeecs.qub.ac.uk/dbConnector.php";
//credentials
let dbConfig = new URLSearchParams({
	hostname: "localhost",
	username: "bherron08",
	password: "H17TYwr0hr3b90DD",
	database: "CSC1034_CW_27",
	multipleStatements: true,
});

//time stuff

function timeStuff(){
	playerInventory.saveInventoryToDB();

	let pageEndTime = Date.now();
	let timeSpentThisPage = (pageEndTime - pageStartTime) / 1000;

	let currentTotalTime = parseFloat(localStorage.getItem("playerTime")) || 0;
	let newTotalTime = currentTotalTime + timeSpentThisPage;

	console.log("Time spent on this page:", timeSpentThisPage, "seconds");
	console.log("New total play time:", newTotalTime, "seconds");
	console.log("Current total play time:", currentTotalTime, "seconds");

	localStorage.setItem("playerTime", newTotalTime);

	setPlayerTime(newTotalTime);
}



async function setPlayerTime(timeInSeconds) {
	let statsID = localStorage.getItem("statisticsId");

	//convert seconds to HH:MM:SS
	let hours = Math.floor(timeInSeconds / 3600);
	let minutes = Math.floor((timeInSeconds % 3600) / 60);
	let seconds = Math.floor(timeInSeconds % 60);

	let timeFormatted = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
		seconds
	).padStart(2, "0")}`;

	let sqlQuery = `UPDATE PLAYER_STATISTICS
                    SET playerTime = '${timeFormatted}'
                    WHERE statisticsID = ${statsID};`;

	dbConfig.set("query", sqlQuery);

	try {
		let response = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});

		let result = await response.json();
		if (result.success) {
			console.log(`playerTime updated to ${timeFormatted} for statisticsID: ${statsID}`);
		} else {
			console.error("Failed to update playerTime:", result);
		}
	} catch (error) {
		console.error("Error updating playerTime:", error);
	}
}