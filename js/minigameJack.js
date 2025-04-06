class MinigameJack {
	constructor(options, inputField, popup, outcome, elem, instructionText) {
		this.options = [...options]; // clone the array
		this.currentIndex = 0;

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

		// Remove previous listener, if any
		if (this.inputField._minigameListener) {
			this.inputField.removeEventListener("keydown", this.inputField._minigameListener);
		}

		// Store new bound listener and attach
		this._listener = (event) => this.enterKey(event);
		this.inputField._minigameListener = this._listener;
		this.inputField.addEventListener("keydown", this._listener);
	}

	startMinigame1(option) {
		this.currentIndex = 0;
		this.currentWidth = this.maxWidth;

		this.nextSceneSuccess = option.next;
		this.nextSceneFail = option.fail;

		this.popup.style.display = "block";
		this.inputField.style.display = "block";
		this.instructionText.style.display = "block";
		this.elem.style.display = "block";

		this.inputField.value = "";
		this.outcome.textContent = "";
		this.elem.style.width = this.currentWidth + "%";

		if (this.interval) clearInterval(this.interval);
		this.interval = setInterval(() => this.frame(), 80);

		this.setInstruction();
		this.inputField.focus();

		console.log("Minigame started → success:", this.nextSceneSuccess, "fail:", this.nextSceneFail);
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
		if (this.currentIndex < this.options.length) {
			this.instructionText.textContent = `Type "${this.options[this.currentIndex]}" and press ENTER`;
		}
		this.inputField.value = "";
		this.outcome.textContent = "";
	}

	enterKey(event) {
		if (event.key === "Enter") {
			this.submitText();
		}
	}

	submitText() {
		const inputText = this.inputField.value.trim();
		const expected = this.options[this.currentIndex];

		console.log("Submitted:", inputText, "| Expected:", expected);
		console.log("CurrentIndex:", this.currentIndex, "/", this.options.length);

		if (inputText === expected) {
			this.currentIndex++;
			this.addBonusTime();
			this.success();
		} else {
			this.endGameFail();
		}

		this.inputField.value = "";
		this.setInstruction();
	}

	addBonusTime() {
		this.currentWidth = Math.min(this.currentWidth + this.answerBonusTime, this.maxWidth);
		this.elem.style.width = this.currentWidth + "%";
		clearInterval(this.interval);
		this.interval = setInterval(() => this.frame(), 80);
	}

	success() {
		if (this.currentIndex >= this.options.length) {
			this.endGameSuccess();
		}
	}

	endGameFail() {
		console.log("Minigame failed. Redirecting to:", this.nextSceneFail);
		this.hideGameElements();

		const miniTw = new TypeWriter("minigame-outcome", "You failed.<br/><br/>Please try again.");
		miniTw.start();
		clearInterval(this.interval);

		const wait = setInterval(() => {
			if (miniTw.isFinished()) {
				clearInterval(wait);
				this.closePopup();
				setTimeout(() => {
					showScene(this.nextSceneFail);
				}, 100);
			}
		}, 100);
	}

	endGameSuccess() {
		console.log("Minigame success. Unlocking:", this.nextSceneSuccess);
		this.hideGameElements();

		const miniTw = new TypeWriter("minigame-outcome", "Access granted<br/><br/>Opening file explorer...");
		miniTw.start();
		clearInterval(this.interval);

		const wait = setInterval(() => {
			if (miniTw.isFinished()) {
				clearInterval(wait);
				this.closePopup();
				setTimeout(() => {
					showScene(this.nextSceneSuccess);
				}, 100);
			}
		}, 100);
	}

	hideGameElements() {
		this.inputField.style.display = "none";
		this.elem.style.display = "none";
		this.instructionText.style.display = "none";
	}

	closePopup() {
		this.popup.style.display = "none";
		this.inputField.value = "";
	}
}