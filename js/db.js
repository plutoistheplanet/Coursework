async function updateUserFloorInDB(sessionID, floor) {
	let procedureCall = `CALL UpdateUserFloorSimple(${sessionID}, ${floor})`;
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
			console.error("Failed to update user floor:", result.message);
		}
	} catch (error) {
		console.error("Error updating user floor:", error);
	}
}