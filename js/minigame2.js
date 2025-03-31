class Minigame {
    constructor(options, inputField, popup, outcome) {
        this.options = options;
        this.currentIndex = 0;
        
        this.inputField = inputField;
        this.popup = popup;
        this.outcome = outcome;
        
        this.nextSceneSuccess = "";
        this.nextSceneFail = "";
        
        this.inputField.addEventListener("keydown", (event) => this.enterKey(event));
    }

    startMinigame2(option) {
        console.log("startMinigame2()");
        this.nextSceneSuccess = option.next;
        this.nextSceneFail = option.fail;
        this.showPopup();
    }

    showPopup() {
        console.log("showPopup()");
        this.popup.style.display = "block";
        this.inputField.style.display = "block";
        this.inputField.focus();
        this.outcome.textContent = "";
    }

    enterKey(event) {
        if (event.key === "Enter") {
            this.submitText();
        }
    }

    submitText() {
        const inputText = this.inputField.value.trim().toLowerCase();
        console.log("User entered:", inputText);

        if (this.options.includes(inputText)) {
            this.success();
        } else {
            this.fail();
        }
        this.inputField.value = "";
    }

    success() {
        console.log("Correct phrase entered");
        this.endGameSuccess();
    }

    fail() {
        console.log("Incorrect input");
        this.outcome.textContent = "Access denied. Try again.";
    }

    endGameSuccess() {
        this.inputField.style.display = "none";
        this.outcome.textContent = "Access granted. Opening file explorer...";
        setTimeout(() => {
            this.closePopup();
            showScene(this.nextSceneSuccess);
        }, 2000);
    }

    closePopup() {
        this.popup.style.display = "none";
        this.inputField.value = "";
    }
}