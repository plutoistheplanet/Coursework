const gameData = {
    start: {
        img: "hallway1.jpg",
        text: `You exit the elevator, beginning your journey through the tower.<br/><br/>
                Infront of you is a hallway with three doors...<br/><br/>
                Enter the first room`,
        options: [
            { text: "Open door 1", next: "tryRoom1" },
        ]
    },
    floor: {
        img: "hallway1.jpg",
        text: `You return to the the hallway.<br/><br/>
                Infront of you is the hallway with three doors...<br/><br/>
                Which door do you pick?`,
        options: [
            { text: "Open door 1", next: "room1" },
            { text: "Open door 2", next: "tryRoom2WithoutKey" },
            { text: "Open door 3", next: "tryRoom3" },
        ]
    },
    floorNoHack: {
        img: "hallway1.jpg",
        text: `You return to the the hallway.<br/><br/>
                Infront of you is the hallway with three doors...<br/><br/>
                Which door do you pick?`,
        options: [
            { text: "Open door 1", next: "tryRoom1" },
            { text: "Open door 2", next: "tryRoom2WithoutKey" },
            { text: "Open door 3", next: "tryRoom3" },
        ]
    },
    tryRoom1: {
        img: "computerRoom.jpg",
        text: `You try the door and it opens.<br/><br/>
                The room inside is a stereotypical open plan office.<br/><br/>
                Enter the room?`,
        options: [
            { text: "Enter the room?", next: "startRoom1" },
            { text: "Ignore the room", next: "floor" }
        ]
    },
    startRoom1: {
        img: "computer.jpg",
        text: `You enter the room.<br/><br/>
                You spy that one of the computers is turned on.<br/><br/>
                You sit down and are prompted for a password..<br/><br/>
                Hack the system?`,
        options: [
            { text: "Hack the system?", next: "room1Computer", minigame: "hackcomputer", fail: "room1ComputerFail" },
            { text: "Leave the room", next: "startFloor" }
        ]
    },
    room1ComputerFail: {
        img: "computer.jpg",
        text: `You failed your initial hack.<br/><br/>
        Try hack again?`,
        options: [
            { text: "Hack the system again", next: "room1Computer", minigame: "hackcomputer" },
            { text: "Leave the room", next: "floorNoHack" }
        ]
    },
    room1: {
        img: "computerRoom.jpg",
        text: `The computer sits where you left it.<br/><br/>
                Use computer again?`,
        options: [
            { text: "Use computer", next: "room1Computer" },
            { text: "Leave the room", next: "floor" }
        ]
    },
    room1Computer: {
        img: "computer.jpg",
        text: `You browse the file explorer hoping to find sommething of note.<br/><br/>
                You find 3 files.<br/><br/>
                Select a file`,
        options: [
            { text: "bigBadSecretPlans.txt", next: "room1ComputerReturn", document: "bigBadSecretPlans.txt"},
            { text: "IMPORTANTforCompanyEyesONLY.txt", next: "room1ComputerReturn", document: "IMPORTANTforCompanyEyesONLY.txt"},
            { text: "secretIngredient.txt", next: "room1ComputerReturn", document: "secretIngredient.txt"},
            { text: "Exit computer and leave room", next: "floor"}
        ]
    },





    tryRoom3: {
        img: "empytyRoom.jpg",
        text: `You try the door and it swings open.<br/><br/>
                Enter the room?`,
        options: [
            { text: "Enter room", next: "startRoom3" },
            { text: "Ignore the room", next: "floor" }
        ]
    },
    startRoom3: {
        img: "emptyRoom.jpg",
        text: `The room is empty, apart from a man rifling through a drawer in the corner.<br/><br/>
        He hasn't noticed your presence.<br/><br/>
        Move closer?`,
        options: [
            { text: "Move closer", next: "talkToMan1" },
            { text: "Leave room", next: "floor" }
        ]
    },
    talkToMan1: {
        img: "man1.jpg",
        text: `You walk up behind him.<br/><br/>
        Man: Where is it!?<br/><br/>
        Speak to the man?`,
        options: [
            { text: "What are you looking for?", next: "getSecretIngredientQuest" },
            { text: "What's your name?", next: "introduceName" }
        ]
    },
    getSecretIngredientQuest: {
        img: "man1.jpg",
        text: `"I'm looking for secret the secret ingredient of a Creme Brulee."<br/><br/>
        "My colleague Jim hid it from me!"<br/><br/>`,
        options: [
            { text: "Where do you think it is?", next: "getSecretIngredientQuest2" }
        ]
    },
    getSecretIngredientQuest2: {
        img: "man2.jpg",
        text: `"The only other room I haven't checked is Room 2."<br/><br/>
        "Take this key to open the door."<br/><br/>
        "Go and find it there and I'll let you go to the next Floor."`,
        options: [
            { text: "Accept quest and leave", next: "floorAfterQuest", item: "key" }
        ]
    },
    introduceName: {
        img: "man1.jpg",
        text: `He jumped as you spoke.<br/><br/>
        "You startled me!<br/><br/>"
        "I'm Bill. Would you be able to help me find something?<br/><br/>`,
        options: [
            { text: "What are you looking for?", next: "getSecretIngredientQuest" },
        ]
    },
    room3: {
        img: "manBookshelf.jpg",
        text: `You return to the room.<br/><br/>
                Bill is waiting for you. <br/><br/>
                Talk to Bill?`,
        options: [
            { text: "Talk to Bill?", next: "room3CheckForItem" },
            { text: "Leave the room", next: "floorAfterQuest" }
        ]
    },
    room3CheckForItem: {
        img: "manBookshelf (2).jpg",
        text: `Bill: So he returns?!<br/><br/>
        Bill: Do you have the secret ingredient?`,
        options: [
            { text: "Give secret ingredient", next: "itemGiven", itemRequired: "secretIngredient", itemRequiredNull: "comeBackWhenItem"},
            { text: "Leave the room", next: "floorAfterQuest" }
        ]
    },
    itemGiven: {
        img: "elevators.jpg",
        text: `I'll take you to the next floor.`,
        options: [
            { text: "Follow him.", next: "nextFloor"}
        ]
    },
    comeBackWhenItem: {
        img:"manBookshelf (2).jpg",
        text: `Bill: So he returns?!<br/><br/>
        Bill: Come back when you have the item.`,
        options: [
            { text: "Leave the room", next: "floorAfterQuest" }
        ]
    },
    floorAfterQuest: {
        img: "hallway1.jpg",
        text: `You return to the the hallway.<br/><br/>
                You're once again met with 3 doors.<br/><br/>
                Which door do you pick?`,
        options: [
            { text: "Open door 1", next: "room1" },
            { text: "Open door 2", next: "tryRoom2WithKey" },
            { text: "Open door 3", next: "room3" },
        ]
    },

    tryRoom2WithoutKey: {
        img: "hallway1.jpg",
        text: `You try the handle<br/><br/>
                The door is locked.<br/><br/>
                Maybe a key is in one of the other rooms...`,
        options: [
            { text: "Return to hallway", next: "floor" },
        ]
    },
    tryRoom2WithKey: {
        img: "hallway1.jpg",
        text: `You try the handle<br/><br/>
                The door is locked<br/><br/>
                Use key?`,
        options: [
            { text: "Use key", next: "room2", itemRequired: "key" },
            { text: "Ignore the room", next: "floorAfterQuest" }
        ]
    },
    room2: {
        img: "man1.jpg",
        text: `You enter the room.<br/><br/>
        A man sits in the centre clutching a piece of paper with the words "Secret Ingredient" written on the back.<br/><br/>
        Talk to the man...`,
        options: [
            { text: "Can I have the secret ingredient?", next: "room2Option1" },
            { text: "Give me the paper!", next: "room2Option1" }
        ]
    },
    room2Option1: {
        img: "man2.jpg",
        text: `Man: NO!<br/><br/>
        Man: You'll never make the perfect Creme Brulee!<br/><br/>
        Unless you have the passcode hidden in room 1...<br/><br/>
        Enter the first digit of the passcode.`,
        options: [
            { text: "1", next: "incorrect" },
            { text: "6", next: "digit2" },
            { text: "3", next: "incorrect" },
            { text: "2", next: "incorrect" }
        ]
    },
    digit1: {
        img: "man2.jpg",
        text: `Enter the first digit of the passcode.`,
        options: [
            { text: "1", next: "incorrect" },
            { text: "6", next: "digit2" },
            { text: "3", next: "incorrect" },
            { text: "2", next: "incorrect" }
        ]
    },
    digit2: {
        img: "man1.jpg",
        text: `Man: Lucky guess!<br/><br/>
        Enter the second digit of the passcode.`,
        options: [
            { text: "9", next: "digit3" },
            { text: "2", next: "incorrect" },
            { text: "1", next: "incorrect" },
            { text: "7", next: "incorrect" }
        ]
    },
    digit3:{
        img: "man2.jpg",
        text: `Man: An even luckier guess!<br/><br/>
        Enter the third digit of the passcode.`,
        options: [
            { text: "1", next: "incorrect" },
            { text: "0", next: "incorrect" },
            { text: "3", next: "digit4" },
            { text: "9", next: "incorrect" }
        ]
    },
    digit4:{ 
        img: "man1.jpg",
        text: `Man: That was the luckiest guess possible!<br/><br/>
        Enter the last digit of the passcode.`,
        options: [
            { text: "3", next: "incorrect" },
            { text: "6", next: "incorrect" },
            { text: "8", next: "incorrect" },
            { text: "0", next: "completed" }
        ]
    },
    incorrect: {
        img: "man2.jpg",
        text: `Man: INCORRECT!<br/><br/>
        Come back when you know the passcode!<br/><br/>
        It's hidden on this floor.`,
        options: [
            { text: "Retry", next: "digit1"},
            { text: "Go back to floor"}
        ]
    },
    floorBeforeQuestComplete: {
        img: "hallway1.jpg",
        text: `You return to the the hallway.<br/><br/>
                You're once again met with 3 doors.<br/><br/>
                Which door do you pick?`,
        options: [
            { text: "Open door 1", next: "Room1Complete" },
            { text: "Open door 2", next: "Room2Complete" },
            { text: "Open door 3", next: "room3" },
        ]
    },
    completed:{
        img: "man1.jpg",
        text: `Man: Fine...<br/><br/>
        The man drops the paper as he walks out of the room.<br/><br/>
        Pickup the paper?`,
        options: [
            { text: "Pickup the paper", next: "room2PickupPaper" },
        ]
    },
    room2PickupPaper:{
        img: "hallwayStorage.jpg",
        text: `You have now aquired an item.<br/><br/>
        To use the item, drag it into the item box and press Use.`,
        options: [
            { text: "Leave room", next: "floorAfterQuestComplete", item: "secretIngredient" },
        ]
    },
    floorAfterQuestComplete: {
        img: "hallway1.jpg",
        text: `You return to the the hallway.<br/><br/>
                You're once again met with 3 doors.<br/><br/>
                Which door do you pick?`,
        options: [
            { text: "Open door 1", next: "room1Complete" },
            { text: "Open door 2", next: "room2Complete" },
            { text: "Open door 3", next: "room3" },
        ]
    },
    room1Complete:{
        img: "hallway1.jpg",
        text:`You've already done everything in this room.<br/><br/>
        Return to hallway?`,
        options: [
            { text: "Return to hallway", next: "floorAfterQuestComplete" }
        ]
    },
    room2Complete:{
        img: "hallway1.jpg",
        text:`You've already done everything in this room.<br/><br/>
        Return to hallway?`,
        options: [
            { text: "Return to hallway", next: "floorAfterQuestComplete" }
        ]
    },
    room3Complete:{
        img: "hallway1.jpg",
        text:`You've already done everything in this room.<br/><br/>
        Return to hallway?`,
        options: [
            { text: "Return to hallway", next: "floorAfterQuestComplete" }
        ]
    }
};

let pageStartTime = Date.now();
let totalPlayTime = parseFloat(localStorage.getItem("playerTime")) || 0;
let backgroundImg = document.getElementById("image");

const storyText = document.getElementById("dialogue");
const optionsDiv = document.getElementById("options");

let tw; //an instance of the typewriter

const playerInventory = new inventory();
playerInventory.renderInventory();

let currentFloor = document.getElementById("floor1");//shows map position
currentFloor.style.backgroundColor = "#03A062";

function setUpUseButton(){
    document.getElementById("useButton").addEventListener("click", () => {
    const selectedItem = playerInventory.getSelectedItem();
    if(selectedItem != null) {
        playerInventory.useItem(selectedItem);
    } 
    else {
        alert("No item selected.");
    }
    });
}

function startGame() {
	showScene("start");
	//load in player inventory
	playerInventory.renderInventory();
	let x = localStorage.getItem("sessionId");
	updateUserFloorInDB(x, 1); //update the user floor in the database
}
function getCurrentSessionId() {
	return localStorage.getItem("sessionId");
}


function showScene(sceneKey) {
    const scene = gameData[sceneKey];
    console.log(scene.img);
    document.getElementById("image").src = "media/background/" + scene.img;
    //backgroundImg.src = "/media/background/" + scene.img;
    tw = new TypeWriter("dialogue", scene.text);
    tw.start();
    optionsDiv.innerHTML = "";
    scene.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = () => nextScene(option);
        optionsDiv.appendChild(button);
    });
}
function nextScene(option){
    if(tw.isFinished() == false){
        finishTyping();
    }
    else{
        if(option.next == "nextFloor"){
            nextFloor();
        }
        if(option.item) {
            playerInventory.addItem(option.item);  // Add item to inventory
        }
        if(option.itemRequired){
            if(playerInventory.findItem(option.itemRequired)){
                showScene(option.next);
            }
            else{
                showScene(option.itemRequiredNull);
            }
        }
        if(option.significantEvent){
            //add to list of significant choices.
        }
        if(option.document){
            openDocument(option);
        }
        if (option.minigame) {
            clearButtons(option.next);
            startMinigame(option);
            //the actual minigame should call next() to trigger next scene when game is finished
        }
        else{
            showScene(option.next);
        }
    }    
}
function clearButtons(sceneKey){
    const scene = gameData[sceneKey];
    optionsDiv.innerHTML = "";
    scene.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option.text;
        optionsDiv.appendChild(button);
    });
}
function next(next){
    showScene(option.next);
}
function openDocument(option){
    const document = new gameDocument(option);
    document.startPopup();
}
function startMinigame(option){
    if(option.minigame == "hackcomputer"){
        const minigame = new Minigame(["open terminal", "bypass firewall", "unlock computer"],
        "Access granted<br/><br/>Opening file explorer...",
        "Access denied.<br/><br/>",
        document.getElementById("userInput"),
        document.getElementById("popup"),
        document.getElementById("outcome"),
        document.getElementById("myBar"),
        document.getElementById("instruction-text")
        );
        minigame.startMinigame1(option);
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

	window.location.href = "floor2.html"; // change to next floor
}



setUpUseButton();
startGame();