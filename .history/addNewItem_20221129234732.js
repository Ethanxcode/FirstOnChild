// var divElement = document.createElement('Div');
// divElement.className = 'col';
// var anotherDiv = document.createElement('Div');
// anotherDiv.className = 'card';
// anotherDiv.style.width = '20rem';
// var imgElement = document.createElement('img');
// imgElement.className = 'card-img-top';
// imgElement.src = 'http://www.azspagirls.com/files/2010/09/orange.jpg';
// divElement.appendChild(anotherDiv);
// var anotherChillDiv = document.createElement('Div');
// anotherChillDiv.className = 'card-block';
// var h4Text = document.createElement('h4');
// h4Text.className = 'card-title';
// var h4Name = document.createTextNode('Ihpone 40 64gb');
// var pText = document.createElement('P');
// pText.className = 'card-text';
// var pContent = document.createTextNode('Price: 0.5');
// var aElement = document.createElement('a');
// var aContent = document.createTextNode('Add to cart');
// aElement.dataset.price = '0.5';
// aElement.dataset.name = 'Ihpone 40 64gb';
// aElement.classList = 'add-to-cart btn btn-primary';
// divElement.appendChild(anotherDiv);
// anotherDiv.appendChild(imgElement);
// anotherDiv.appendChild(anotherChillDiv);
// anotherChillDiv.appendChild(h4Text);
// h4Text.appendChild(h4Name);
// anotherChillDiv.appendChild(pText);
// pText.appendChild(pContent);
// anotherChillDiv.appendChild(aElement);
// aElement.appendChild(aContent);
// // Appending the div element to body

// // document.getElementById('test')[0].appendChild(divElement);
// document.getElementsByTagName('body')[0].appendChild(divElement);

let apiUrl = `http://localhost:3000/api/products`;

function createData(data) {
	var options = {
		method: 'POST',
		body: JSON.stringify(data),
	};
	fetch(apiUrl, options);
}

function handleCreaterForm() {
	var createBtn = document.querySelector('#createNewItem');
	createBtn.onclick = function () {
		var name = document.querySelector('input[name="name"]').value;
		var description = document.querySelector('input[name="description"]').value;
	};
}

handleCreaterForm();
