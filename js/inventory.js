class inventory {
	constructor(innerInventory) {
		this.innerInventory = Array(16).fill(null);

		this.items = {
			can: "media/img/items/energycan.png",
			page: "media/img/items/page.png",
			letterOpener: "media/img/items/letterOpener.png",
            secretIngredient: "media/img/items/page.png",
            page1: "media/img/items/page.png",
            page2: "media/img/items/page.png",
			bandage: "media/img/items/smallMedpack.png",
			key: "media/img/items/key1.png"
		};
		this.loadInventory();
	}

	//load the players inventory
	async loadInventory() {
		let id = localStorage.getItem("userId");
		let selectQuery = `SELECT i.itemName, ui.quantity FROM USER_INVENTORY ui JOIN INVENTORY i ON ui.inventoryID = i.inventoryID WHERE ui.userID = ${id};`;
		let insertQuery = `
    			INSERT INTO USER_INVENTORY (userID, inventoryID, quantity) 
    			SELECT '${id}', inventoryID, 0 
    			FROM INVENTORY
    			WHERE inventoryID NOT IN (
        		SELECT inventoryID FROM USER_INVENTORY WHERE userID = '${id}'
    			);`;
		dbConfig.set("query", selectQuery);
		try {
			let response = await fetch(dbConnectorUrl, {
				method: "POST",
				body: dbConfig,
			});

			let result = await response.json();

			if (result.success && result.data.length > 0) {
				let inventory = result.data.map((item) => item.itemName);
				let iQuantity = result.data.map((item) => item.quantity);

				console.log("Inventory quantity:", iQuantity);
				console.log("Inventory data loaded:", inventory);

				this.innerInventory = this.fillInventory(inventory, iQuantity);
				this.renderInventory();
			} else {
				//create empty inventory if no data is found
				dbConfig.set("query", insertQuery);
				try {
					let response = await fetch(dbConnectorUrl, {
						method: "POST",
						body: dbConfig,
					});

					let result = await response.json();
					if (result.success) {
						this.renderInventory();
					} else {
						console.error("Error creating empty inventory:", result.message);
					}
				} catch (error) {
					console.error("Error completing load:", error);
				}
			}
		} catch (error) {
			console.error("Error completing load:", error);
		}
	}

	fillInventory(fetchedItems, quantities) {
		console.log("Fetched items:", fetchedItems);
		console.log("Quantities:", quantities);
		console.log("Available items mapping:", this.items);

		const inventory = Array(16).fill(null);

		fetchedItems.forEach((itemName, index) => {
			let quantity = quantities[index];

			for (let i = 0; i < quantity; i++) {
				let emptySlot = inventory.indexOf(null);
				if (emptySlot !== -1) {
					inventory[emptySlot] = this.items[itemName] || null;
				} else {
					console.warn(`No space left for item: ${itemName}`);
					break;
				}
			}
		});
		return inventory;
	}

	renderInventory() {
		let outerInventory = document.getElementById("inventory");
		outerInventory.innerHTML = "";
		for (let i = 0; i < this.innerInventory.length; i++) {
			const cell = document.createElement("div");
			cell.classList.add("cell");

			if (this.innerInventory[i]) {
				const img = document.createElement("img");
				img.src = this.innerInventory[i];
				img.alt = "Item";
				img.draggable = true;

				img.id = `item-${i}`;
				img.addEventListener("dragstart", this.drag);
				img.setAttribute(
					"data-item",
					Object.keys(this.items).find((key) => this.items[key] === this.innerInventory[i])
				);

				cell.appendChild(img);
			}

			outerInventory.appendChild(cell);
		}
		const selectedItemCell = document.getElementById("selectedItem");
		selectedItemCell.addEventListener("dragover", this.allowDrop);
		selectedItemCell.addEventListener("drop", (event) => this.drop(event));
		sessionStorage.removeItem("selectedItem");
		this.updateStorage();
		console.log("sessionStorage", sessionStorage.getItem("inventory"));
	}

	addItem(itemName) {
		const emptySlot = this.innerInventory.indexOf(null);
		if (emptySlot !== -1) {
			this.innerInventory[emptySlot] = this.items[itemName];

			this.renderInventory();
		} else {
			alert("Inventory is full!");
		}
	}

	saveInventoryToDB() {
		console.log("Saving inventory to DB...");
		console.log("Inventory data:", this.innerInventory);
		let id = localStorage.getItem("userId");

		let itemCounts = {};
		this.innerInventory.forEach((imgPath) => {
			if (imgPath) {
				//make image path into the item key
				let itemKey = Object.keys(this.items).find((key) => this.items[key] === imgPath);
				if (itemKey) {
					itemCounts[itemKey] = (itemCounts[itemKey] || 0) + 1;
				} else {
					console.warn(`No matching item key for image path: ${imgPath}`);
				}
			}
		});

		console.log("Item counts:", itemCounts);

		Object.keys(itemCounts).forEach((itemKey) => {
			let quantity = itemCounts[itemKey];
			//make query ned to change the userID to the current user
			let sqlQuery = `
				INSERT INTO USER_INVENTORY (userID, inventoryID, quantity)
				VALUES (
					${id},
					(SELECT inventoryID FROM INVENTORY WHERE itemName = '${itemKey}'),
					${quantity}
				)
				ON DUPLICATE KEY UPDATE quantity = ${quantity};
			`;

			dbConfig.set("query", sqlQuery);

			//query db
			fetch(dbConnectorUrl, {
				method: "POST",
				body: dbConfig,
			})
				.then((response) => response.json())
				.then((result) => {
					if (result.success) {
						console.log(`Successfully updated inventory for item '${itemKey}' with quantity ${quantity}`);
					} else {
						console.error(`Error updating inventory for item '${itemKey}':`, result.message);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		});
	}

	//drag drop functionality

	deleteItem(itemName) {
		//this is for deleting an item that hasn't been selected
		const itemIndex = inventory.findIndex((imgPath) => imgPath === items[itemName]);
		if (itemIndex !== -1) {
			inventory[itemIndex] = null;
			this.updateStorage();
			this.renderInventory();
		}
	}
	deleteSelectedItem(itemName) {
		//this is for deleting an item that hasn't been selected
		const selectedItemCell = document.getElementById("selectedItem");

		// Check if there's an image inside the selected item cell
		const selectedItemImg = selectedItemCell.querySelector("img");

		if (selectedItemImg) {
			selectedItemCell.removeChild(selectedItemImg);
		}
	}
	updateStorage() {
		sessionStorage.setItem("inventory", JSON.stringify(this.innerInventory));
	}
	useItem() {
		//how it should be for can as this updates the db of the item used deleted on use
		//for item order refresh page and item order updates
		//u will need to add the logic for pages with info on them
		console.log("Use Item()");
		let itemName = this.getSelectedItem();
		if (itemName == "can") {
			this.deleteSelectedItem(itemName);
			this.updateStorage();
			this.saveInventoryToDB();
		}
		if (itemName == "healthPotion") {
			this.deleteSelectedItem(itemName);
		}
		if (itemName == "secretIngredient") {
			openDocument("secretIngredient");
			this.removeItem();
		}
	}
	removeItem() {
		document.getElementById("selectedItem").innerHTML = "";
		this.renderInventory();
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

			const draggedIndex = Number(data.split("-")[1]);
			this.innerInventory[draggedIndex] = null;

			this.updateStorage();
			this.renderInventory();
		}
	}
	getSelectedItem() {
		const selectedItemCell = document.getElementById("selectedItem");
		const selectedItemImg = selectedItemCell.querySelector("img");
		return selectedItemImg ? selectedItemImg.getAttribute("data-item") : null;
	}
	findItem(itemName) {
		return this.innerInventory.includes(this.items[itemName]);
	}



	// // Add these new methods
    // markAsCollected(roomId, itemName) {
    //     if (!this.collectedItems[roomId]) this.collectedItems[roomId] = [];
    //     if (!this.collectedItems[roomId].includes(itemName)) {
    //         this.collectedItems[roomId].push(itemName);
    //         sessionStorage.setItem("collectedItems", JSON.stringify(this.collectedItems));
    //     }
    // }

    // isCollected(roomId, itemName) {
    //     return this.collectedItems[roomId] && this.collectedItems[roomId].includes(itemName);
    // }// Add this method to prevent recollecting items
    hasItemCollected(itemName) {
        return this.innerInventory.includes(this.items[itemName]);
    }
	

	markAsCollected(room, itemKey) {
		const key = `${room}_${itemKey}`;
		const collected = JSON.parse(sessionStorage.getItem('collectedItems') || '{}');
		collected[key] = true;
		sessionStorage.setItem('collectedItems', JSON.stringify(collected));
	}
	 
	isCollected(room, itemKey) {
		const key = `${room}_${itemKey}`;
		const collected = JSON.parse(sessionStorage.getItem('collectedItems') || '{}');
		return !!collected[key];
	}
}