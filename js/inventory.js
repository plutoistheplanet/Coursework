class inventory{
    constructor(innerInventory){
        this.innerInventory = JSON.parse(sessionStorage.getItem("inventory")) || Array(16).fill(null); //Change this to get from database
        this.items = {
            "can": "media/img/items/energycan.png",
            "page": "media/img/items/page.png",
            "bandage": "media/img/items/smallMedpack.png",
            "paper1": "media/img/items/page.png",
            "paper2": "media/img/items/page.png"
        };
    }  
    renderInventory(){
        let outerInventory = document.getElementById("inventory");
        outerInventory.innerHTML = "";
        for(let i=0;i<this.innerInventory.length;i++){
            const cell = document.createElement("div");
            cell.classList.add("cell");

    
            if (this.innerInventory[i]) {
                const img = document.createElement("img");
                img.src = this.innerInventory[i];
                img.alt = "Item";
                img.draggable = true;

                img.id = `item-${i}`;
                img.addEventListener("dragstart", this.drag);
                img.setAttribute("data-item", Object.keys(this.items).find(key => this.items[key] === this.innerInventory[i]));


                cell.appendChild(img);
            }
    
            outerInventory.appendChild(cell);
        }
        
        // Enable #selectedItem as a drop zone
        const selectedItemCell = document.getElementById("selectedItem");
        selectedItemCell.addEventListener("dragover", this.allowDrop);
        selectedItemCell.addEventListener("drop", (event) => this.drop(event));
    }
    addItem(itemName){
        const emptySlot = this.innerInventory.indexOf(null);
        if (emptySlot !== -1) {
            this.innerInventory[emptySlot] = this.items[itemName];
            this.updateStorage();
            this.renderInventory();
        } else {
            alert("Inventory is full!");
        }
    }
    deleteItem(itemName){ //this is for deleting an item that hasn't been selected
        const itemIndex = inventory.findIndex(imgPath => imgPath === items[itemName]);
        if (itemIndex !== -1) {
            inventory[itemIndex] = null;
            this.updateStorage();
            this.renderInventory();
        }
    }
    deleteSelectedItem(itemName){ //this is for deleting an item that hasn't been selected
        const selectedItemCell = document.getElementById("selectedItem");

        // Check if there's an image inside the selected item cell
        const selectedItemImg = selectedItemCell.querySelector("img");

        if (selectedItemImg) {
            selectedItemCell.removeChild(selectedItemImg); // Remove the selected item
        }
    }
    updateStorage() {
        sessionStorage.setItem("inventory", JSON.stringify(this.innerInventory)); //Change this to use database instead
    }
    useItem(){
        console.log("Use Item()");
        let itemName = this.getSelectedItem();
        if(itemName == "can"){
            
        }
        if(itemName == "page"){
            
        }
        if(itemName == "healthPotion"){
            
        }
        if(itemName != null){
            this.deleteSelectedItem(itemName);
        }
    }
    drag(event) {
        event.dataTransfer.setData("text", event.target.id);
    }
    allowDrop(event) {
        event.preventDefault(); // Necessary to allow dropping
    }
    drop(event) {
        event.preventDefault();

        const data = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(data);

        const selectedItemCell = document.getElementById("selectedItem");
        if (!selectedItemCell.querySelector("img")) {
            const clonedElement = draggedElement.cloneNode(true); // Clone to retain data
            selectedItemCell.appendChild(clonedElement);

            const draggedIndex = Number(data.split('-')[1]);
            this.innerInventory[draggedIndex] = null;

            this.updateStorage();
            this.renderInventory();
        }
    }
    getSelectedItem() {
        console.log("getSelectedItem() fired");
        const selectedItemCell = document.getElementById("selectedItem");
        const selectedItemImg = selectedItemCell.querySelector("img");
        return selectedItemImg ? selectedItemImg.getAttribute("data-item") : null;
    }
}

