// ************************************************
// Shopping Cart API
// ************************************************
var promise = new Promise(function (resolve) {
	setTimeout(resolve, 1000);
});

promise.then(function () {
	var shoppingCart = (function () {
		cart = [];
		// Private methods and propeties

		//Constructor
		function items(
			id,
			name,
			price,
			count,
			image,
			status,
			itemCategory,
			brands,
		) {
			this.id = id;
			this.name = name;
			this.price = price;
			this.count = count;
			this.image = image;
			this.status = status;
			this.itemCategory = itemCategory;
			this.brands = brands;
		}

		// save cart
		function saveCart() {
			sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
			sessionStorage.setItem('User', JSON.stringify(user));
			window.addEventListener('beforeunload', function (e) {
				e.preventDefault();
				handleUpdateCartData(user);
				var confirmationMessage = 'o/';

				(e || window.event).returnValue = confirmationMessage; //Gecko + IE
				return confirmationMessage; //Webkit, Safari, Chrome
			});

			// console.log(user);
		}

		// load cart
		function loadUser() {
			user = JSON.parse(sessionStorage.getItem('User'));
		}
		var online;
		function loadCart() {
			cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
			user = JSON.parse(sessionStorage.getItem('User'));

			if (user.userProduct == 0) {
				online = false;
			}
			cart.push(user.userProduct);
			// cart.forEach((e) => {
			// 	user.cart.push(e);
			// });
			// if (cart.length == 0) {
			// 	user.cart = [];
			// }
		}
		if (sessionStorage.getItem('shoppingCart') != null) {
			loadCart();
		} else {
			loadUser();
		}

		// function createCartData(data, callback) {
		// 	fetch(userApi, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			// 'Content-Type': 'application/x-www-form-urlencoded',
		// 		},
		// 		body: JSON.stringify(data.cart),
		// 	})
		// 		.then((res) => {
		// 			res.json();
		// 		})
		// 		.then((data) => {
		// 			console.log('Success:', data);
		// 		})
		// 		.then(callback)
		// 		.catch((error) => {
		// 			console.error('Error:', error);
		// 		});
		// }
		// function handleUpdateCartData(data, callback) {
		// 	// var id = data.id;
		// 	fetch(userApi + '/' + data.id, {
		// 		method: 'PUT',
		// 		body: data,
		// 	})
		// 		.then((res) => {
		// 			res.json();
		// 		})
		// 		.then((data) => {
		// 			console.log('Success:', data);
		// 		})
		// 		.then(callback)
		// 		.catch((error) => {
		// 			console.error('Error:', error);
		// 		});
		// }

		// window.addEventListener(
		// 	'beforeunload',
		// 	function (e) {
		// 		// e.preventDefault();
		// 		handleUpdateCartData(user);
		// 	},
		// 	false,
		// );

		function handleUpdateCartData(data, callback) {
			let userApi = `http://localhost:3000/api/users`;
			fetch(userApi + '/' + data.id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
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

		// public methods and porpeties

		var obj = {};

		//add to cart
		obj.addItemToCart = (
			id,
			name,
			price,
			count,
			image,
			status,
			itemCategory,
			brands,
		) => {
			console.log(user);
			if (user == null) {
				for (var item in cart) {
					if (cart[item].id === id) {
						cart[item].count++;
						saveCart();
						return;
					}
				}
			} else {
				for (var item in user.userProduct) {
					if (user.userProduct[item].id === id) {
						user.userProduct[item].count++;
						saveCart();
						return;
					}
				}
			}

			var item = new items(
				id,
				name,
				price,
				count,
				image,
				status,
				itemCategory,
				brands,
			);
			if (user != null && cart == null) {
				user.userProduct.push(item);
			} else {
				cart.push(item);
			}
			saveCart();
		};

		// set count from item

		obj.setCountForItem = (id, count) => {
			if (user == null) {
				for (var i in cart) {
					if (cart[i].id === id) {
						cart[i].count = count;
						break;
					}
				}
			} else {
				for (var i in user.userProduct) {
					if (user.userProduct[i].id === id) {
						user.userProduct[i].count = count;
						break;
					}
				}
			}
		};

		// remove item from cart

		obj.removeItemFromCart = (id) => {
			if (user == null) {
				for (var item in cart) {
					if (cart[item].id === id) {
						cart[item].count--;
						if (cart[item].count === 0) {
							cart.splice(item, 1);
							// user.cart.splice(item, 1);
						}
						break;
					}
				}
			} else {
				for (var item in user.userProduct) {
					if (user.userProduct[item].id === id) {
						user.userProduct[item].count--;
						if (user.userProduct[item].count === 0) {
							user.userProduct.splice(item, 1);
						}
						break;
					}
				}
			}
			saveCart();
		};

		//remove all items from cart
		obj.removeItemFromCartAll = (id) => {
			if (user == null) {
				for (var item in cart) {
					if (cart[item].id === id) {
						cart.splice(item, 1);
						// user.cart.splice(item, 1);
						break;
					}
				}
			} else {
				for (var item in user.userProduct) {
					if (user.userProduct[item].id === id) {
						// cart.splice(item, 1);
						user.userProduct.splice(item, 1);
						break;
					}
				}
			}
			saveCart();
		};

		//clear cart
		obj.clearCart = () => {
			cart = [];
			user.userProduct = [];
			saveCart();
		};

		// count total items in cart
		obj.totalCount = () => {
			var totalCount = 0;
			if (user.userProduct == null) {
				for (var item in cart) {
					totalCount += cart[item].count;
				}
			} else {
				for (var item in user.userProduct) {
					totalCount += user.userProduct[item].count;
				}
			}
			return totalCount;
		};

		// Create our number formatter.
		const formatter = new Intl.NumberFormat('it-IT', {
			style: 'currency',
			currency: 'VND',

			// These options are needed to round to whole numbers if that's what you want.
			//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
			//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
		});

		// console.log(formatter.format(2500)); /* $2,500.00 */

		// total cart

		var copyTotal = 0;

		obj.totalCart = () => {
			var totalCart = 0;
			if (user == null) {
				for (var item in cart) {
					totalCart += cart[item].price * cart[item].count;
				}
			} else {
				for (var item in user.userProduct) {
					totalCart +=
						user.userProduct[item].price * user.userProduct[item].count;
				}
			}
			copyTotal = totalCart;
			return formatter.format(Number(totalCart.toFixed(2)));
			// return formatter.format(totalCart);
		};

		// console.log(totalCart);

		// var finalCart;
		var itemCopy;
		obj.finalCart = () => {
			var finalCart = 0;
			var shippingFee = 0;
			const choice = mySelect.value;
			if (choice == '') {
				shippingFee = 0;
			} else if (choice == 1) {
				shippingFee = 20;
			} else if (choice == 2) {
				shippingFee = 50;
			} else if (choice == 3) {
				shippingFee = 100;
			}
			// console.log(copyTotal);
			// console.log((finalCart = copyTotal + shippingFee));
			finalCart = copyTotal + shippingFee;
			return $('.final-cart').html(
				formatter.format(Number(finalCart.toFixed(2))),
			);
		};

		// list cart
		obj.listCart = () => {
			var cartCopy = [];
			if (online == false) {
				console.log(!online);
				for (i in cart) {
					item = cart[i];
					itemCopy = {};
					for (p in item) {
						itemCopy[p] = item[p];
					}
					itemCopy.total = formatter.format(
						Number(item.price * item.count).toFixed(2),
					);
					cartCopy.push(itemCopy);
				}
			} else {
				for (i in user.userProduct) {
					item = user.userProduct[i];
					itemCopy = {};
					for (p in item) {
						itemCopy[p] = item[p];
					}
					itemCopy.total = formatter.format(
						Number(item.price * item.count).toFixed(2),
					);
					cartCopy.push(itemCopy);
				}
			}
			return cartCopy;
		};
		// cart : Array
		// Item : Object/Class
		// addItemToCart : Function
		// removeItemFromCart : Function
		// removeItemFromCartAll : Function
		// clearCart : Function
		// countCart : Function
		// totalCart : Function
		// listCart : Function
		// saveCart : Function
		// loadCart : FunctionmCopy = {};
		return obj;
	})();

	// *****************************************
	// Triggers / Events
	// *****************************************
	// Add item
	$('.add-to-cart').click(function (event) {
		var id = $(this).data('id');
		var name = $(this).data('name');
		var price = Number($(this).data('price'));
		var image = $(this).data('image');
		var status = $(this).data('status');
		var itemCategory = $(this).data('itemCategory');
		var brands = $(this).data('brands');
		shoppingCart.addItemToCart(
			id,
			name,
			price,
			1,
			image,
			status,
			itemCategory,
			brands,
		);
		showSuccesToast();
		displayCart();
	});

	$('.clear-cart').click(function (event) {
		shoppingCart.clearCart();
		displayCart();
	});

	function displayCart() {
		var cartArray = shoppingCart.listCart();
		var output = '';
		for (var i in cartArray) {
			output +=
				'<tr>' +
				'<td>' +
				'<div class="row mb-4 d-flex justify-content-between align-items-center">' +
				'<div class="col-md-2 col-lg-2 col-xl-2"> <img src="' +
				cartArray[i].image +
				'" class="img-fluid rounded-3" alt="Cotton T-shirt"></div>' +
				'<div class="col-md-3 col-lg-3 col-xl-3"><h6 class="text-muted text-uppercase">' +
				cartArray[i].id +
				'</h6><h6 class="text-black mb-0">' +
				cartArray[i].name +
				'</h6>' +
				'</div>' +
				'<div class="col-md-3 col-lg-3 col-xl-2 d-flex w-25">' +
				'<button class="btn px-2 text-decoration-none minus-item input-group-addon" data-id=' +
				cartArray[i].id +
				' data-namme=' +
				cartArray[i].name +
				'>-</button>' +
				'<input value="' +
				cartArray[i].count +
				'" type="number" class="form-control form-control-sm  item-count w-50" />' +
				'<button class="btn  px-2 text-decoration-none plus-item input-group-addon" data-id=' +
				cartArray[i].id +
				' data-namme=' +
				cartArray[i].name +
				'>+</button>' +
				'</div>' +
				'<div class="col-md-3 col-auto">' +
				'<h6 class="mb-0">' +
				formatter.format(cartArray[i].price) +
				'</h6>' +
				'</div>' +
				'<div class="col-md-1 col-lg-1 col-xl-1 text-end">' +
				'<button class="delete-item btn btn-danger" data-id="' +
				cartArray[i].id +
				'">X</button>' +
				'</div>' +
				'</div>' +
				'</td>' +
				'</tr>';
		}

		$('.show-cart').html(output);
		$('.total-cart').html(shoppingCart.totalCart());
		$('.total-count').html(shoppingCart.totalCount());
		$('final-cart').html(shoppingCart.finalCart());
	}

	const mySelect = document.querySelector('select');

	// console.log(mySelect.value);
	mySelect.addEventListener('change', shoppingCart.finalCart);

	// Delete item button

	$('.show-cart').on('click', '.delete-item', function (event) {
		event.preventDefault();
		var name = $(this).data('name');
		var id = $(this).data('id');
		shoppingCart.removeItemFromCartAll(id);
		displayCart();
	});

	// -1
	$('.show-cart').on('click', '.minus-item', function (event) {
		event.preventDefault();
		var name = $(this).data('name');
		var id = $(this).data('id');
		shoppingCart.removeItemFromCart(id);
		displayCart();
	});
	// +1
	$('.show-cart').on('click', '.plus-item', function (event) {
		event.preventDefault();
		var name = $(this).data('name');
		var id = $(this).data('id');
		shoppingCart.addItemToCart(id);
		displayCart();
	});

	// Item count input
	$('.show-cart').on('change', '.item-count', function (event) {
		event.preventDefault();
		var name = $(this).data('name');
		var id = $(this).data('id');
		var count = Number($(this).val());
		shoppingCart.setCountForItem(id, count);
		displayCart();
	});

	displayCart();

	var count = 0;

	function showSuccesToast() {
		clearTimeout(timeout);
		var succes = document.querySelector('.showSuccesToast');
		succes.classList.add('d-flex');
		count++;
		console.log(count);
		if (count >= 5) {
			succes.classList.remove('d-flex');
			count = 0;
			return;
		}
		checkTime = setTimeout(showSuccesToast, 500);
	}
	// function showErrorToast() {
	// 	clearTimeout(timeout);
	// 	var error = document.querySelector('.showErrorToast');
	// 	error.classList.add('d-flex');
	// 	count++;
	// 	console.log(count);
	// 	if (count >= 5) {
	// 		error.classList.remove('d-flex');
	// 		count = 0;
	// 		return;
	// 	}
	// 	checkTime = setTimeout(showErrorToast, 500);
	// }
});
