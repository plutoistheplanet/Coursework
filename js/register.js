//already a player button clicked
document.getElementById("alreadyPlayerBtn").addEventListener("click", function () {
	window.location.href = "login.html";
});
document.getElementById("registerForm").addEventListener("submit", function (e) {
	e.preventDefault();

	//user information
	let email = document.getElementById("email").value;
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let confirmPassword = document.getElementById("confirmPassword").value;

	//password validation
	if (!checkPassword(password) === "") {
		alert(checkPassword(password));
	}

	if (password !== confirmPassword) {
		alert("Passwords do not match");
	}
	// console.log(email, username, password, confirmPassword);
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
