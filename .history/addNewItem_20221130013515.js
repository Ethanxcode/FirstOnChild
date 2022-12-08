var justDroppedItems = [];

const formatter = new Intl.NumberFormat('it-IT', {
	style: 'currency',
	currency: 'VND',

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
            <button onlick="handleDeleteData(${
							dataItems[item].id
						}))">Xóa</button>
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
	getData((data) => {
		displayCartTable('justDropped', data, 100);
	});
	handleCreaterForm();
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
		header: {
			'Content-Type': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(data),
	};
	fetch(apiUrl, options)
		.then((res) => {
			res.json();
		})
		.then(callback);
}

function handleDeleteData(id) {
	var options = {
		method: 'DELETE',
		header: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	};
	fetch(apiUrl + '/' + id, options)
		.then((res) => {
			res.json();
		})
		.then(callback);
}

function handleCreaterForm() {
	var createBtn = document.querySelector('#createNewItem');
	createBtn.onclick = function () {
		var name = document.querySelector('input[name="name"]').value;
		var description = document.querySelector('input[name="description"]').value;
		var price = document.querySelector('input[name="price"]').value;
		var formData = {
			id: 'AirJordan4008',
			nameItem: name,
			itemPrice: price,
			status: 'good',
			brand: 'Nike',
			sold: 6,
			itemCategory: 'New',
			itemImage: './img/Pictures/Giày8.jpg',
			itemDescription: description,
		};
		createData(formData);
}
//  {
//       "id": "AirJordan4008",
//       "nameItem": "Country Blue",
//       "itemPrice": 1000000000,
//       "status": "good",
//       "brand": "Nike",
//       "sold": 6,
//       "itemCategory": "New",
//       "itemImage": "./img/Pictures/Giày8.jpg",
//       "itemDescription": "Release: 05/05/2021"
//     },

// handleCreaterForm();
