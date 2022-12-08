// slider automatic and manual
var count;
let timeout;
let checkTime;

function checkTimeer() {
	clearTimeout(timeout);
	count++;
	console.log(count);
	if (count >= 5) {
		count = 0;
		showSlides();
		return;
	}
	checkTime = setTimeout(checkTimeer, 2000);
}

function plusSlides(n) {
	count = 0;
	showSlide((slideIndex += n));
	clearTimeout(checkTime);
	checkTimeer(count);
}

function currentSlide(n) {
	count = 0;
	showSlide((slideIndex = n));
	clearTimeout(checkTime);
	checkTimeer(count);
}
function showSlide(n) {
	let i;
	let slides = document.getElementsByClassName('mySlides');
	// let dots = document.getElementsByClassName('dot');
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	// for (i = 0; i < dots.length; i++) {
	// 	dots[i].className = dots[i].className.replace(' dot-active', '');
	// }
	slides[slideIndex - 1].style.display = 'block';
	// dots[slideIndex - 1].className += ' dot-active';
}

let slideIndex = 0;
showSlides();

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName('mySlides');
	// let dots = document.getElementsByClassName('dot');
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}
	slideIndex++;
	if (slideIndex > slides.length) {
		slideIndex = 1;
	}
	// for (i = 0; i < dots.length; i++) {
	// 	dots[i].className = dots[i].className.replace(' dot-active', '');
	// }
	slides[slideIndex - 1].style.display = 'block';
	// dots[slideIndex - 1].className += ' dot-active';
	timeout = setTimeout(showSlides, 5000); // Change image every 2 seconds
}

var justDroppedItems = [
	{
		id: 'NikeDunkLow001',
		nameItem: 'Reverse UNC',
		itemPrice: 120000000,
		itemType: 'Nike',
		itemImage: './img/Pictures/Giày2.jpg',
		itemDiscount: 'Release: 12/29/2022',
	},
	{
		id: 'NikeDunkLow002',
		nameItem: 'Fruity Pebbles',
		itemPrice: 5200000,
		itemType: 'Jordan',
		itemImage: './img/Pictures/Giày6.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
	{
		id: 'AirJordan1High85003',
		nameItem: 'Black/White',
		itemPrice: 120500,
		itemType: 'Nike',
		itemImage: './img/Pictures/Giày4.jpg',
		itemDiscount: 'Release: 06/23/2018',
	},
	{
		id: 'AirJordan4004',
		nameItem: 'Pink Riot',
		itemPrice: 1200,
		itemType: 'Jordan',
		itemImage: './img/Pictures/Giày1.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
	{
		id: 'NikeDunkLow005',
		nameItem: 'UCLA',
		itemPrice: 900,
		itemType: 'Nike',
		itemImage: './img/Pictures/Giày5.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
];

var latestNewsItems = [
	{
		id: 'AirJordan1Low006',
		nameItem: 'UNC',
		itemPrice: 50002200,
		itemType: 'Jordan',
		itemImage: './img/Pictures/Giày3.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
	{
		id: 'NikeDunkLow007',
		nameItem: 'Velcro Tongue',
		itemPrice: 1231200,
		itemType: 'Nike',
		itemImage: './img/Pictures/Giày7.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
	{
		id: 'AirJordan4008',
		nameItem: 'Country Blue',
		itemPrice: 1000000000,
		itemType: 'Nike',
		itemImage: './img/Pictures/Giày8.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
	{
		id: 'AirJordan4009',
		nameItem: 'Country Blue',
		itemPrice: 19800000,
		itemType: 'Nike',
		itemImage: './img/Pictures/Giày8.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
];
var bestSellerItems = [
	{
		id: 'AirJordan40010',
		nameItem: 'Thunder',
		itemPrice: 1299999,
		itemType: 'Jordan',
		itemImage: './img/Pictures/Giày9.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
	{
		id: 'Yeezy3500011',
		nameItem: 'Pirate Black',
		itemPrice: 12312310,
		itemType: 'Yeezy',
		itemImage: './img/Pictures/Giày10.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
	{
		id: 'AirJordan1High0012',
		nameItem: 'TRUE BLUE',
		itemPrice: 10210000,
		itemType: 'Jordan',
		itemImage: './img/Pictures/Giày8.jpg',
		itemDiscount: 'Release: 05/05/2021',
	},
];

async function loadDataFromMyDb() {
	let apiUrl = `http://localhost:3000/api/categories`;

	console.log(apiUrl);
	let data = await fetch(apiUrl).then((res) => res.json());
	console.log(data);
	console.log(data[0].name);
}

loadDataFromMyDb();

var mainJustDroppedItem = bestSellerItems.concat(
	justDroppedItems,
	latestNewsItems,
);

var reformattedNameArray = mainJustDroppedItem.map(({ nameItem }) => ({
	nameItem,
}));

const formatter = new Intl.NumberFormat('it-IT', {
	style: 'currency',
	currency: 'VND',

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function displayCartTable(Categories, dataItems, quaitity) {
	// console.log(cartTable);
	var htmlItems = '';
	for (var item in dataItems) {
		var htmlItem = `<div class="col-xl-4 col-md-6 col-12">
		<div class="shop-iphone--item">
		    <div class="shop-iphone--item---iphone">
		        <img src="${dataItems[item].itemImage}" alt="">
		    </div>
		    <h5 class=" text-center">${dataItems[item].nameItem}</h5>
		    <h6> ${formatter.format(dataItems[item].itemPrice)}</h6>
		     <p> ${dataItems[item].itemDiscount}</p>
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
		</div>`;
		console.log(Categories);
		htmlItems += htmlItem;
		if (item == quaitity - 1) {
			break;
		}
	}
	document.getElementById(Categories).innerHTML = htmlItems;
}

function showLimit() {
	document.querySelector('.showedLimit').classList.remove('d-flex');
	document.querySelector('.unhideLimit').classList.add('d-flex');
}
function hideLimit() {
	document.querySelector('.showedLimit').classList.add('d-flex');
	document.querySelector('.unhideLimit').classList.remove('d-flex');
}

let nav = document.getElementById('top-main-navigation');
let sticky = nav.offsetTop;
window.onscroll = function () {
	sticker();
};

function sticker() {
	if (window.pageYOffset >= sticky) {
		nav.classList.add('is-sticky');
	} else {
		nav.classList.remove('is-sticky');
	}
}

async function scrollTime() {
	// var time = 5; //seconds
	// var y = document.documentElement.scrollTop; //get y position of scroll
	// var duration = y/time; //calcule duration steps
	window.scrollTo({ top: 0, behavior: 'smooth' }); //move to position y
	await new Promise((res) => setTimeout(res, 5000));
	// while(y>0)
	// {
	//    // y = y-duration; //subtract by duration
	//     window.scrollTo({top: 0, behavior: 'smooth'}); //move to position y
	//     await new Promise(res => setTimeout(res, 5000)); //await function with 1000 ms by steps
	// }
}
// Flashing title
let activeAlert = false;
const title = 'PolyShop';
const msg = '(47) New Messages';
const changeTitle = setInterval(() => {
	if (activeAlert == false) {
		document.title = title;
		activeAlert = !activeAlert;
	} else {
		document.title = msg;
		activeAlert = !activeAlert;
	}
}, 1000);

function autocomplete(inp, arr) {
	/*the autocomplete function takes two arguments,
the text field element and an array of possible autocompleted values:*/
	var currentFocus;
	/*execute a function when someone writes in the text field:*/
	inp.addEventListener('input', function (e) {
		var a,
			b,
			i,
			val = this.value;
		/*close any already open lists of autocompleted values*/
		closeAllLists();
		if (!val) {
			return false;
		}
		currentFocus = -1;
		/*create a DIV element that will contain the items (values):*/
		a = document.createElement('DIV');
		a.setAttribute('id', this.id + 'autocomplete-list');
		a.setAttribute('class', 'autocomplete-items ');
		/*append the DIV element as a child of the autocomplete container:*/
		this.parentNode.appendChild(a);
		/*for each item in the array...*/
		for (i = 0; i < arr.length; i++) {
			/*check if the item starts with the same letters as the text field value:*/
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				/*create a DIV element for each matching element:*/
				b = document.createElement('DIV');
				/*make the matching letters bold:*/
				b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
				b.innerHTML += arr[i].substr(val.length);
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener('click', function (e) {
					/*insert the value for the autocomplete text field:*/
					inp.value = this.getElementsByTagName('input')[0].value;
					/*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
					closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	/*execute a function presses a key on the keyboard:*/
	inp.addEventListener('keydown', function (e) {
		var x = document.getElementById(this.id + 'autocomplete-list');
		if (x) x = x.getElementsByTagName('div');
		if (e.keyCode == 40) {
			/*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
			currentFocus++;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 38) {
			//up
			/*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
			currentFocus--;
			/*and and make the current item more visible:*/
			addActive(x);
		} else if (e.keyCode == 13) {
			/*If the ENTER key is pressed, prevent the form from being submitted,*/
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		/*a function to classify an item as "active":*/
		if (!x) return false;
		/*start by removing the "active" class on all items:*/
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		/*add class "autocomplete-active":*/
		x[currentFocus].classList.add('autocomplete-active');
	}
	function removeActive(x) {
		/*a function to remove the "active" class from all autocomplete items:*/
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove('autocomplete-active');
		}
	}
	function closeAllLists(elmnt) {
		/*close all autocomplete lists in the document,
    except the one passed as an argument:*/
		var x = document.getElementsByClassName('autocomplete-items');
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	document.addEventListener('click', function (e) {
		closeAllLists(e.target);
	});
}

// console.log(reformattedNameArray);
// var myName = [
// 	'Air Jordan 4 “Thunder”',
// 	'Yeezy 350 "Pirate Black"',
// 	'AIR JORDAN 1 HIGH "TRUE BLUE"',
// 	'Nike Dunk Low “Reverse UNC”',
// 	'Nike Dunk Low “Fruity Pebbles”',
// 	'Air Jordan 1 High 85 “Black/White”',
// 	'Air Jordan 4 “Pink Riot”',
// 	'Nike Dunk Low “UCLA”',
// 	'Air Jordan 1 Low “UNC”',
// 	'Nike Dunk Low “Velcro Tongue”',
// 	'Air Jordan 4 “Country Blue"',
// 	'Air Jordan 4 “Country Blue"',
// ];
// autocomplete(document.getElementById('myInput'), myName);

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
	document.getElementById('mySidenav').style.width = '550px';
	// document.getElementById('main').style.marginLeft = '250px';
	// document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
	document.getElementById('mySidenav').style.width = '0';
	document.getElementById('mySidenav').style.padding = '0 ';

	// document.getElementById('main').style.marginLeft = '0';
	// document.*.style.backgroundColor = '#f2f2f2';
}
