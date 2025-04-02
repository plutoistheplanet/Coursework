
const gameData = {
    start: {
        img: "floorEntrance.jpg",
        text: `The elevator suddenly grinds to a halt.<br/><br/>
                A panel unfolds out of a wall, revealing a touchscreen that tells you that a password is required to go further.<br/><br/>
                With no other options, you step out of the elevator and examine the doors of the hallway...`,
        options: [
            { text: "Open the first door", next: "tryRoom1" },
            { text: "Open the second door", next: "tryRoom2" },

        ]
    },
    floor: {
        img: "floorEntrance.jpg",
        text: `You return to the hallway.<br/><br/>
                In front of you is a hallway with two doors...<br/><br/>
                Which door do you pick?`,
        options: [
            { text: "Open the first door", next: "tryRoom1" },
            { text: "Open the second door", next: "tryRoom2" },
            { text: "Return to the elevator", next: "elevator" },
        ]
    },
    floorAttack: {
        img: "floorEntrance.jpg",
        text: `You return to the hallway.<br/><br/>
                In front of you is a hallway with three doors...<br/><br/>
                Which door do you pick?`,
        options: [
            { text: "Open the first door", next: "tryRoom1Attack" },
            { text: "Open the second door", next: "tryRoom2Attack" },
            { text: "Return to the elevator", next: "elevator" },
        ]
    },
    tryRoom1: {
        img: "computerRoom.jpg",
        text: `You try the door, a metal one with frosted glass, and it opens quietly<br/><br/>
                The room inside looks to be a security room, with a guard watching an array of monitors...<br/><br/>
                Enter the room?`,
        options: [
            { text: "Enter the room", next: "startRoom1" },
            { text: "Ignore the room", next: "floor" }
        ]
    },
    tryRoom1Attack: {
        img: "computerRoom.jpg",
        text: `You try the door, a metal one with frosted glass, and it opens quietly<br/><br/>
                The room inside looks to be a security room, with the guard slumped over a desk...<br/><br/>
                Enter the room?`,
        options: [
            { text: "Enter the room", next: "startRoom1Attack" },
            { text: "Ignore the room", next: "floor" }
        ]
    },
    startRoom1: {
        img: "computerRoom.jpg",
        text: `You enter the room, carefully shutting the door behind you...<br/><br/>
                The guard seems to be engrossed with headphones and a video on another monitor. He hasn't noticed your entrance.<br/><br/>
                There are several places in the room where you might find items of interest...<br/><br/>
                What do you do?`,
        options: [
            { text: "Attack the guard", next: "room1Attack", significantEvent: "attacked guard" },
            { text: "Check the filing cabinet", next: "room1Cabinet"},
            { text: "Check the desk", next: "room1Desk"},
            { text: "Leave the room", next: "floor" }
        ]
    },
    startRoom1Attack: {
        img: "computerRoom.jpg",
        text: `You enter the room, carefully shutting the door behind you...<br/><br/>
                The guard is still slumped over the desk. He doesn't move.<br/><br/>
                There are several places in the room where you might find items of interest...<br/><br/>
                What do you do?`,
        options: [
            { text: "Check the filing cabinet", next: "room1CabinetAttack"},
            { text: "Check the desk", next: "room1DeskAttack"},
            { text: "Leave the room", next: "floorAttack" }
        ]
    },
    room1Attack: {
        img: "computerRoom.jpg",
        text: `You leap at the guard and with a flurry of fists, you bring him down!<br/><br/>
        Now he definitely won't be a threat.`,
        options: [
            { text: "Check the filing cabinet", next: "room1CabinetAttack"},
            { text: "Check the desk", next: "room1DeskAttack"},
            { text: "Leave the room", next: "floorAttack" }
        ]
    },
    room1Cabinet: {
        img: "computerRoom.jpg",
        text: `Inside the cabinet you find a small medkit.<br/><br/>
                Sadly, it seems everything but the bandages has already been used..<br/><br/>
                `,
        options: [
            { text: "Check the desk", next: "room1Desk" },
            { text: "Take the bandages", next: "room1CabinetTake", item: "bandage"},
            { text: "Leave the room", next: "floor" }
        ]
    },
    room1CabinetAttack: {
        img: "computerRoom.jpg",
        text: `Inside the cabinet you find a small medkit.<br/><br/>
                Sadly, it seems everything but the bandages has already been used..<br/><br/>
                `,
        options: [
            { text: "Check the desk", next: "room1DeskAttack" },
            { text: "Take the bandages", next: "room1CabinetTakeAttack", item: "bandage"},
            { text: "Leave the room", next: "floorAttack" }
        ]
    },

    room1CabinetTake: {
        img: "computerRoom.jpg",
        text: `You take the bandages.<br/><br/>`,
        options: [
            { text: "Check the desk", next: "room1Desk" },
            { text: "Leave the room", next: "floor" }
        ]
    },

    room1CabinetTakeAttack: {
        img: "computerRoom.jpg",
        text: `You take the bandages.<br/><br/>`,
        options: [
            { text: "Check the desk", next: "room1DeskAttack" },
            { text: "Leave the room", next: "floorAttack" }
        ]
    },

    room1Desk: {
        img: "computerRoom.jpg",
        text: `You open the desk and find a ripped piece of paper.<br/><br/>`,
        options: [
            { text: "Take the page", next: "room1DeskTake", item: "paper1"},
            { text: "Check the cabinet", next: "room1Cabinet"},
            { text: "Leave the room", next: "floor"}
        ]
    },

    room1DeskAttack: {
        img: "computerRoom.jpg",
        text: `You open the desk and find a ripped piece of paper.<br/><br/>`,
        options: [
            { text: "Take the page", next: "room1DeskTakeAttack", item: "paper1"},
            { text: "Check the cabinet", next: "room1CabinetAttack"},
            { text: "Leave the room", next: "floorAttack"}
        ]
    },

    room1DeskTake: {
        img: "computerRoom.jpg",
        text: `You take the paper and read it. <br/><br/>
        It appears to be the left half of the password: "xy"`,
        options: [
            { text: "Check the cabinet", next: "room1Cabinet"},
            { text: "Leave the room", next: "floor"}
        ]
    },
    room1DeskTakeAttack: {
        img: "computerRoom.jpg",
        text: `You take the paper and read it. <br/><br/>
        It appears to be the left half of the password: "xy"`,
        options: [
            { text: "Check the cabinet", next: "room1CabinetAttack"},
            { text: "Leave the room", next: "floorAttack"}
        ]
    },
    tryRoom2: {
        img: "hallwayStorage.jpg",
        text: `You open the door, leading into what looks like a storage room...<br/><br/>
                Step inside?`,
        options: [
            { text: "Enter the room", next: "room2"},
            { text: "Ignore the room", next: "floor" }
        ]
    },
    room2: {
        img: "hallwayStorage.jpg",
        text: `You enter the room, looking around.<br/><br/>
                Against one wall are a series of shelves, and tucked away in a corner is a safe.<br/><br/>
                `,
        options: [
            { text: "Examine the shelves", next: "room2Shelves" },
            { text: "Examine the safe", next: "room2Safe" },
            { text: "Leave the room", next: "floor"}
        ]
    },
    room2Shelves: {
        img: "hallwayStorage.jpg",
        text: `There is an empty shelf at the very left of the room. <br/><br/>
        There is then a shelf with four boxes on it. Another shelf with five boxes is to the right of it.<br/><br/>
        At the very far right of the room there is a shelf with one box on it.`,
        options: [
            { text: "Examine the safe", next: "room2Safe" },
            { text: "Leave the room", next: "floor"}
        ]
    },
    room2Safe: {
        img: "hallwayStorage.jpg",
        text: `The safe sits underneath a dusty desk, with a keypanel asking for a four-digit code.`,
        options: [
            { text: "Try to open the safe", next: "room2SafeOpen", minigame: "opensafe", fail: "room2SafeFail" },
            { text: "Examine the shelves", next: "room2Shelves" },
            { text: "Leave the room", next: "floor"}
        ]
    },
    room2SafeFail: {
        img: "hallwayStorage.jpg",
        text: `The safe beeps to indicate you have input an incorrect code.`,
        options: [
            { text: "Try to open the safe again", next: "room2SafeOpen", minigame: "opensafe", fail: "room2SafeFail" },
            { text: "Examine the shelves", next: "room2Shelves" },
            { text: "Leave the room", next: "floor"}
        ]
    },
    room2SafeOpen: {
        img: "hallwayStorage.jpg",
        text: `The safe clicks, and you open it to find a ripped piece of paper...`,
        options: [
            { text: "Take the paper", next: "Room2PaperTake", item: "paper2" },
            { text: "Leave the room", next: "floor"}
        ]
    },
    room2PaperTake: {
        img: "hallwayStorage.jpg",
        text: `You take the piece of paper. It seems to be the right half of a code to the elevator, 'zzy'.`,
        options: [
            { text: "Leave the room", next: "floor"}
        ],
        tryRoom2Attack: {
            img: "hallwayStorage.jpg",
            text: `You open the door, leading into what looks like a storage room...<br/><br/>
                    Step inside?`,
            options: [
                { text: "Enter the room", next: "room2Attack" },
                { text: "Ignore the room", next: "floorAttack" }
            ]
        },
        room2Attack: {
            img: "hallwayStorage.jpg",
            text: `You enter the room, looking around.<br/><br/>
                    Against one wall are a series of shelves, and tucked away in a corner is a safe.<br/><br/>`,
            options: [
                { text: "Examine the shelves", next: "room2ShelvesAttack" },
                { text: "Examine the safe", next: "room2SafeAttack" },
                { text: "Leave the room", next: "floorAttack" }
            ]
        },
        room2ShelvesAttack: {
            img: "hallwayStorage.jpg",
            text: `There is an empty shelf at the very left of the room. <br/><br/>
            There is then a shelf with four boxes on it. Another shelf with five boxes is to the right of it.<br/><br/>
            At the very far right of the room there is a shelf with one box on it.`,
            options: [
                { text: "Examine the safe", next: "room2SafeAttack" },
                { text: "Leave the room", next: "floorAttack" }
            ]
        },
        room2SafeAttack: {
            img: "hallwayStorage.jpg",
            text: `The safe sits underneath a dusty desk, with a keypanel asking for a four-digit code.`,
            options: [
                { text: "Try to open the safe", next: "room2SafeOpenAttack", minigame: "opensafe", fail: "room2SafeFailAttack" },
                { text: "Examine the shelves", next: "room2ShelvesAttack" },
                { text: "Leave the room", next: "floorAttack" }
            ]
        },
        room2SafeFailAttack: {
            img: "hallwayStorage.jpg",
            text: `The safe beeps to indicate you have input an incorrect code.`,
            options: [
                { text: "Try to open the safe again", next: "room2SafeOpenAttack", minigame: "opensafe", fail: "room2SafeFailAttack" },
                { text: "Examine the shelves", next: "room2ShelvesAttack" },
                { text: "Leave the room", next: "floorAttack" }
            ]
        },
        room2SafeOpenAttack: {
            img: "hallwayStorage.jpg",
            text: `The safe clicks, and you open it to find a ripped piece of paper...`,
            options: [
                { text: "Take the paper", next: "room2PaperTakeAttack", item: "paper2" },
                { text: "Leave the room", next: "floorAttack" }
            ]
        },
        room2PaperTakeAttack: {
            img: "hallwayStorage.jpg",
            text: `You take the piece of paper. It seems to be the right half of a code to the elevator, 'zzy'.`,
            options: [
                { text: "Leave the room", next: "floorAttack" }
            ]
        }
    },
    elevator: {
        img: "elevators.jpg",
        text: 'You step back into the elevator, the panel still demanding a password...',
        options: [
            {text: "Input a password", minigame: "elevatorCode", fail: "elevatorFail", next: "elevatorAscend"},
            { text: "Leave the elevator", next: "floor"}
        ]
    },
    elevatorFail: {
        img: "elevators.jpg",
        text: 'With a shrill beep, the panel helpfully informs you that the password is wrong.',
        options: [
            {text: "Input another password", minigame: "elevatorCode", fail: "elevatorFail", next: "elevatorAscend"},
            { text: "Leave the elevator", next: "floor"}
        ]
    },
    elevatorAttack: {
        img: "elevators.jpg",
        text: 'You step back into the elevator, the panel still demanding a password...',
        options: [
            {text: "Input a password", minigame: "elevatorCodeAttack", fail: "elevatorFailAttack", next: "elevatorAscend"},
            { text: "Leave the elevator", next: "floorAttack"}
        ]
    },
    elevatorFailAttack: {
        img: "elevators.jpg",
        text: 'With a shrill beep, the panel helpfully informs you that the password is wrong.',
        options: [
            {text: "Input another password", minigame: "elevatorCode", fail: "elevatorFail", next: "elevatorAscend"},
            { text: "Leave the elevator", next: "floorAttack"}
        ]
    },
    elevatorAscend: {
        img: "elevators.jpg",
        text: `The panel folds back into the wall and the doors slam shut once again, the elevator humming to life as you ascend once more...`,
        options: [
            {text: "Continue", next: 'floor3.html'} 
        ]
    }
};
let backgroundImg = document.getElementById("image");

const storyText = document.getElementById("dialogue");
const optionsDiv = document.getElementById("options");

let tw; //an instance of the typewriter

const playerInventory = new inventory();
playerInventory.renderInventory();

let currentFloor = document.getElementById("floor2");//shows map position
currentFloor.style.backgroundColor = "#03A062";

function setUpUseButton(){
    document.getElementById("useButton").addEventListener("click", () => {
    const selectedItem = playerInventory.getSelectedItem();
    console.log(selectedItem);
    if(selectedItem != null) {
        alert(`You selected: ${selectedItem}`);
        playerInventory.useItem(selectedItem);
    } 
    else {
        alert("No item selected.");
    }
    });
}

function startGame() {
    showScene("start");
}

function showScene(sceneKey) {
    const scene = gameData[sceneKey];
    backgroundImg.src = "media/img/background/" + scene.img;  // <-- Make sure scene.img exists
    tw = new TypeWriter("dialogue", scene.text);
    tw.start();
    optionsDiv.innerHTML = ""; // Clears previous buttons

    scene.options.forEach(option => {  // Loop through options
        const button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = function() {  // Wrap in function to avoid reference issues
            nextScene(option);
        };
        optionsDiv.appendChild(button);
    });
}
function nextScene(option){
    console.log("Next scene called with option:", option);

    if (!option) {
        console.error("Error: 'option' is undefined!");
        return;
    }

    if (!tw.isFinished()) {
        finishTyping();
    } else {
        if (option.item) {
            playerInventory.addItem(option.item);
        }
        if (option.minigame) {
            console.log("Starting minigame:", option.minigame);
            startMinigame(option);
            return;
        }
        if (option.next.endsWith(".html")) {
            window.location.href = option.next;
        } else {
            showScene(option.next);
        }
    }    
}
function next(next){
    showScene(option.next);
}
    function startMinigame(option) {
        if (option.minigame == "opensafe") {
            const minigame = new Minigame(
                ["0451"],
                document.getElementById("userInput"),
                document.getElementById("popup"),
                document.getElementById("outcome")
            );
            minigame.startMinigame2(option);
        }
        if (option.minigame == "elevatorCode") {
            const minigame = new Minigame(
                ["xyzzy"],
                document.getElementById("userInput"),
                document.getElementById("popup"),
                document.getElementById("outcome")
            );
            minigame.startMinigame2(option);
        }
    }




setUpUseButton();
startGame();
