class Minigame {
    constructor(options, successMessage, failMessage, inputField, popup, outcome, elem, instructionText) {
        this.originalOptions = options;
        this.successMessage = successMessage;
        this.failMessage = failMessage;

        this.inputField = inputField;
        this.popup = popup;
        this.outcome = outcome;
        this.elem = elem;
        this.instructionText = instructionText;

        this.maxWidth = 100;
        this.answerBonusTime = 60;

        this.handleKeyDown = (event) => this.enterKey(event);
    }

    startMinigame1(option) {
        this.options = [...this.originalOptions];
        this.currentIndex = 0;
        this.currentWidth = this.maxWidth;
        this.nextSceneSuccess = option.next;
        this.nextSceneFail = option.fail;

        clearInterval(this.interval);
        this.inputField.removeEventListener("keydown", this.handleKeyDown);

        this.inputField.addEventListener("keydown", this.handleKeyDown);

        // Start the game
        this.showGameElements();
        this.move();
        this.setInstruction();
    }

    move() {
        this.popup.style.display = "block";
        this.inputField.focus();
        this.elem.style.width = this.currentWidth + "%";

        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(() => this.frame(), 80);
    }

    frame() {
        if (this.currentWidth <= 0) {
            clearInterval(this.interval);
            this.endGameFail();
        } else {
            this.currentWidth--;
            this.elem.style.width = this.currentWidth + "%";
        }
    }

    setInstruction() {
        this.instructionText.textContent = "TYPE : " + this.options[this.currentIndex];
        this.inputField.value = "";
        this.outcome.textContent = "";
    }

    addBonusTime() {
        this.currentWidth = Math.min(this.currentWidth + this.answerBonusTime, this.maxWidth);
        this.elem.style.width = this.currentWidth + "%";
        clearInterval(this.interval);
        this.interval = setInterval(() => this.frame(), 80);
    }

    enterKey(event) {
        if (event.key === "Enter") {
            this.submitText();
        }
    }

    submitText() {
        const inputText = this.inputField.value.trim();
        if (inputText === this.options[this.currentIndex]) {
            this.currentIndex++;
            this.addBonusTime();
            this.success();
            if (this.currentIndex < this.options.length) {
                this.setInstruction();
            }
        } else {
            this.endGameFail();
        }
        this.inputField.value = "";
    }

    success() {
        if (this.currentIndex >= this.options.length) {
            this.endGameSuccess();
        }
    }

    endGameFail() {
        this.cleanup();
        tw = new TypeWriter("outcome", this.failMessage);
        tw.start();
        const wait = setInterval(() => {
            if (tw.isFinished()) {
                clearInterval(wait);
                this.closePopup();
                showScene(this.nextSceneFail);
            }
        }, 100);
    }

    endGameSuccess() {
        this.cleanup();
        tw = new TypeWriter("outcome", this.successMessage);
        tw.start();
        const wait = setInterval(() => {
            if (tw.isFinished()) {
                clearInterval(wait);
                this.closePopup();
                showScene(this.nextSceneSuccess);
            }
        }, 100);
    }

    cleanup() {
        clearInterval(this.interval);
        this.inputField.removeEventListener("keydown", this.handleKeyDown);
        this.hideGameElements();
    }

    hideGameElements() {
        this.inputField.style.display = "none";
        this.elem.style.display = "none";
        this.instructionText.style.display = "none";
    }

    showGameElements() {
        this.inputField.style.display = "";
        this.elem.style.display = "";
        this.instructionText.style.display = "";
    }

    closePopup() {
        this.popup.style.display = "none";
    }
}
