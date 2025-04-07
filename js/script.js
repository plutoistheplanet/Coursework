let currentLevel = 1;  // Start at level 1
let gameStarted = false;
let gameEnded = false;
let timer;
let timePlayed = 0;
let points = 0;  // Player's points

const levelDisplay = document.getElementById("levelDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const pointsDisplay = document.getElementById("pointsDisplay");
const statsDisplay = document.getElementById("statsDisplay");

const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endButton");
const resetButton = document.getElementById("resetButton");

// Start the game
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        gameEnded = false;
        timePlayed = 0;  // Reset time played when starting a new game
        points = 0;  // Reset points
        currentLevel = 1; // Reset the level to 1 when starting a new game
        timer = setInterval(updateTime, 1000);  // Start the timer
        levelDisplay.textContent = `Level: ${currentLevel}`;
        timeDisplay.textContent = `Time Played: ${timePlayed} seconds`;
        pointsDisplay.textContent = `Points: ${points}`;
        statsDisplay.textContent = "";  // Clear any previous stats and hide stats display
        statsDisplay.style.display = "none";  // Hide the stats display at the start
    }
}

// Update the time
function updateTime() {
    timePlayed++;
    timeDisplay.textContent = `Time Played: ${timePlayed} seconds`;
}

function formatTime(seconds) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    // Pad numbers with leading zeros if needed
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// End the game and display stats
function endGame() {
    if (gameStarted && !gameEnded) {
        clearInterval(timer);
        gameEnded = true;

        // Save time to local storage
        localStorage.setItem("playerTime", timePlayed);

        // Get time from local storage
        const storedTime = localStorage.getItem("playerTime");

        // Query DB
        let dbQuery = `UPDATE PLAYER_STATISTICS SET playerTime = ${storedTime} WHERE userID = 1`;
        
        // Clones dbConfig to avoid messing with the base:
        const dbParams = new URLSearchParams(dbConfig);
        dbParams.set("query", dbQuery);

        console.log("Sending DB request with:", dbParams.toString());

        // Sends request off to database
        fetch(dbConnectorUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: dbParams.toString(),
        })
        .then(response => response.text())
        .then(result => {
            console.log("Data uploaded:", result);
        })
        .catch(error => {
            console.error("Upload error:", error);
        });

        // Show final stats
        statsDisplay.innerHTML = `
    <h2 class="game-over-title">Game Over</h2>
    <p>Level Reached: ${currentLevel}</p>
    <p>Time Played: ${timePlayed} seconds</p>
    <p>Total Score: ${points}</p>
    <div class="button-row">
        <button class="btn" onclick="gotoLevel1()">Restart Game</button>
        <button class="btn" onclick="goToMainMenu()">Back to Main Menu</button>
    </div>
`;

    statsDisplay.style.display = "block";
    }
}


// Complete a level (called when a player completes a level)
function completeLevel() {
    if (gameStarted && !gameEnded) {
        points += 100;  // Add 100 points for completing a level
        currentLevel++;  // Increase the level
        levelDisplay.textContent = `Level: ${currentLevel}`;
        pointsDisplay.textContent = `Points: ${points}`;
    }
}

// Reset the game and stats
function resetGame() {
    gameStarted = false;
    gameEnded = false;
    currentLevel = 1;
    timePlayed = 0;
    points = 0;

    levelDisplay.textContent = `Level: ${currentLevel}`;
    timeDisplay.textContent = `Time Played: 0 seconds`;
    pointsDisplay.textContent = `Points: 0`;
    statsDisplay.textContent = "";  // Clear stats
    statsDisplay.style.display = "none";  // Hide stats display
    clearInterval(timer);  // Stop any running timer
}
function goToMainMenu() {
    window.location.href = "mainmenu.html";
}
function gotoLevel1() {
    window.location.href = "Floor1.html"; // change this to the correct html for floor 1
}
// Event listeners for buttons
startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
resetButton.addEventListener("click", resetGame);
