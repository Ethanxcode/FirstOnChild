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

	datas.forEach((data) => {
		if (
			(data.email === username && data.password === password) ||
			(data.email === username && data.password === password)
		) {
			let Success = false;
			console.log(datas);
			alert('dang nhap thanh cong');
			Success = true;
			// window.location.href = `./index.html`;
			return Success;
		}
	});

	if (!Success) {
		getUserFromDB();
		datas.forEach((user) => {
			if (
				user.username === username ||
				(user.name === email && user.password === password)
			) {
				Success = true;
				// window.location.href = `./index.html`;
				console.log('thanh cong');
				return Success;
			}
		});
	}
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
