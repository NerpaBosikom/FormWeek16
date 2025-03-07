document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms.registerForm;
  const submitBtn = document.getElementById("submitBtn");
  const inputs = form.querySelectorAll("input, select");

  // Функция валидации всей формы
  const validateForm = () => {
    let isValid = true;

    inputs.forEach((input) => {
      const errorDiv = document.getElementById(`${input.name}Error`);
      if (errorDiv) errorDiv.textContent = "";

      if (!input.checkValidity()) {
        isValid = false;
        if (errorDiv) {
          errorDiv.textContent = input.title || input.validationMessage;
        }
        input.classList.add("error");
        input.classList.remove("valid");
      } else {
        input.classList.add("valid");
        input.classList.remove("error");
      }
    });

    submitBtn.disabled = !isValid;
    return isValid;
  };

  // Убираем сообщение об ошибке при фокусе
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      const errorDiv = document.getElementById(`${input.name}Error`);
      if (errorDiv) errorDiv.textContent = "";
    });

    input.addEventListener("input", validateForm);
    input.addEventListener("blur", validateForm);
  });

  // Обработчик отправки формы
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      username: form.username.value,
      email: form.email.value,
      age: form.age.value,
      gender: form.gender.value,
      profession: form.profession.value,
      password: form.password.value,
      agree: form.agree.checked,
    };

    console.log("Данные формы:", formData);

    // Очищаем форму
    form.reset();
    submitBtn.disabled = true;

    // Очищаем ошибки и стили
    document.querySelectorAll(".error").forEach((errorDiv) => {
      errorDiv.textContent = "";
    });

    inputs.forEach((input) => {
      input.classList.remove("error", "valid");
    });
  });
});
