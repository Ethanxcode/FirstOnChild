var justDroppedItems = [];

function displayCartTable(Categories, dataItems, quaitity) {
	var htmlItems = '';
	for (var item in dataItems) {
		var htmlItem = `<div class="col-xl-4 col-md-6 col-12">
		<div class="shop-iphone--item">
		    <div class="shop-iphone--item---iphone">
		        <img src="${dataItems[item].itemImage}" alt="">
		    </div>
		    <h5 class=" text-center">${dataItems[item].nameItem}</h5>
		    <h6> ${formatter.format(dataItems[item].itemPrice)}</h6>
		     <p> ${dataItems[item].itemDescription}</p>
		    <div class="row">
		    <div class="col-6 "><a href="#" 
			data-id="${dataItems[item].id}" data-name="${
			dataItems[item].nameItem
		}" data-price="${dataItems[item].itemPrice}" 
			 data-image="${
					dataItems[item].itemImage
				}" class="add-to-cart btn btn-outline-danger w-100">Add to
							cart</a></div>
		            <div class="col-6"><a href="#" class=" btn btn-outline-danger w-100">More</a></div>
		            </div>
			</div>
		</div>`;
		console.log(Categories);
		htmlItems += htmlItem;
		if (item == quaitity - 1) {
			break;
		}
	}
	document.getElementById(Categories).innerHTML = htmlItems;
}

let apiUrl = `http://localhost:3000/api/products`;

function start() {
	getData(displayCartTable('justDropped', justDroppedItems, 3));
}

start();

function getData(callback) {
	fetch(apiUrl)
		.then(function (res) {
			return res.json();
		})
		.then(callback);
}

function createData(data, callback) {
	var options = {
		method: 'POST',
		body: JSON.stringify(data),
	};
	fetch(apiUrl, options)
		.then((res) => {
			res.json();
		})
		.then(callback);
}

function handleCreaterForm() {
	var createBtn = document.querySelector('#createNewItem');
	createBtn.onclick = function () {
		var name = document.querySelector('input[name="name"]').value;
		var description = document.querySelector('input[name="Description"]').value;
		var formData = {
			name: name,
			description: description,
		};
		createData(formData);
	};
}

handleCreaterForm();
