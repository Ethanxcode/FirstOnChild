let userApi = `http://localhost:3000/api/users`;

function getUserFromDB() {
	fetch(userApi)
		.then((res) => {
			return res.json();
		})
		.then(callback)
		.catch((error) => {
			console.log(error);
		});
}
