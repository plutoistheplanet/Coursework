const gameData = {
    start: {
        img: "elevatorInside.jpg",
        text: `After all you have been through, this is the final stretch.<br/><br/>
                You mentally prepare yourself for whats to come.`,
        options: [
            { text: "Exit the elevator", next: "entrance" }
        ]
    },
    entrance: {
        img: "floorEntrance.jpg",
        text: `You hear the elevator shut behind you.<br/><br/>
                You feel there is no going back now.`,
        options: [
            { text: "Proceed forward", next: "startRoom1" }
        ]
    },
    startRoom1: {
        img: "stairs.jpg",
        text: `You make your way to a set of stairs.<br/><br/>
                You hear someone mumbling to themselves up ahead.<br/><br/>
                Could this be who you've been looking for?.`,
        options: [
            { text: "Climb the stairs", next: "finalRoom1" }
        ]
    },
    finalRoom1: {
        img: "meetingRoom.jpg",
        text: `You enter what looks to be a meeting room.<br/><br/>
                Someone is standing at the far end of the table.<br/><br/>
                He invites you in.`,
        options: [
            { text: "Enter room", next: "finalRoom2" },
        ]
    },
    finalRoom2: {
        img: "meetingRoom.jpg",
        text: `The man congratulates you for making it all the way to the top.<br/><br/>
                He mentions that he has an offer he would like to make.`,
        options: [
            { text: "Keep listening", next: "finalRoom3"}
        ]
    },
    finalRoom3: {
        img: "meetingRoom.jpg",
        text: `What the man says surprises you.<br/><br/>
                He offers you an important position at the company.<br/><br/>
                How do you respond to this?`,
        options: [
            { text: "Accept offer", next: "badEnding"},
            { text: "Decline offer", next: "bossFight1"},
        ]
    },
    badEnding: {
        img: "meetingRoom.jpg",
        text: `You ponder the idea for a moment.<br/><br/>
                And you ultimately come to the conclusion that this is within your best interests<br/><br/>
                You accept the boss's offer.`,
        options: [
            { text: "End Game", next: "start"}, //FOR CHRIS, THIS SHOULD LINK TO STATS PAGE INSTEAD OF BOSSFIGHT1
        ]
    },
    bossFight1: {
        img: "meetingRoom.jpg",
        text: `The man looks down and laughs to himself.<br/><br/>
                He expresses how you could have been a valuable asset to him.<br/><br/>
                Brace yourself.`,
        options: [
            { text: "Fight", next: "bossFight2"},
        ]
    },
    bossFight2: {
        img: "meetingRoom.jpg",
        text: "The final battle.",
        combat: true,
        win: "win1",
        lose: "start", //FOR CHRIS THIS SHOULD LINK BACK TO THE STATS PAGE GAME OVER SCREEN
        options: []
    },
    win1: {
        img: "meetingRoom.jpg",
        text: `The boss overruling the evil corporation has been defeated.<br/><br/>
                With this victory, society started healing.`,
        options: [
            { text: "Game End", next: "start"}, //STATS PAGE FOR CHRIS
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

let currentFloor = document.getElementById("finalFloor");//shows map position
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
    if (!scene) {
        console.error(`Scene ${sceneKey} not found!`);
        return;
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
    backgroundImg.src = "media/background/" + scene.img;
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
                    playerInventory.markAsCollected(option.room, option.item);
                }
                
                // Scene transition
                nextScene(option);
            };
            
            optionsDiv.appendChild(button);
        });
    }
}
function nextScene(option){
    console.log(option.img);
    console.log(option.next);
    console.log(option.item);
    console.log(option.minigame);
    if(tw.isFinished() == false){
        finishTyping();
    }
    else{
        if (option.item) {
            playerInventory.addItem(option.item);  // Add item to inventory
        }
        if (option.minigame) {
            console.log("if option.minigame")
            startMinigame(option);  // Trigger minigame
            //the actual minigame should call next() to trigger next scene when game is finished
        }
        if(option.significantEvent){
            //add to list of significant choices.
        }
        else{
            showScene(option.next);
        }
        if(option.nextFloor){
            //code to move to next floor
        }
    }    
}
function next(next){
    showScene(option.next);
}
function startMinigame(option){
    if(option.minigame == "hackcomputer"){
        const minigame = new Minigame(["open terminal", "bypass firewall", "unlock computer"],
        document.getElementById("userInput"),
        document.getElementById("popup"),
        document.getElementById("outcome"),
        document.getElementById("myBar"),
        document.getElementById("instruction-text")
        );
        minigame.startMinigame1(option);
    }
    if(option.minigame == "insertMinigameHere"){

    }
    
}

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
            player: { health: 100, attack: 20, defense: 10 },
            enemy: { health: 100, attack: 15, defense: 15 }
        };
        
        this.currentStats = JSON.parse(JSON.stringify(this.baseStats));
    }

    startCombat() {
        this.combatActive = true;
        this.popup.style.display = 'block';
        this.updateUI();
        this.log("The final battle.");
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