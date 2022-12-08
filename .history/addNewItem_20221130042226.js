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
            <button onclick="handleDeleteData(${
							dataItems[item].id
						})">Xóa</button>
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
		console.log(data);
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
	fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify(data),
	})
		.then((res) => {
			res.json();
		})
		.then((data) => {
			console.log('Success:', data);
		})
		.then(callback)
		.catch((error) => {
			console.error('Error:', error);
		});
}

function handleCreaterForm() {
	var createBtn = document.querySelector('#createNewItem');
	createBtn.onclick = function () {
		var name = document.querySelector('input[name="name"]').value;
		var price = document.querySelector('input[name="price"]').value;
		var status = document.querySelector('select[name="newItemSelect"]').value;
		var brand = document.querySelector('input[name="brands"]').value;
		var sold = document.querySelector('input[name="sold"]').value;
		var category = document.querySelector('input[name="category"]').value;
		var image = document.querySelector('input[name="image"]').value;
		var description = document.querySelector('input[name="description"]').value;

		// console.log(status, brand, sold, category, image, description);
		var formData = {
			nameItem: name,
			itemPrice: price,
			status: status,
			brand: brand,
			sold: sold,
			itemCategory: category,
			itemImage: image,
			itemDescription: description,
		};
		createData(formData);
	};
}

function handleDeleteData(id) {
	fetch(apiUrl + '/' + id, {
		method: 'DELETE',
		header: {
			'Content-Type': 'application/json; charset=UTF-8',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then((res) => {
			res.json();
		})
		.then((data) => {
			console.log('Success:', data);
		})
		.then(callback)
		.catch((error) => {
			console.error('Error:', error);
		});
}
// function upload(id) {
// 	const formData = new FormData();
// 	const fileField = document.querySelector('input[type="file"]');

// 	formData.append('username', 'abc123');
// 	formData.append('avatar', fileField.files[0]);

// 	fetch(apiUrl + '/' + id, {
// 		method: 'PUT',
// 		body: formData,
// 	})
// 		.then((response) => response.json())
// 		.then((result) => {
// 			console.log('Success:', result);
// 		})
// 		.catch((error) => {
// 			console.error('Error:', error);
// 		});
// }
// upload();
// function checkingImageUpload(image) {
// 	fetch(image)
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw new Error('Network response was not OK');
// 			}
// 			return response.blob();
// 		})
// 		.then((myBlob) => {
// 			myImage.src = URL.createObjectURL(myBlob);
// 		})
// 		.catch((error) => {
// 			console.error(
// 				'There has been a problem with your fetch operation:',
// 				error,
// 			);
// 		});
// }
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
