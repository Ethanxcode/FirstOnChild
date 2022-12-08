// contrustor function
function Validator(options) {
	var formElement = document.querySelector(options.form);

	if (formElement) {
		options.rules.forEach((rule) => {
			var inputElement = formElement.querySelector(rule.selector);
			if (inputElement) {
				inputElement.onblur = () => {
					//  value: inputElement.value
					// check func: rule.checking
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
