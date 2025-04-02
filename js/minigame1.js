class Minigame {
    constructor(options, successMessage, failMessage, inputField, popup, outcome, elem, instructionText) {
        this.options = options;
        this.currentIndex = 0;

        this.successMessage = successMessage;
        this.failMessage = failMessage;

        this.inputField = inputField;
        this.popup = popup;
        this.outcome = outcome;
        this.elem = elem;
        this.instructionText = instructionText;

        this.maxWidth = 100;
        this.currentWidth = 100;
        this.answerBonusTime = 60;
        this.interval = null;

        this.nextSceneSuccess = "";
        this.nextSceneFail = "";

        this.inputField.addEventListener("keydown", (event) => this.enterKey(event));
    }
    startMinigame1(option) {
        this.showGameElements(); 
        this.nextSceneSuccess = option.next;
        this.nextSceneFail = option.fail;
        this.move();
        this.setInstruction();
    }

    move() {
        this.popup.style.display = "block";
        this.inputField.focus();

        this.currentWidth = 100;
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
        console.log(this.options); 
        console.log(this.currentIndex);             
        this.instructionText.textContent = "TYPE : " + this.options[this.currentIndex];
        this.inputField.value = "";
        this.outcome.textContent = "";
    }

    addBonusTime() {
        if (this.currentWidth < this.maxWidth) {
            this.currentWidth = Math.min(this.currentWidth + this.answerBonusTime, this.maxWidth);
        }
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
        console.log(this.currentIndex);
        console.log("User entered:", inputText);
        console.log("I'm looking for:", this.options[this.currentIndex]);
        if (inputText === this.options[this.currentIndex]) {
            this.currentIndex++;
            this.addBonusTime();
            this.move();
            this.success();
        } else {
            this.endGameFail();
        }
        this.inputField.value = "";
        this.setInstruction();
    }

    success() {
        console.log("Spelt Correctly");
        if (this.currentIndex >= this.options.length) {
            this.endGameSuccess();
        }
    }

    endGameFail() {
        this.hideGameElements();
        tw = new TypeWriter("outcome", this.failMessage);
        tw.start();
        console.log("End game Fail");
        clearInterval(this.interval);
        console.log(tw.isFinished());

        const waitForTypewriter = setInterval(() => {
            if (tw.isFinished()) {
                this.closePopup();
                clearInterval(waitForTypewriter); //stop checking once finished
                showScene(this.nextSceneFail); //show the next scene
            }
        }, 100);
    }

    endGameSuccess() {
        this.hideGameElements();
        tw = new TypeWriter("outcome", this.successMessage);
        tw.start();
        console.log("End game Success");
        clearInterval(this.interval);
        const waitForTypewriter = setInterval(() => {
            if (tw.isFinished()) {
                this.closePopup();
                clearInterval(waitForTypewriter); //stop checking once finished
                showScene(this.nextSceneSuccess); //show the next scene
            }
        }, 100);
    }

    timeout() {
        this.setInstruction();
        console.log("Ran out of time");
    }

    hideGameElements() {
        this.inputField.style.display = "none";
        this.elem.style.display = "none";
        this.instructionText.style.display = "none";
    }

    showGameElements(){
        this.inputField.style.display = "";
        this.elem.style.display = "";
        this.instructionText.style.display = "";
    }
    closePopup() {
        this.popup.style.display = "none";
    }
}


