let userApi = `http://localhost:3000/api/users`;

function startLogin() {
	getUserFromDB(handleLogin);
}

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
	let Success = false;
	datas.forEach((data) => {
		if (data.username === username && data.password === password) {
			alert('dang nhap thanh cong');
			Success = true;
			window.location.href = `./index.html`;
			return Success;
		}
	});

	if (!!Success) {
		getUserFromDB();
		users.forEach((user) => {
			if (
				user.username === username ||
				(user.name === email && user.password === password)
			) {
				Success = true;
				window.location.href = `./index.html`;
				console.log('thanh cong');
				return Success;
			}
		});
	}
}

function createUser(data) {
	fetch(userApi, { method: 'POST', header });
}
