// contrustor function
function Validator(options) {
	function validate(inputElement, rule) {
		//  value: inputElement.value
		// check func: rule.checking
		var errorElement = inputElement.parentElement.querySelector('.formMessage');
		var errorMessage = rule.checking(inputElement.value);

		if (errorMessage) {
			errorElement.innerText = errorMessage;
			inputElement.parentElement
				.querySelector('.login-text-field')
				.classList.add('invalid');
		} else {
			errorElement.innerText = '';
			inputElement.parentElement
				.querySelector('.login-text-field')
				.classList.remove('invalid');
		}
	}

	var formElement = document.querySelector(options.form);

	if (formElement) {
		options.rules.forEach((rule) => {
			var inputElement = formElement.querySelector(rule.selector);

			console.log(inputElement.parentElement);
			if (inputElement) {
				inputElement.onblur = () => {
					validate(inputElement, rule);
				};
			}
		});
	}
}
// Định nghĩa rules
// Nguyên tắc của rules:
// khi có lỗi thì trả ra message lõi
// khi hợp lệ, không trả ra gì (underfinded)
Validator.isRequire = (selector) => {
	return {
		selector: selector,
		checking: function (value) {
			return value.trim() ? undefined : 'Vui lòng nhập trường này!';
		},
	};
};

Validator.isEmail = (selector) => {
	return {
		selector: selector,
		checking: function () {},
	};
};
