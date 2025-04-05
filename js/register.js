//already a player button clicked
document.getElementById("alreadyPlayerBtn").addEventListener("click", function () {
	window.location.href = "login.html";
});

function togglePasswordVisibility(icon) {
	const passwordInput = document.getElementById("password");
	const confirmpasswordInput = document.getElementById("confirmPassword");

	if (passwordInput.type === "password") {
		passwordInput.type = "text";
		confirmpasswordInput.type = "text";
		icon.textContent = "🙈";
	} else {
		passwordInput.type = "password";
		confirmpasswordInput.type = "password";
		icon.textContent = "👁️";
	}
}
function checkPassword(password) {
	if (password.length < 8) {
		return "Password must be at least 8 characters long.";
	}

	let containsNumber = false;
	for (let i = 0; i < password.length; i++) {
		if (/\d/.test(password[i])) {
			containsNumber = true;
			break;
		}
	}

	if (!containsNumber) {
		return "Password must contain at least one number.";
	}

	return "";
}

document.getElementById("registerForm").addEventListener("submit", async function (event) {
	event.preventDefault();
	let email = document.getElementById("email").value;
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let confirmPassword = document.getElementById("confirmPassword").value;

	//passowrd confim mathces password
	if (password !== confirmPassword) {
		document.getElementById("registerMessage").textContent = "Passwords do not match.";
		return;
	}

	//check to see if username exists in db
	let selectQueryUser = `SELECT userID FROM PLAYER_INFO WHERE userName = '${username}'`;
	dbConfig.set("query", selectQueryUser);
	try {
		let checkResponse = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});
		let checkResult = await checkResponse.json();

		if (checkResult.success && checkResult.data.length > 0) {
			document.getElementById("registerMessage").textContent = "Username already exists.";
			return;
		}
	} catch (error) {
		console.error("Error checking for existing accounts:", error);
	}

	//check to see if email exists in db
	let selectQueryEmail = `SELECT email FROM PLAYER_INFO WHERE email = '${email}'`;
	dbConfig.set("query", selectQueryEmail);
	try {
		let checkResponse = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});
		let checkResult = await checkResponse.json();

		if (checkResult.success && checkResult.data.length > 0) {
			document.getElementById("registerMessage").textContent = "Email already exists.";
			return;
		}
	} catch (error) {
		console.error("Error checking for existing email:", error);
	}

	//create a blank stats record and a blank session record
	//add user to db

	let procedureCall = `CALL RegisterUser('${email}', '${username}', '${password}')`;

	console.log("Procedure Call:", procedureCall);

	dbConfig.set("query", procedureCall);

	try {
		let insertResponse = await fetch(dbConnectorUrl, {
			method: "POST",
			body: dbConfig,
		});
		let insertResult = await insertResponse.json();

		if (insertResult.success) {
			document.getElementById("registerMessage").style.color = "green";
			document.getElementById("registerMessage").textContent = "Registration successful!";
			//MUST go to login after registering
			window.location.href = "login.html";
		} else {
			document.getElementById("registerMessage").textContent = "Error registering user.";
		}
	} catch (error) {
		console.error("Error registering user:", error);
	}
});
