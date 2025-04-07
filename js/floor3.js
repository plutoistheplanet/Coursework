
const gameData = {
    start: {
        img: "floorEntrance.jpg",
        text: `The elevator doors slide open. The hallway is cold, sterile. Faint chemical fumes linger.<br/><br/>
               Three doors stand ahead:<br/><br/>
               <strong>Left:</strong> A distorted skull.<br/>
               <strong>Middle:</strong> A broken syringe (<strong>Locked</strong>).<br/>
               <strong>Right:</strong> A cracked eye (<strong>Locked</strong>).<br/><br/>
               <strong>Which door do you choose?</strong>`,
        options: [
            { 
                text: "Enter the left door", 
                next: "tryRoom1" 
            },
            { 
                text: "Check the middle door (Locked)", 
                next: "checkMiddleDoor"
            },
            { 
                text: "Check the right door (Locked)", 
                next: "checkRightDoor"
            }
        ]
    },
checkMiddleDoor: {
    img: "floorEntrance.jpg",
    text: `The middle door is locked. You need the Room 2 Key to proceed.`,
    options: [
        { 
            text: "Return to the hallway", 
            next: "start" 
        },
        { 
            text: "Try to unlock it", 
            next: "attemptMiddleUnlock"  // Go to intermediate scene
        }
    ]
},

attemptMiddleUnlock: {
    img: "floorEntrance.jpg",
    text: function() {
        if (playerInventory.innerInventory.includes("media/img/items/key1.png")) {
            return "unlockMiddleRoom";
        } else {
            return "lockedDoorMiddle";
        }
    },
    options: []  // Auto-progress based on text return
},

checkRightDoor: {
    img: "floorEntrance.jpg",
    text: `The right door is locked. You need the Room 3 Key to proceed.`,
    options: [
        { 
            text: "Return to the hallway", 
            next: "start" 
        },
        { 
            text: "Try to unlock it", 
            next: "attemptRightUnlock"  // Go to intermediate scene
        }
    ]
},

attemptRightUnlock: {
    img: "floorEntrance.jpg",
    text: function() {
        if (1 == 1) {
            return "unlockRightRoom";
        } else {
            return "lockedDoorRight";
        }
    },
    options: []  // Auto-progress based on text return
},

// Keep your existing locked/unlock scenes exactly as they were
lockedDoorMiddle: {
    img: "floorEntrance.jpg",
    text: `The door remains locked. You need the Room 2 Key to proceed.`,
    options: [
        { text: "Go back", next: "checkMiddleDoor" }
    ]
},

lockedDoorRight: {
    img: "floorEntrance.jpg",
    text: `The door remains locked. You need the Room 3 Key to proceed.`,
    options: [
        { text: "Go back", next: "checkRightDoor" }
    ]
},

unlockMiddleRoom: {
    img: "floorEntrance.jpg",
    text: `The door opens with a beep. You can now enter the middle room.`,
    options: [{ text: "Enter the middle room", next: "tryRoom2" }]
},

unlockRightRoom: {
    img: "floorEntrance.jpg",
    text: `The door opens with a beep. You can now enter the right room.`,
    options: [{ text: "Enter the right room", next: "tryRoom3" }]
},

minibossFight: {
    text: "The creature attacks!",
    combat: true,
    win: "elevatorScene",
    lose: "start",
    options: [] // <-- Add this
},

hackSuccessScene: {
    img: "containmentRoom.jpg",
    text: `The terminal flashes: <span style="color: #03A062">ACCESS GRANTED</span>. Security protocols disabled.<br/><br/>
           A hidden panel reveals <strong>confidential files</strong> about the experiments.`,
    options: [
        { 
            text: "Continue investigating", 
            next: "tryRoom1" 
        },
        { 
            text: "Take the confidential files", 
            next: "getPage",
            item: "page",
            room: "room1",
            hideIfCollected: true,
            id: "pageBtn"
        }
    ]
},

systemLockedScene: {
    img: "containmentRoom.jpg",
    text: `The terminal's screen is dark. <span style="color: #ff0000">SYSTEM LOCKED</span>. Further access attempts are futile.`,
    options: [
        { 
            text: "Continue investigating", 
            next: "tryRoom1" 
        }
    ]
},

// Add this new scene
getPage: {
    img: "containmentRoom.jpg",
    text: `You carefully remove the <strong>classified documents</strong> from the terminal.`,
    options: [
        { 
            text: "Continue exploring", 
            next: "tryRoom1" 
        }
    ]
},

room1ComputerFail: {
    img: "containmentRoom.jpg",
    text: `The terminal blares: <span style="color: #ff0000">INTRUDER DETECTED</span>! Security countermeasures activated!`,
    options: [
        { 
            text: "Quickly retreat", 
            next: "tryRoom1" 
        }
    ]
},
    // ===== ROOM 1 =====
    tryRoom1: {
        img: "containmentRoom.jpg",
        text: `Rows of <strong>glass tanks</strong> line the room.<br/><br/>
               A <strong>terminal</strong> flickers in the corner. A <strong>keycard</strong> lies nearby.<br/><br/>
               You also spot an <strong>Energy Can</strong> under a desk.`,
       options: [
        { 
             text: "Hack the terminal", 
    next: "hackSuccessScene",  // Add this scene to gameData
    fail: "room1ComputerFail",
    minigame: "hackcomputer",
    condition: () => !sessionStorage.getItem('hackAttempted') // Only show if not attempted

        },
{ 
            text: "System Locked [Already Attempted]", 
            next: "systemLockedScene",
            condition: () => sessionStorage.getItem('hackAttempted') // Show after attempt
        },
        { 
            text: "Take the keycard (Room 2 Key)", 
            next: "getRoom2Key",
            item: "room2Key",
            room: "room1",
            hideIfCollected: true,
            id: "room2KeyBtn"
        },
        { 
            text: "Pick up the Energy Can", 
            next: "getEnergyCan",
            item: "can",
            room: "room1",
            hideIfCollected: true,
            id: "energyCanBtn"
        },
        { 
            text: "Go back to hallway", 
            next: "start" 
        }
    ]

    },
    getEnergyCan: {
        img: "containmentRoom.jpg",
        text: `You pick up the <strong>Energy Can</strong>.`,
        options: [{ 
            text: "Continue exploring", 
            next: "tryRoom1" 
        }],
    },
    getRoom2Key: {
        img: "containmentRoom.jpg",
        text: `You grab the <strong>Room 2 Keycard</strong>.`,
        options: [{ 
            text: "Leave and unlock Room 2", 
            next: "tryRoom1" 
        }],
    },

    // ===== ROOM 2 =====
     tryRoom2: {
        img: "labRoom.jpg",
        text: `The door unlocks with a beep. A <strong>failed test subject</strong> slumps against the wall, barely breathing.<br/><br/>
               <strong>"They made something unstoppable!"</strong><br/><br/>
               Their trembling hand clutches a <strong>key</strong>. You also notice a <strong>weapon (Letter Opener)</strong> on the floor nearby.`,
       options: [
        { 
            text: "Take the key", 
            next: "getRoom3Key",
            item: "room3Key",
            room: "room2",
            hideIfCollected: true,
            id: "room3KeyBtn"
        },
        { 
            text: "Pick up the Letter Opener", 
            next: "getWeapon",
            item: "letterOpener",
            room: "room2",
            hideIfCollected: true,
            id: "weaponBtn"
        },
        { 
            text: "Go back to hallway", 
            next: "start" 
        }
    ]

    },
    getWeapon: {
        img: "labRoom.jpg",
        text: `You pick up the <strong>Letter Opener</strong>. It looks sharp.`,
        options: [{ 
            text: "Continue exploring", 
            next: "tryRoom2" 
        }],
        item: "letterOpener"
    },
    getRoom3Key: {
        img: "labRoom.jpg",
        text: `You grab the <strong>Room 3 Key</strong>.`,
        options: [{ 
            text: "Leave and unlock Room 3", 
            next: "start" 
        }],
        item: "room3Key"
    },


// ===== ROOM 3 =====


    tryRoom3: {
        img: "experimentRoom.jpg",
        text: `The door creaks open to reveal a horrific scene. A massive, twisted mechanical figure lurks in the shadows.<br/><br/>
               The creature turns toward you, its eyes glowing with unnatural light.`,
        options: [
        { 
            text: "Fight the creature", 
            next: "minibossFight" 
        },      
        { 
            text: "Go back to hallway", 
            next: "start" 
        }
    ]
},


elevatorScene: {
    img: "experimentRoom.jpg",
    text: `The creature lets out a final guttural roar before collapsing. As it falls, you spot <strong>an elevator</strong> hidden behind it - its doors slowly grinding open.<br/><br/>
           Cold air whispers from within. The way forward...`,
    options: [
        { 
            text: "Enter the elevator", 
            next: "floor4.html"  // Replace with your actual next level
        }
   
    ]
},
};  // <-- This semicolon was in the wrong place


function showScene(sceneKey) {
    const scene = gameData[sceneKey];
    if (!scene) {
        console.error(`Scene ${sceneKey} not found!`);
        return;
    }
    if(scene.next == "floor4.html"){
        nextFloor();
    }
    // Handle auto-progress scenes
    if (typeof scene.text === 'function') {
        const nextScene = scene.text();
        showScene(nextScene);
        return;
    }

    // Handle combat scenes
    if (scene.combat) {
        gameData.currentScene = scene;
        combatSystem.startCombat();
        return;
    }

    // Regular scene processing
    backgroundImg.src = "media/img/background/" + scene.img;
    tw = new TypeWriter("dialogue", scene.text);
    tw.start();
    optionsDiv.innerHTML = "";

    if (scene.options) {
        scene.options.forEach(option => {
            // Hide already collected items
            if (option.hideIfCollected && option.room && option.item && 
                playerInventory.isCollected(option.room, option.item)) return;
            
            // Hide conditional options
            if (option.condition && !option.condition()) return;

            const button = document.createElement("button");
            button.textContent = option.text;
            if (option.id) button.id = option.id;
            
            button.onclick = () => {
                // Security checks first
                if (option.item) {
                    // Prevent duplicate collection
                    if (option.room && playerInventory.isCollected(option.room, option.item)) {
                        alert("You already collected this item in this room!");
                        return;
                    }
                    
                    // Prevent collection if inventory full
                    if (playerInventory.innerInventory.every(slot => slot !== null)) {
                        alert("Your inventory is full!");
                        return;
                    }
                }

                // Process valid collection
                if (option.item) {
                    playerInventory.addItem(option.item);
                    //playerInventory.markAsCollected(option.room, option.item);
                }
                
                // Scene transition
                nextScene(option);
            };
            
            optionsDiv.appendChild(button);
        });
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

	window.location.href = "floor4.html"; // change to next floor
}

let pageStartTime = Date.now();
let totalPlayTime = parseFloat(localStorage.getItem("playerTime")) || 0;

let backgroundImg = document.getElementById("image");

const storyText = document.getElementById("dialogue");
const optionsDiv = document.getElementById("options");

let tw; //an instance of the typewriter

const playerInventory = new inventory();
playerInventory.renderInventory();

let currentFloor = document.getElementById("floor3");//shows map position
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
	//load in player inventory
	playerInventory.renderInventory();
	let x = localStorage.getItem("sessionId");
	updateUserFloorInDB(x, 3); //update the user floor in the database
}
function getCurrentSessionId() {
	return localStorage.getItem("sessionId");
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
       if (option.minigame === "hackcomputer") {
 // Set flag when minigame is initiated
        sessionStorage.setItem('hackAttempted', 'true');
        
        const minigame = new Minigame(
            ["0451"], // Passcode options
            "SYSTEM BREACHED", // Success message
            "ACCESS DENIED", // Fail message
            document.getElementById("userInput"),
            document.getElementById("popup"),
            document.getElementById("outcome"),
            document.getElementById("myBar"), // Progress bar element
            document.getElementById("instruction-text") // Instruction element
        );
        minigame.startMinigame1(option);
    }
    
}


// Add to floor2.js
class EnhancedCombat {
    constructor() {
        this.playerEffects = [];
        this.enemyEffects = [];
        this.combatActive = false;
        
        // Combat Elements
        // Add close button handler
        document.getElementById('combat-close').addEventListener('click', () => {
            this.inventoryElement.style.display = 'none';
        });
        this.popup = document.getElementById('combat-popup');
        this.logElement = document.getElementById('combat-log');
        this.inventoryElement = document.getElementById('combat-inventory');
        
        // Combat Stats
        this.baseStats = {
            player: { health: 100, attack: 20, defense: 5 },
            enemy: { health: 100, attack: 15, defense: 6 }
        };
        
        this.currentStats = JSON.parse(JSON.stringify(this.baseStats));
    }

    startCombat() {
        this.combatActive = true;
        this.popup.style.display = 'block';
        this.updateUI();
        this.log("A horrific cybernetic creature blocks your path!");
    }

 applyItemEffect(item) {
        let message = "";
        switch(item) {
            case 'can':
                this.playerEffects.push({
                    type: 'invulnerable',
                    duration: 1
                });
                message = "Energy Can used! You're invulnerable for 1 turn!";
                break;
                
            case 'letterOpener':
                this.playerEffects.push({
                    type: 'attack',
                    value: 5,
                    duration: 1
                });
                message = "Letter Opener used! +5 Attack for 1 turn!";
                break;

            case 'room2Key':
            case 'room3Key':
                alert("This key is for opening doors, not for combat!");
                return; // Don't consume key

            default:
                alert("This item has no combat use!");
                return; // Don't consume unspecified items
        }

        this.log(message);
        this.updateUI();
    }

    calculateDamage(attacker, defender) {
        let attack = this.currentStats[attacker].attack;
        let defense = this.currentStats[defender].defense;
        
     // Apply active effects
        this.playerEffects.forEach(effect => {
            if(effect.type === 'attack') attack += effect.value;
            if(effect.type === 'defense') defense += effect.value;
        });

        // Check for invulnerability
        const isInvulnerable = this.playerEffects.some(e => e.type === 'invulnerable');
        if(defender === 'player' && isInvulnerable) {
            this.log("Invulnerability protected you!");
            return 0;
        }

        return Math.max(Math.floor(
            (attack * (0.8 + Math.random() * 0.4)) - 
            (defense * (0.5 + Math.random() * 0.3))
        ), 0);
    }

    updateUI() {
        // Update health bars
        document.getElementById('player-health').style.width = 
            `${(this.currentStats.player.health/this.baseStats.player.health)*100}%`;
        
        document.getElementById('enemy-health').style.width = 
            `${(this.currentStats.enemy.health/this.baseStats.enemy.health)*100}%`;

        // Update effects display
        const effectsElement = document.getElementById('player-effects');
        effectsElement.innerHTML = this.playerEffects
            .map(e => `${e.type}`)
            .join('<br>');
    }

    log(message) {
        this.logElement.innerHTML += `<p>${message}</p>`;
        this.logElement.scrollTop = this.logElement.scrollHeight;
    }

    attack() {
        if(!this.combatActive) return;
        
        const damage = this.calculateDamage('player', 'enemy');
        this.currentStats.enemy.health -= damage;
// Trigger enemy hit shake
        document.querySelector('.combatant:nth-child(2)')?.classList.add('enemy-hit-animation');
        setTimeout(() => {
            document.querySelector('.combatant:nth-child(2)')?.classList.remove('enemy-hit-animation');
        }, 500);

        this.log(`You strike for ${damage} damage!`);
        
        if(this.currentStats.enemy.health <= 0) {
            this.endCombat(true);
            return;
        }
        
        this.enemyTurn();
    }

    defend() {
        this.playerEffects.push({
            type: 'defense',
            value: 7,
            duration: 2
        });
        this.log("Defensive stance! +7 Defense for 2 turns");
        this.enemyTurn();
    }

enemyTurn() {
    const damage = this.calculateDamage('enemy', 'player');
    this.currentStats.player.health -= damage;
  // Trigger player hit shake
        document.querySelector('.combatant:nth-child(1)')?.classList.add('player-hit-animation');
        setTimeout(() => {
            document.querySelector('.combatant:nth-child(1)')?.classList.remove('player-hit-animation');
        }, 500);

    this.log(`Enemy attacks for ${damage} damage!`);
    
    // Update effect durations - ES5 compatible version
    this.playerEffects = this.playerEffects
        .map(function(e) {
            return Object.assign({}, e, {
                duration: e.duration - 1
            });
        })
        .filter(function(e) {
            return e.duration > 0;
        });

    if(this.currentStats.player.health <= 0) {
        this.endCombat(false);
    }
    
    this.updateUI();
}
    showInventory() {
        const container = document.getElementById('combat-items');
        container.innerHTML = '';

  // Add close button to inventory UI
        const closeButton = document.createElement('button');
        closeButton.textContent = 'X';
        closeButton.className = 'combat-close';
        closeButton.onclick = () => this.closeInventory();
        container.appendChild(closeButton);

        
        playerInventory.innerInventory.forEach((item, index) => {
            if(item) {
                const div = document.createElement('div');
                div.className = 'combat-item';
                div.innerHTML = `
                    <img src="${item}" class="combat-item-img">
                    <button onclick="combatSystem.useInventoryItem(${index})">Use</button>
                `;
                container.appendChild(div);
            }
        });
        
        this.inventoryElement.style.display = 'block';
    }
 // Add this new method
    closeInventory() {
        this.inventoryElement.style.display = 'none';
    }


useInventoryItem(index) {
    const itemKey = Object.keys(playerInventory.items).find(
        key => playerInventory.items[key] === playerInventory.innerInventory[index]
    );
    
    if(itemKey) {
// Prevent key consumption
        if (["room2key", "room3key", "page"].includes(itemKey.toLowerCase())) {
            alert("This item cannot be used in combat!");
            return;
        }
        // Consume item regardless of success
        playerInventory.innerInventory[index] = null;
        playerInventory.updateStorage();
        this.inventoryElement.style.display = 'none';

        // Now handle effect
        this.applyItemEffect(itemKey);
    }
}

    endCombat(victory) {
        this.combatActive = false;
        this.popup.style.display = 'none';

// Update inventory display
        playerInventory.renderInventory();
        
        
        if(victory) {
            showScene(gameData.currentScene.win);
        } else {
            showScene(gameData.currentScene.lose);
        }


        
        
        // Reset stats
        this.currentStats = JSON.parse(JSON.stringify(this.baseStats));
        this.playerEffects = [];
    }
}

// Initialize combat system
const combatSystem = new EnhancedCombat();

// Add to your existing setup
document.getElementById('combat-attack').addEventListener('click', () => combatSystem.attack());
document.getElementById('combat-defend').addEventListener('click', () => combatSystem.defend());
document.getElementById('combat-item').addEventListener('click', () => combatSystem.showInventory());




setUpUseButton();
startGame();