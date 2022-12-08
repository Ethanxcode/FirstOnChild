// contrustor function
function Validator(options) {
	var formElement = document.querySelector(options.form);

	if (formElement) {
		options.rules.forEach((rule) => {
			var inputElement = formElement.querySelector(rule.selector);

			console.log(inputElement);
		});
	}
}
// Định nghĩa rules
Validator.isRequire = (selector) => {
	return {
		selector: selector,
		checking: function () {},
	};
};

Validator.isEmail = (selector) => {
	return {
		selector: selector,
		checking: function () {},
	};
};
