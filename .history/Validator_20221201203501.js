// contrustor function
function Validator(options) {
	// func excute validate
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
	// lấy element của form cần validate
	var formElement = document.querySelector(options.form);

	if (formElement) {
		options.rules.forEach((rule) => {
			var inputElement = formElement.querySelector(rule.selector);
			console.log(inputElement);
			console.log(inputElement.parentElement);
			if (inputElement) {
				inputElement.onblur = () => {
					validate(inputElement, rule);
					console.log(validate(inputElement, rule));
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
		checking: function (value) {
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value) ? undefined : 'Trường này phải là Email!';
		},
	};
};
