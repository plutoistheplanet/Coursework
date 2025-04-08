//vars to handle rooms already visited and games already played
let startedRoom1 = "tryRoom1";
let startedRoom2 = "tryRoom2";
let counter = 0;
let significantEventsList = [];
let pageStartTime = Date.now();
let totalPlayTime = parseFloat(localStorage.getItem("playerTime")) || 0;
const gameData = {
	start: {
		img: "hallway2.jpg",
		text: `You exit the elevator, closer than ever to the top now.<br/><br/>
                You see two doors in front of you, as you hear screams echo from above...<br/><br/>
                Which door do you  enter?`,
		options: [
			{
				text: "Open door 1",
				next: () => startedRoom1,
				action: () => {
					startedRoom1 = "room1";
				},
			},
			{ text: "Open door 2", next: "tryRoom2" },
			{ text: "Enter the elevator", next: "elevator" },
		],
	},
	floor: {
		img: "hallway2.jpg",
		text: `You return to the the hallway.<br/><br/>
                You see two doors in front of you.<br/><br/>
                Which door do you  enter?`,
		options: [
			{
				text: "Open door 1",
				next: () => startedRoom1,
				action: () => {
					startedRoom1 = "room1";
				},
			},
			{
				text: "Open door 2",
				next: () => startedRoom2,
				action: () => {
					startedRoom2 = "room2Two";
				},
			},
			{ text: "Return to elevator", next: "elevator" },
		],
	},
	//#region room1
	tryRoom1: {
		img: "darkRoom2.jpg",
		text: `You try the door and it opens.<br/><br/>
                The room inside is dark and seems empty.<br/><br/>
				Wait, did that shadow move?<br/><br/>
                Enter the room?`,
		options: [
			{ text: "Enter the room?", next: "startRoom1" },
			{
				text: "Ignore the room",
				next: "floor",
				action: () => {
					startedRoom1 = "tryRoom1";
				},
			},
		],
	},
	startRoom1: {
		img: "darkRoomMan.jpg",
		text: `You enter the room.<br/><br/>
                You see a light switch and flip it.<br/><br/>
                Now you see, you are not alone here.<br/><br/>
				There is a wounded man slumped in the corner.<br/><br/>
                Do you approach him?`,
		options: [
			{
				text: "Approach the man",
				next: "manApproached",
			},
			{ text: "Leave the room", next: "floor" },
		],
	},
	manApproached: {
		img: "darkRoomMan.jpg",
		text: `You see that he is gravely wounded.<br/><br/>
		He speaks to you: "You must do what I could not, and reach the final floor..."<br/><br/>
	 	"Don't let this corporation hurt anyone else."<br/><br/>
		You see that he is holding an energy can, the only thing keeping him alive.<br/><br/>
        Do you take it from him and leave or leave him be? (+1 Energy Can)`,
		options: [
			{
				text: "Take the energy can",
				next: "floor",
				significantChoice: "You stole the wounded mans last hope...",
				item: "can", //chnage to medpack later
			},
			{ text: "Leave the room", next: "floor" },
		],
	},
	//this is if the user has lready been in room one and is returning
	room1: {
		img: "darkRoomMan.jpg",
		text: `You examine the rest of the room.<br/><br/>
                The man is where you left him.<br/><br/>
                You think its better to leave.`,
		options: [{ text: "Leave the room", next: "floor" }],
	},
	//#endregion

	//#region Room two
	tryRoom2: {
		img: "roomBookshelves.jpg",
		text: `You try the door and it's stuck.<br/><br/>
				You push harder and the door swings open violently.<br/><br/>
				You step inside the storage area just as the shelves start to give way and things start falling.<br/><br/>`,
		options: [
			{
				text: "Catch what you can",
				next: "room2",
				minigame: "catch",
			},
		],
	},
	room2: {
		img: "roomBookshelves.jpg",
		text: `You managed to catch an energy can during the frenzy (+1 Energy Can).<br/><br/>
	           You look around and see the room is mostly empty.<br/><br/>
	            Time to move on.<br/><br/>`,
		options: [
			{
				text: "Leave the room",
				item: "can", //chnage to medpack later
				next: "floor",
				action: () => {
					startedRoom2 = "room2Two";
				},
			},
		],
	},
	room2Two: {
		img: "roomBookshelves.jpg",
		text: `You look around and see the room is mostly empty.<br/><br/>
	            Time to move on.<br/><br/>`,
		options: [{ text: "Leave the room", next: "floor" }],
	},
	//#endregion

	//#region elevator
	elevator: {
		img: "elevatorinside.jpg",
		text: `You enter the elevator.<br/><br/>
                As you enter the screams grow louder and louder.<br/><br/>
				You see the buttons for the floors.<br/><br/>`,
		options: [
			{ text: "Ascend to the final floor", next: "nextFloor" }, //next floor logic just need to link it to the next html page
			{ text: "Return to the hallway", next: "start" },
			{ text: "Go back to floor one and run", next: "cowardsEnding" },
		],
	},
	cowardsEnding: {
		img: "elevatorinside.jpg",
		text: `Your hand trembles as your finger hovers over your escape.<br/><br/>
                You will be known as a coward for the rest of your days.<br/><br/>
                But the screams are so loud...<br/><br/>
                Do you run?`,
		options: [
			{
				text: "Yes",
				next: "gameOver",
				significantChoice: "You cowardly ran when you were so close-",
			}, //cowards ending go to finish game sequence
			{ text: "No", next: "start" },
		],
	},
	//#endregion
};
let backgroundImg = document.getElementById("image");

const storyText = document.getElementById("dialogue");
const optionsDiv = document.getElementById("options");

let tw; //an instance of the typewriter

const playerInventory = new inventory();
playerInventory.renderInventory();

let currentFloor = document.getElementById("floor5"); //shows map position
currentFloor.style.backgroundColor = "#03A062";

function setUpUseButton() {
	document.getElementById("useButton").addEventListener("click", () => {
		const selectedItem = playerInventory.getSelectedItem();
		console.log(selectedItem);
		if (selectedItem != null) {
			alert(`You selected: ${selectedItem}`);
			playerInventory.useItem(selectedItem);
		} else {
			alert("No item selected.");
		}
	});
}

function startGame() {
	localStorage.setItem("levelReached", "Floor: 5");
	showScene("start");
	//load in player inventory
	playerInventory.renderInventory();
	let x = localStorage.getItem("sessionId");
	updateUserFloorInDB(x, 5); //update the user floor in the database
}


function getCurrentSessionId() {
	return localStorage.getItem("sessionId");
}

function showScene(sceneKey) {
	const scene = gameData[sceneKey];
	backgroundImg.src = "media/background/" + scene.img;
	tw = new TypeWriter("dialogue", scene.text);
	tw.start();
	optionsDiv.innerHTML = "";
	scene.options.forEach((option) => {
		const button = document.createElement("button");
		button.textContent = option.text;
		button.onclick = () => nextScene(option);
		optionsDiv.appendChild(button);
	});
}
function nextScene(option) {
	console.log(option.img);
	console.log(option.next);
	console.log(option.item);
	console.log(option.minigame);

	if (tw.isFinished() == false) {
		finishTyping();
	} else {
		if (option.next == "nextFloor") {
			nextFloor();
		}
		if (option.next == "gameOver") {
			gameOver();
		}
		if (option.item) {
			playerInventory.addItem(option.item); //add item to inventory
		}
		if (option.minigame) {
			console.log("if option.minigame");
			startMinigame(option); //trigger minigame
			return; //exit after starting the minigame
		}
		//the only soloution i could find to stroe/check wether the player had been in room1 before was scene keys whhich is just the same as the next but in a var
		const nextSceneKey = typeof option.next === "function" ? option.next() : option.next;

		if (option.action) {
			option.action();
		}
		showScene(nextSceneKey);

		if (option.significantChoice != null) {
			significantEventsList.push(option.significantChoice);
			console.log(significantEventsList);
		}
	}
}

//link the js file called util.js for DB connectivity
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

	window.location.href = "floor6.html"; // change to next floor
}
function gameOver() {
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
	window.location.href = "stats.html"; //change to game stats page
}

function next(next) {
	showScene(option.next);
}
function finishMinigame(option) {
	showScene(option.next);
}
//#region mingame
function startMinigame(option) {
	counter = counter + 1;
	if (option.minigame == "catch" && counter == 1) {
		//#region catch minigame
		//Based of my catch game in the week 4 fandom bonus level
		//popup window for the minigame
		const popup = document.createElement("div");
		popup.style.position = "fixed";
		popup.style.top = "50%";
		popup.style.left = "50%";
		popup.style.transform = "translate(-50%, -50%)";
		popup.style.width = "500px";
		popup.style.height = "600px";
		popup.style.backgroundColor = "#222";
		popup.style.border = "2px solid #03A062";
		popup.style.color = "#0f0";
		popup.style.padding = "10px";
		popup.style.zIndex = 9999;
		popup.style.display = "flex";
		popup.style.flexDirection = "column";
		popup.style.alignItems = "center";
		popup.style.justifyContent = "flex-start";
		document.body.appendChild(popup);

		//title
		const title = document.createElement("div");
		title.textContent = "Catch what you can!";
		title.style.fontFamily = "AppleChicagoFont";
		title.style.fontSize = "20px";
		title.style.color = "#03A062";
		title.style.backgroundColor = "#222";
		title.style.marginBottom = "10px";
		title.style.textAlign = "center";
		title.style.width = "100%";
		popup.appendChild(title);

		//game background
		const canvas = document.createElement("canvas");
		canvas.width = 400;
		canvas.height = 500;
		canvas.style.backgroundColor = "#333";
		popup.appendChild(canvas);

		const ctx = canvas.getContext("2d");

		//actual game code
		const basket = { x: 175, y: 450, width: 50, height: 20, speed: 5 };
		let objects = [];
		let score = 0;
		let lives = 1;
		let gameOver = false;
		let keysPressed = { left: false, right: false };

		function createObject() {
			const x = Math.random() * (canvas.width - 30);
			objects.push({ x, y: 0, width: 20, height: 20, speed: 3 });
		}

		function drawBasket() {
			ctx.fillStyle = "grey";
			ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
		}

		function drawObjects() {
			ctx.fillStyle = "darkgrey";
			objects.forEach((obj) => ctx.fillRect(obj.x, obj.y, obj.width, obj.height));
		}

		function updateObjects() {
			objects.forEach((obj, index) => {
				obj.y += obj.speed;
				//if caught
				if (obj.y + obj.height > basket.y && obj.x < basket.x + basket.width && obj.x + obj.width > basket.x) {
					objects.splice(index, 1);
					score++;
				} else if (obj.y > canvas.height) {
					objects.splice(index, 1);
					lives--;
					if (lives === 0) gameOver = true;
				}
			});
		}

		function drawScore() {
			ctx.fillStyle = "black";
			ctx.font = "20px Arial";
			ctx.fillText("Score: " + score, 10, 20);
			ctx.fillText("Lives: " + lives, 10, 40);
		}

		function updateBasketPosition() {
			if (keysPressed.left && basket.x > 0) {
				basket.x -= basket.speed;
			}
			if (keysPressed.right && basket.x + basket.width < canvas.width) {
				basket.x += basket.speed;
			}
		}

		function closeButton() {
			//closde button
			const closeButton = document.createElement("button");
			closeButton.textContent = "Close";
			closeButton.style.fontSize = "30px";
			closeButton.style.font = "AppleChicagoFont";
			closeButton.style.backgroundColor = "#03A062";
			closeButton.style.color = "#222";
			closeButton.style.border = "1px solid #03A062";
			closeButton.style.marginTop = "10px";
			closeButton.onclick = () => {
				document.body.removeChild(popup);
			};
			popup.appendChild(closeButton);
			finishMinigame(option);
		}

		function gameLoop() {
			if (gameOver) {
				ctx.fillStyle = "black";
				ctx.font = "30px Arial";
				ctx.fillText("Game Over", 130, 250);
				//close button
				closeButton();
				return;
			}
			if (score >= 15) {
				ctx.fillStyle = "black";
				ctx.font = "30px Arial";
				ctx.fillText("Well Done!", 130, 250);
				//close button
				closeButton();
				return;
			}
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawBasket();
			drawObjects();
			updateObjects();
			updateBasketPosition();
			drawScore();
			requestAnimationFrame(gameLoop);
		}

		//key press handlers
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("keyup", onKeyUp);

		function onKeyDown(e) {
			if (e.key === "ArrowLeft") keysPressed.left = true;
			if (e.key === "ArrowRight") keysPressed.right = true;
		}

		function onKeyUp(e) {
			if (e.key === "ArrowLeft") keysPressed.left = false;
			if (e.key === "ArrowRight") keysPressed.right = false;
		}

		//spawn intervals
		const spawnInterval = setInterval(createObject, 1000);

		gameLoop();
		//#endregion
	}
}
//#endregion

setUpUseButton();
startGame();
