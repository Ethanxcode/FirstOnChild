// contrustor function
function Validator(options) {
	var selectorRules = {};
	// func excute validate
	function validate(inputElement, rule) {
		//  value: inputElement.value
		// check func: rule.checking
		var errorElement = inputElement.parentElement.querySelector(
			options.errorSelector,
		);
		var errorMessage;
		// Lấy ra các rules của seletor
		var rules = selectorRules[rule.selector];
		// Lặp qua từng rules và kiểm tra
		// Nếu có lỗi thì dừng việc kiểm tra
		for (var i = 0; i < rules.length; ++i) {
			errorMessage = rules[i](inputElement.value);
			if (errorMessage) {
				break;
			}
		}

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
		return !errorMessage;
	}
	// lấy element của form cần validate
	var formElement = document.querySelector(options.form);
	if (formElement) {
		// khi submit form
		formElement.onsubmit = function (e) {
			e.preventDefault();

			var isFormVlaid = true;

			options.rules.forEach((rule) => {
				var inputElement = formElement.querySelector(rule.selector);
				var isVlaid = validate(inputElement, rule);
				if (!isVlaid) {
					isFormVlaid = !isFormVlaid;
				}
			});

			if (isFormVlaid) {
				if (typeof options.onSubmit === 'function') {
					var enableInputs = formElement.querySelectorAll('[name]');
					var formValues = Array.from(enableInputs).reduce((values, input) => {
						return (values[input.name] = input.value) && values;
					}, {});

					options.onSubmit(formValues);
				} else {
					options.submit();
				}
			}
		};
	}
	if (formElement) {
		options.rules.forEach((rule) => {
			// lưu các rule cho mỗi input

			if (Array.isArray(selectorRules[rule.selector])) {
				selectorRules[rule.selector].push(rule.checking);
			} else {
				selectorRules[rule.selector] = [rule.checking];
			}
			// selectorRules[rule.selector] = rule.checking;

			var inputElement = formElement.querySelector(rule.selector);
			// console.log(inputElement);
			// console.log(inputElement.parentElement);
			if (inputElement) {
				// xử lý trường hợp blur khõi element
				inputElement.onblur = () => {
					validate(inputElement, rule);
					// console.log(validate(inputElement, rule));
				};
				// xử lý trường hợp nhập vào input
				inputElement.oninput = () => {
					var errorElement = inputElement.parentElement.querySelector(
						options.errorSelector,
					);
					errorElement.innerText = '';
					inputElement.parentElement
						.querySelector('.login-text-field')
						.classList.remove('invalid');
				};
			}
		});
		// console.log(selectorRules);
	}
}
// Định nghĩa rules
// Nguyên tắc của rules:
// khi có lỗi thì trả ra message lõi
// khi hợp lệ, không trả ra gì (underfinded)
Validator.isRequire = (selector, message) => {
	return {
		selector: selector,
		checking: function (value) {
			return value.trim() ? undefined : message || 'Vui lòng nhập trường này!';
		},
	};
};

Validator.isEmail = (selector, message) => {
	return {
		selector: selector,
		checking: function (value) {
			var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value)
				? undefined
				: message || 'Trường này phải là Email!';
		},
	};
};

Validator.minLength = (selector, min, max, message) => {
	return {
		selector: selector,
		checking: function (value) {
			if (max != undefined) {
				return value.length >= min && value.length <= max
					? undefined
					: message || `Tối thiểu ${min} ký tự và tối đa ${max} ký tự  `;
			} else {
				return value.length >= min
					? undefined
					: message || `Vui lòng nhập tối thiểu ${min} ký tự `;
			}
		},
	};
};

Validator.isConfirmEd = (selector, getConfirmValue, message) => {
	return {
		selector: selector,
		checking: function (value) {
			return value === getConfirmValue()
				? undefined
				: message || 'Giá trị nhập vào không chính xác!';
		},
	};
};
