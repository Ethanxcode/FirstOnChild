let userApi = `http://localhost:3000/api/users`;

function startLogin() {
	getUserFromDB(handleLogin);
}

startLogin();

function getUserFromDB(callback) {
	fetch(userApi)
		.then((res) => {
			return res.json();
		})
		.then(callback)
		.catch((error) => {
			console.log(error);
		});
}

function handleLogin(datas) {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	console.log(datas);
	datas.forEach((data) => {
		if (
			(data.username === username && data.password === password) ||
			(data.email === username && data.password === password)
		) {
			// console.log(cartData);
			alert('dang nhap thanh cong');
			let user = {
				username: username.value,
				email: data.email,
				password: password.value,
				cart: data.userProduct,
			};
			saveUser(user);
		}
	});
	if (sessionStorage.getItem('user') != null) {
		loadCart();
	}
}

function saveUser(user) {
	sessionStorage.setItem('User', JSON.stringify(user));
}
// load cart
function loadUser() {
	cart = JSON.parse(sessionStorage.getItem('user'));
}

function createUser(data, callback) {
	fetch(userApi, {
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

function handleCreateForm() {
	let username = document.getElementById('username');
	let password = document.getElementById('password');
	let email = document.getElementById('email');
	let passwordConfirmed = document.getElementById('passwordConfirmed');
	let user = {
		username: username.value,
		email: email.value,
		password: password.value,
		cart: [],
	};
	createUser(user);
}
