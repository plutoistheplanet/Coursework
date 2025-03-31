class gameDocument{
    constructor(option) {
        this.container = document.getElementById("container-document");
        this.documentContent = document.getElementById("documentContent");
        this.option = option;
    }

    startPopup(){
        console.log("Option:", this.option);
        let text = "null";
        if(this.option == "secretIngredient"){
            text = `TOP SECRET<br/><br/>
            The secret ingredient for the perfect Creme Brulee is - <br/><br/>Vanilla Extract from Madagascar.`;
        }
        if(this.option.document == "document1.txt"){
            text = `Document 1.<br/><br/>
            The secret passcode is 6930!`;
        }
        if(this.option.document == "IMPORTANTforCompanyEyesONLY.txt"){
            text = `<u>Ingredients:</u><br/>
            -2 cartons double cream<br/>
            -1 large (284ml) plus 1 small (142ml)<br/>
            -100ml whole milk<br/>
            -1 vanilla pod<br/>
            -5 egg yolks<br/>
            -50g golden caster sugar<br/>
            -plus extra for the topping<br/>
            -Super Secret Ingredient<br/>`;
        }
        if(this.option.document == "bigBadSecretPlans.txt"){
            text = `Blow up the world!`
        }
        if(this.option.document == "secretIngredient.txt"){
            text = `Note to self:<br/>
            I've hidden the secret ingredient in Room 2!.<br/>
            I'll only share it with those who know the passcode.<br/>
            The secret passcode is 6930!<br/>`;
        }
        this.loadText(text);
    }
    
    loadText(content) {
        this.container.style.display = "block";
        
        // Create a button to close the popup
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        
        // Add event listener to close the popup
        closeButton.addEventListener("click", () => {
            this.container.style.display = "none";
        });

        // Set the document content and append the close button
        this.documentContent.innerHTML = content;
        this.documentContent.appendChild(closeButton);
    }
}