class TypeWriter {
  constructor(targetID, text, speed = 20) {
    this.targetElement = document.getElementById(targetID);
    this.text = text;
    this.speed = speed;
    this.index = 0;
    this.tempHTML = "";
    this.timeoutID = null;
    this.stopped = false;
    this.finished = false; // Tracks whether the typing has finished
  }

  start() {
    // Reset all instance variables
    this.targetElement.innerHTML = "";
    this.index = 0;
    this.tempHTML = "";
    this.stopped = false;
    this.finished = false;
    this.type();
  }

  type() {
    if (this.stopped) {
      // If typing was stopped, complete immediately.
      this.targetElement.innerHTML = this.text;
      this.finished = true;
      return;
    }

    if (this.index < this.text.length) {
      // Handle HTML tags without delay.
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
      // Schedule next character
      this.timeoutID = setTimeout(() => this.type(), this.speed);
    } else {
      // Typing is finished when all characters have been processed.
      this.finished = true;
    }
  }

  finish() {
    // Stop the typing effect and complete text instantly.
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

// Later, if you want to immediately finish:
function finishTyping() {
  tw.finish();
  if (tw.isFinished()) {
    console.log("The text has finished typing.");
  }
}
