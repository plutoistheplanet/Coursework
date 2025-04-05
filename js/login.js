sessionStorage.clear();

// new player button clicked
document.getElementById("newPlayerBtn").addEventListener("click", function () {
	window.location.href = "register.html";
});

//forgot password button clicked
document.getElementById("forgotPasswordBtn").addEventListener("click", function () {
	window.location.href = "forgotPassword.html";
});

function togglePasswordVisibility(icon) {
	const passwordInput = document.getElementById("password");

	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		icon.textContent = "🙈";
	} else {
		passwordInput.type = "password";
		icon.textContent = "👁️";
	}
}

document.getElementById("loginForm").addEventListener("submit", async function (event) {
	event.preventDefault();
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	// Checks the database to see if a matching username and password can be found.
	let sqlQuery = `SELECT userID, userName, sessionID, statisticsID FROM PLAYER_INFO WHERE userName = '${username}' AND password = '${password}'`;
	dbConfig.set("query", sqlQuery);

	try {
		let response = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});
		let result = await response.json();

		if (result.success && result.data.length > 0) {
			let user = result.data[0];
			localStorage.setItem("userId", user.userID);
			localStorage.setItem("username", user.userName);
			localStorage.setItem("sessionId", user.sessionID);
			localStorage.setItem("statisticsId", user.statisticsID);

			//chnage to the main menu page
			window.location.href = "floor5.html";
		} else {
			document.getElementById("loginMessage").textContent = "Invalid username or password.";
		}
	} catch (error) {
		console.error("Error completing login:", error);
	}
});
