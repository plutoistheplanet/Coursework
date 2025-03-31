class TypeWriter {
	constructor(targetID, text, speed = 45) {
		this.targetElement = document.getElementById(targetID);
		this.text = text;
		this.speed = speed;
		this.index = 0;
		this.tempHTML = "";
		this.timeoutID = null;
		this.stopped = false;
		this.finished = false;
	}

	start() {
		this.targetElement.innerHTML = "";
		this.index = 0;
		this.tempHTML = "";
		this.stopped = false;
		this.finished = false;
		this.type();
	}

	type() {
		if (this.stopped) {
			this.targetElement.innerHTML = this.text;
			this.finished = true;
			return;
		}

		if (this.index < this.text.length) {
			if (this.text[this.index] === "<") {
				let tagEnd = this.text.indexOf(">", this.index);
				if (tagEnd !== -1) {
					this.tempHTML += this.text.substring(this.index, tagEnd + 1);
					this.index = tagEnd + 1;
				}
			} else {
				this.tempHTML += this.text[this.index];
				this.index++;
			}

			this.targetElement.innerHTML = this.tempHTML;
			this.timeoutID = setTimeout(() => this.type(), this.speed);
		} else {
			this.finished = true;
		}
	}

	finish() {
		this.stopped = true;
		if (this.timeoutID) {
			clearTimeout(this.timeoutID);
		}
		this.targetElement.innerHTML = this.text;
		this.finished = true;
	}

	isFinished() {
		return this.finished;
	}
}

function finishTyping() {
	tw.finish();
	if (tw.isFinished()) {
		console.log("The text has finished typing.");
	}
}
