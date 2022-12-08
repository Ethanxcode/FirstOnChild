// contrustor function
function Validator(options) {
	var formElement = document.querySelector(options.form);

	if (formElement) {
	}
}
// Định nghĩa rules
Validator.isRequire = (selector) => {
	return {
		selector: selector,
		check: function () {},
	};
};

Validator.isEmail = (selector) => {
	return {
		selector: selector,
		check: function () {},
	};
};
