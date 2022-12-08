// contrustor function
function Validator(options) {
	var formElement = document.querySelector(options.form);

	if (formElement) {
		options.rules.forEach((rule) => {
			var inputElement = formElement.querySelector(rule.selector);
			var errorElement =
				inputElement.parentElement.querySelector('.formMessage');
			console.log(inputElement.parentElement);
			if (inputElement) {
				inputElement.onblur = () => {
					//  value: inputElement.value
					// check func: rule.checking
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
