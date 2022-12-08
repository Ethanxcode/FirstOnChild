var justDroppedItems = [];

const formatter = new Intl.NumberFormat('it-IT', {
	style: 'currency',
	currency: 'VND',

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function displayCartTable(datas) {
	var list = document.getElementById('justDropped');

	var htmls = datas;
	list.innerHTML = htmls.join(' ');
}

let apiUrl = `http://localhost:3000/api/products`;

function start() {
	getData(displayCartTable);
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
			// 'Content-Type': 'application/x-www-form-urlencoded',
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
		.then(function () {
			// displayCartTable('justDropped', data, 100);
			var data = this.data(id);
			var itemData = document.querySelector('.shop-iphone--item');
			if (data || itemData) {
				itemData.remove();
			}
		});
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
		createData(formData, function () {
			getData((data) => {
				displayCartTable('justDropped', data, 100);
			});
		});
	};
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
