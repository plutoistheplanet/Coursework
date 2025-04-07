let startedRoom1 = "tryRoom1";
let startedRoom2 = "tryRoom2";
let counter = 0;
let elevatorCode = "xyz1";
let playerCodeInput = "";
let hasScrewdriver = false;

let currentSceneKey = null;
let previousSceneKey = null;
let currentFloorHallway = "start";

const gameData = {
	start: {
		img: "background/hallway1.jpg",
		text: `You exit the elevator, closer than ever to the top now.<br/><br/>
			   You feel the tension in the air as you get ever closer to the top..<br/><br/>
			   The dimly lit hallway stretches before you. Each door looks identical, but danger could be hiding behind any one of them. <br/><br/>
			   Which door do you enter?`,
		options: [
			{
				text: "Open door 1",
				next: () => startedRoom1,
				action: () => { startedRoom1 = "tryRoom1"; }
			},
			{ text: "Open door 2", next: "tryRoom2" },
			{ text: "Enter the elevator", next: "elevator" }
		]
	},

	tryRoom1: {
		img: "background/cafeteria.jpg",
		text: `You try the door and it opens.<br/><br/>
			   The room inside is a cafeteria. Its eerily quiet. There is no one in sight<br/><br/>
			   I think we should look around for clues.`,
		options: [
			{ text: "Search the cafeteria", next: "inspectRoom1" },
			{ text: "Go back to hallway", next: "start" }
		]
	},

	inspectRoom1: {
		img: "background/cafeteria.jpg",
		text: `You find a hidden door at the back of the room. But it's locked and says "DO NOT ENTER, DOOR ARMED!"<br/><br/>
			   You can either go back or take the risk to try to disarm the trap.<br/><br/>
			   This may not end well...`,
		options: [
			{ text: "Go back", next: () => previousSceneKey },
			{ text: "Try to disarm the trap", next: "disarmTrap" }
		]
	},

	disarmTrap: {
		img: "background/door.jpg",
		text: ``,
		options: [],
		action: () => {
			let dots = 1;
			let totalCycles = 0;
			const maxCycles = 3;
			const animation = setInterval(() => {
				if (totalCycles >= maxCycles) {
					clearInterval(animation);
					const success = Math.random() < 0.5;
					showScene(success ? "nextLevel" : "gameOver");
					return;
				}
				const dotStr = ".".repeat(dots);
				tw = new TypeWriter("dialogue", `Disarming${dotStr}`);
				tw.start();
				dots = (dots % 3) + 1;
				totalCycles++;
			}, 1000);
		}
	},

	tryRoom2: {
		img: "background/desk.jpg",
		text: `You enter what appears to be an office.<br/><br/>
			   Papers are scattered across the desk, and the room has an unsettling silence.<br/><br/>
			   What do you do?`,
		options: [
			{ text: "Inspect the desk", next: "deskSearch" },
			{ text: "Go back to hallway", next: "start" }
		]
	},

	deskSearch: {
		img: "background/desk.jpg",
		text: `You carefully look through the papers and boxs on the desk and you notice a small drawer. You try to open it but its locked.<br/><br/>
			   There could be a tool nearby that could help you get it open. You need to keep searching to find it.`,
		options: [
			{
				text: "Search the room",
				next: "foundScrewdriver",  // Moves to the next scene where screwdriver is found
				action: () => {
					// Check if the screwdriver is already in inventory
					if (!hasScrewdriver) {
						playerInventory.addItem("screwdriver");
						hasScrewdriver = true;
						tw = new TypeWriter("dialogue", "You found a screwdriver and added it to your inventory.");
						tw.start();
					} else {
						tw = new TypeWriter("dialogue", "You've already searched the room and found the screwdriver.");
						tw.start();
					}
				}
			},
			{
				text: "Try to pick the lock",
				next: "deskMinigame",
				action: () => {
					// Only allow picking the lock if minigame if  the screwdriver is in the inventory
					const hasTool = playerInventory.innerInventory.includes(playerInventory.items["screwdriver"]);
					if (!hasTool) {
						tw = new TypeWriter("dialogue", "You need a screwdriver to pick the lock!");
						tw.start();
						return; // Stops the action if the screwdriver is not in the inventory
					}
				}
			},
			{ text: "Go back", next: "tryRoom2" }
		]
	},
	
	// foundScrewdriver Scene 
	foundScrewdriver: {
		img: "background/desk.jpg",
		text: `You search the desk and find what appears to be a screwdriver hidden away behind some papers. This might help open the locked drawer.<br/><br/>
			   Now you can try to open the drawer.`,
		options: [
			{
				text: "Try to pick the lock",
				next: "deskMinigame", // Goes to the lockpicking minigame
				action: () => {
					// Check if the screwdriver is in the inventory before allowing the player tod do the minigame
					const hasTool = playerInventory.innerInventory.includes(playerInventory.items["screwdriver"]);
					if (!hasTool) {
						tw = new TypeWriter("dialogue", "You need a screwdriver to pick the lock!");
						tw.start();
						return; // Prevents the player starting the mini game if no screwdriver is in inventory
					}
				}
			},
			{ text: "Go back to the office", next: "tryRoom2" }
		]
	},
	
	// deskMinigame Scene
	deskMinigame: {
		img: "background/desk.jpg",
		text: `You kneel down to begin to pick the lock...<br/><br/>`,
		options: [
			{
				text: "Start lock Picking Challenge",
				action: () => {
					const selected = playerInventory.getSelectedItem();
					const hasTool =
						playerInventory.innerInventory.includes(playerInventory.items["screwdriver"]) ||
						selected === "screwdriver";
					if (!hasTool) {
						tw = new TypeWriter("dialogue", "You need a screwdriver to pick the lock!");
						tw.start();
						return;
					}
					const lockMinigame = new MinigameJack(
						["twist", "click", "slide"],
						document.getElementById("minigame-input"),
						document.getElementById("minigame-popup"),
						document.getElementById("minigame-outcome"),
						document.getElementById("minigame-bar"),
						document.getElementById("minigame-instruction")
					);
					lockMinigame.startMinigame1({
						next: "deskUnlocked",
						fail: "deskFailed"
					});
				}
			},
			{ text: "Go back to office", next: "tryRoom2" }
		]
	},
	
	// deskFailed Scene 
	deskFailed: {
		img: "background/desk.jpg",
		text: `You failed to pick the lock.<br/><br/>Please try again.`,
		options: [
			{ text: "Try again", next: "deskMinigame" },
			{ text: "Go back to office", next: "tryRoom2" }
		]
	},
	
	deskUnlocked: {
		img: "background/desk.jpg",
		text: `Click! The drawer unlocks, revealing a note stuck to the inside...<br/><br/>
		       Scribbled in red ink is a strange sequence of characters: <b>xyz1</b><br/><br/>
		       What could this be used for? Maybe it's a code? But for what?<br/>
		       Maybe... the elevator?`,
		noTypewriter: true,
		options: [
			{ text: "Go back to hallway", next: "start" }
		],
		action: () => {
			elevatorCode = "xyz1";
		}
	},

	elevator: {
		img: "background/elevators.jpg",
		text: `You enter the elevator.<br/><br/>
			   As you enter the elevator, you take a deep breath.<br/><br/>
			   You see the buttons for the floors, you know you are a step closer to the top and finding out the truth but what if im not ready?<br/><br/>
			   Please enter the code to reach the next level:`,
		options: [
			{ text: "Enter the code", next: "checkElevatorCode" },
			{ text: "Go back to hallway", next: "start" }
		]
	},

	checkElevatorCode: {
		img: "background/elevators.jpg",
		text: `You are asked to enter the code. Please type the code to proceed.`,
		options: [
			{ text: "Submit code", next: "submitElevatorCode" },
			{ text: "Go back to hallway", next: "start" }
		],
		action: () => {
			if (!document.getElementById("codeInput")) {
				const inputField = document.createElement("input");
				inputField.type = "text";
				inputField.placeholder = "Enter code...";
				inputField.id = "codeInput";
				inputField.addEventListener("input", handleElevatorCodeInput);
				optionsDiv.appendChild(inputField);
			}
		}
	},

	submitElevatorCode: {
		img: "background/elevators.jpg",
		text: () => `You entered: ${playerCodeInput}.<br/><br/>
			${playerCodeInput === elevatorCode ? "Correct! You have ascended to level 5." : "Incorrect! Please try again."}`,
		options: [
			{
				text: () => (playerCodeInput === elevatorCode ? "Proceed to Level 5" : "Try Again"),
				next: () => {
					if (playerCodeInput === elevatorCode) {
						currentFloorHallway = "floor5_start";
					}
					return playerCodeInput === elevatorCode ? "nextLevel" : "checkElevatorCode";
				},
				action: () => {
					if (playerCodeInput === elevatorCode) {
						playerCodeInput = "";
						const inputField = document.getElementById("codeInput");
						if (inputField) inputField.value = "";
					}
				}
			},
			{ text: "Go back to elevator", next: "elevator" }
		]
	},

	nextLevel: {
		img: "background/elevator.jpg",
		text: `Congratulations! You've reached level 5!`,
		options: [
			{ text: "Exit the elevator", next: "floor5.html" }] // add next level to connect the floors
	},

	gameOver: {
		text: `You failed to disarm the trap.<br/><br/>Game Over!`,
		options: [{ text: "Try Again", next: "start" }] // add game over scene showing stats
	}
};

// DOM Logic
let pageStartTime = Date.now();
let totalPlayTime = parseFloat(localStorage.getItem("playerTime")) || 0;
let backgroundImg = document.getElementById("image");
const storyText = document.getElementById("dialogue");
const optionsDiv = document.getElementById("options");
let tw;

const playerInventory = new inventory();
playerInventory.renderInventory();

let currentFloor = document.getElementById("floor4");
currentFloor.style.backgroundColor = "#03A062";

function handleElevatorCodeInput(event) {
	playerCodeInput = event.target.value.trim();
}

function setUpUseButton() {
	document.getElementById("useButton").addEventListener("click", () => {
		const selectedItem = playerInventory.getSelectedItem();
		if (selectedItem != null) {
			alert(`You selected: ${selectedItem}`);
			playerInventory.useItem(selectedItem);
		} else {
			alert("No item selected.");
		}
	});
}
function startGame() {
	currentFloorHallway = "start";
	showScene("start");
	//load in player inventory
	playerInventory.renderInventory();
	let x = localStorage.getItem("sessionId");
	updateUserFloorInDB(x, 4); //update the user floor in the database
}
function getCurrentSessionId() {
	return localStorage.getItem("sessionId");
}

function showScene(sceneKey) {
	//Chris wrote this first if statement
	if(sceneKey == "floor5.html"){
		nextFloor();
	}

	if (!gameData[sceneKey]) {
		console.error(`Scene "${sceneKey}" not found.`);
		return;
	}

	previousSceneKey = currentSceneKey || "start";
	currentSceneKey = sceneKey;

	const scene = gameData[sceneKey];
	backgroundImg.src = "media/" + scene.img;
	optionsDiv.innerHTML = "";

	const resolvedText = typeof scene.text === "function" ? scene.text() : scene.text;
	if (!scene.noTypewriter) {
		tw = new TypeWriter("dialogue", resolvedText);
		tw.start();
	} else {
		document.getElementById("dialogue").innerHTML = resolvedText;
	}

	const resolvedOptions = typeof scene.options === "function" ? scene.options() : scene.options;
	resolvedOptions.forEach((option) => {
		const button = document.createElement("button");
		button.textContent = typeof option.text === "function" ? option.text() : option.text;
		button.onclick = () => nextScene(option);
		optionsDiv.appendChild(button);
	});

	if (scene.action) {
		scene.action();
	}

	console.log("Scene shown →", sceneKey);
}

function nextScene(option) {
	if (!tw.isFinished()) {
		finishTyping();
	} else {
		const nextSceneKey = typeof option.next === "function" ? option.next() : option.next;
		if (option.action) {
			option.action();
		}
		showScene(nextSceneKey);
	}
}
function nextFloor() {
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

	window.location.href = "floor5.html"; // change to next floor
}

setUpUseButton();
startGame();