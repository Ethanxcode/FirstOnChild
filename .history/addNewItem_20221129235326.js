let apiUrl = `http://localhost:3000/api/products`;

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
