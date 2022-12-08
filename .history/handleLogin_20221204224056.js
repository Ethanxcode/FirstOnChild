let userApi = `http://localhost:3000/api/users`;

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

function handleLogin() {
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	datas.forEach((data) => {});
}
