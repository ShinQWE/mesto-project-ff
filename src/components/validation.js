const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/; 
  const errorMessage = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.';

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    inputElement.setAttribute('data-error-message', inputElement.validationMessage); 
  } else if (inputElement.type !== 'url' && !regex.test(inputElement.value)) {
    showInputError(formElement, inputElement, errorMessage);
    inputElement.setAttribute('data-error-message', errorMessage);
  } else {
    hideInputError(formElement, inputElement);
    inputElement.removeAttribute('data-error-message'); 
  }
};



const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};



function hasInvalidInput(inputList) {
  return inputList.some(input => !input.validity.valid);
}

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (hasInvalidInput(inputList) || inputList.some(input => {
    if (input.type === 'url') {
      return !input.validity.valid;
    } else {
      return !input.validity.valid || !regex.test(input.value);
    }
  })) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_disabled');
  }
};


export const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement);
  });

  toggleButtonState(inputList, buttonElement);

  buttonElement.disabled = true;
  buttonElement.classList.add('popup__button_disabled');
};
