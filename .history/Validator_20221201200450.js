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
					var errorMessage = rule.checking(inputElement.value);
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
