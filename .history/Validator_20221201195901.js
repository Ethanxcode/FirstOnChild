// contrustor function
function Validator(options) {
	var formElement = document.querySelector(options.form);

	if (formElement) {
		options.rules.forEach((rule) => {
			var inputElement = formElement.querySelector(rule.selector);
			if (inputElement) {
				inputElement.onblur = () => {
					console.log('blur' + rule.selector);
				};
			}
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
