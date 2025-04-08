document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("total-players").innerText = Math.floor(Math.random() * 31 + 20);
});

//new game button press
document.getElementById("new-game").addEventListener("click", function () {
	//floor = 1 inventory empty
	let y = localStorage.getItem("sessionId");

	setInventoryToEmpty();
	setFloorToOne(y);
	deletePlayerPlayTime();

	window.location.href = "floor1.html";
});
//#region continue
document.getElementById("continue").addEventListener("click", function () {
	let y = localStorage.getItem("sessionId");
	console.log("Session ID:", y);
	getFloor(y);
});
async function getFloor(sessionId) {
	let sqlQuery = `SELECT saveData FROM GAME_INFO WHERE sessionID = ${sessionId}`;

	dbConfig.set("query", sqlQuery);

	try {
		let response = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});
		let result = await response.json();

		if (result.success && result.data.length > 0 && result.data[0].saveData) {
			let savedGameData = result.data[0].saveData;
			console.log("Saved Game Data:", savedGameData);
			let floor = savedGameData.match(/Floor:\s*(\d+)/)[1];
			window.location.href = `floor${floor}.html`;
		} else {
			alert("You have no game to resume on this account!");
		}
	} catch (error) {
		console.error("Error feetching saved game data:", error);
	}
}
//#endregion
//#region playerTimeToZero
async function deletePlayerPlayTime() {
	let statsID = localStorage.getItem("statisticsId");

	let sqlQuery = `UPDATE PLAYER_STATISTICS
                    SET playerTime = '00:00:00'
                    WHERE statisticsID = ${statsID};`;

	dbConfig.set("query", sqlQuery);

	try {
		let response = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});

		let result = await response.json();
		if (result.success) {
			console.log(`playerTime reset to 00:00:00 for statisticsID: ${statsID}`);
			localStorage.removeItem("playerTime");
		} else {
			console.error("Failed to reset playerTime:", result.message);
		}
	} catch (error) {
		console.error("Error resetting playerTime:", error);
	}
}

//#endregion
//#region setToFloor1
async function setFloorToOne(sessionID) {
	let procedureCall = `CALL UpdateUserFloorSimple(${sessionID}, 1)`;
	console.log("Procedure Call:", procedureCall);

	dbConfig.set("query", procedureCall);

	try {
		let response = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});

		let result = await response.json();
		if (result.success) {
			console.log("User floor updated successfully.");
		} else {
			console.error("Failed to update userr floor:", result.message);
		}
	} catch (error) {
		console.error("Error updating user floor:", error);
	}
}
//#endregion
async function setInventoryToEmpty() {
	let userId = localStorage.getItem("userId");

	let sqlQuery = `DELETE FROM USER_INVENTORY
                    WHERE userID = ${userId};`;

	dbConfig.set("query", sqlQuery);

	try {
		let response = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});

		let result = await response.json();
		if (result.success) {
			console.log(`Inventory deleted for user: ${userId}`);
		} else {
			console.error("Failed to delete inventory:", result.message);
		}
	} catch (error) {
		console.error("Error deleting inventory:", error);
	}
}


//light mode
document.getElementById("lightMode").addEventListener("change", function () {
	document.body.classList.toggle("lightMode", this.checked);
	if(this.checked){
		applyTheme("defaultMode");
	}
	else{
		applyTheme("lightMode");
	}

});
