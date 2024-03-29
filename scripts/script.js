
let menuType = '';
let amountOfMenuItems = 0;
let uniqueIdentifier = 0;
let optionsMenuFlag = false;

let menuItems = document.getElementById("amountOfItems");
let typeOfMenu = document.getElementById("menus");
let xml = document.getElementById('xml');
let items = document.getElementById("items");
let itemsForm = document.getElementById("itemForm");
let inputMenuItems = document.getElementById("menuItems");
let showAsActionSelect;

function showAmountOfMenuItems() {
	menuItems.style.visibility = "visible";
	menuType =  typeOfMenu.value;
	optionsMenuFlag = menuType === "Options";
}

function createMenuItems() {

	let showAsActionLabel;
	let wrapperShowAsActionDiv;
	
	itemForm.innerHTML = '';
	items.style.visibility = 'visible';
	amountOfMenuItems = document.getElementById("menuItems").value;
	
	for(let i = 0; i < amountOfMenuItems; i++) {
		let idLabel = document.createElement('label');
		idLabel.innerHTML = 'Item ID:';
		let idInput = document.createElement("input");
		idInput.setAttribute('type', 'text');
		idInput.setAttribute('class', ITEM_ID);
		idInput.setAttribute('id', ITEM_ID + '_' + uniqueIdentifier);

		let wrapperIDDiv = document.createElement('div');
		wrapperIDDiv.setAttribute('class', 'formItem');
		wrapperIDDiv.appendChild(idLabel);
		wrapperIDDiv.appendChild(idInput);

		let iconLabel = document.createElement('label');
		iconLabel.innerHTML = 'Item Icon:';
		let iconInput = document.createElement("input");
		iconInput.setAttribute('type', 'file');
		iconInput.setAttribute('class', ITEM_ICON);
		iconInput.setAttribute('id', ITEM_ICON + '_' + uniqueIdentifier);

		let wrapperIconDiv = document.createElement('div');
		wrapperIconDiv.setAttribute('class', 'formItem');
		wrapperIconDiv.appendChild(iconLabel);
		wrapperIconDiv.appendChild(iconInput);

		let titleLabel = document.createElement('label');
		titleLabel.innerHTML = 'Item Title:';
		let titleInput = document.createElement("input");
		titleInput.setAttribute('type', 'text');
		titleInput.setAttribute('class', ITEM_TITLE);
		titleInput.setAttribute('id', ITEM_TITLE + '_' + uniqueIdentifier);

		let wrapperTitleDiv = document.createElement('div');
		wrapperTitleDiv.setAttribute('class', 'formItem');
		wrapperTitleDiv.appendChild(titleLabel);
		wrapperTitleDiv.appendChild(titleInput);


		//Add android:showAsAction attribute
		if (optionsMenuFlag) {
			showAsActionLabel = document.createElement('label');
			showAsActionLabel.innerHTML = "Show As Action";
			showAsActionSelect = document.createElement('select');
			showAsActionSelect.setAttribute('name', 'showAsActionSelect');
			
			let showAsActionOption = document.createElement('option');
			showAsActionOption.disabled = true;
			showAsActionOption.value = '';
			showAsActionOption.innerHTML = '-- Select an option --';
			showAsActionOption.selected = true;
			showAsActionSelect.appendChild(showAsActionOption);

			for (let i = 0; i < SHOW_AS_VALUES.length; i++) {
				
				showAsActionOption = document.createElement('option');
				showAsActionOption.value = SHOW_AS_VALUES[i];
				showAsActionOption.innerHTML = SHOW_AS_VALUES[i];

				showAsActionSelect.appendChild(showAsActionOption);
			}

			wrapperShowAsActionDiv = document.createElement('div');
			wrapperShowAsActionDiv.setAttribute('class', 'formItem');
			wrapperShowAsActionDiv.appendChild(showAsActionLabel);
			wrapperShowAsActionDiv.appendChild(showAsActionSelect);
		}

		itemForm.appendChild(wrapperIDDiv);
		itemForm.appendChild(wrapperIconDiv);
		itemForm.appendChild(wrapperTitleDiv);


		if (optionsMenuFlag) {
			itemForm.appendChild(wrapperShowAsActionDiv);
		}

		itemForm.appendChild(document.createElement('br'));
		uniqueIdentifier++;
	}
}


function generateMenu() {
	if (menuType === '' || amountOfMenuItems === 0) {
		return;
	}
   
	let generatedXML = PREFIX;
	let startingId = uniqueIdentifier - amountOfMenuItems;
	
	for (let i = startingId; i < amountOfMenuItems; i++) {
	   	let menuItemId = document.getElementById(ITEM_ID + '_' + i);
		let menuItem = '';

	   	if (menuItemId.value) {
   			menuItem = '\t \t \t \t <item android:id="@+id/'  + menuItemId.value + "\"\n ";
	   	}
	   
	   	let menuItemIcon = document.getElementById(ITEM_ICON + '_' + i);

	   	if (menuItemIcon.value) {
   			menuItem += '\t \t \t \t android:icon="' + menuItemIcon.value + "\"" + "\n ";
	   	}

	   	let menuItemTitle = document.getElementById(ITEM_TITLE + '_' + i);

	   	if (menuItemTitle.value) {
		   	menuItem += '\t \t \t \t android:title="' + menuItemTitle.value + "\"" + "\n";
	   	}

	   	if (optionsMenuFlag) {
		   	menuItem += '\t \t \t \t android:showAsAction="' + showAsActionSelect.value + "\"" + "\n";
	   	}

	   	menuItem += '\t \t \t \t />' + "\n";

	   	generatedXML += menuItem;
	   	menuItem = '';
   	}

   	xml.innerHTML = generatedXML + ' \t \t \t \t </menu>';
}



function copyText() {
	xml.select();
  	document.execCommand(COPY_ACTION);
}

function reset() {
	itemsForm.innerHTML = "";
	let menuType = '';
	let amountOfMenuItems = 0;
	let uniqueIdentifier = 0;
	let optionsMenuFlag = false;
	typeOfMenu.selectedIndex = 0;
	inputMenuItems.value = "";
}

function setCopyrightYear() {
    const copyrightSpan = document.getElementById("copyright");
    const currentYear = new Date().getFullYear();
    copyrightSpan.innerHTML += currentYear + " ";
}

setCopyrightYear();