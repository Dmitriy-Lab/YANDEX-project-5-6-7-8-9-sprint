function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
        setEventListeners(formElement, config.inputSelector, config.errorElementSelector, config.buttonSubmitSelector, config.spanErrorClass, config.inputErrorClass);
    });
  };
  
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__form_input',
    errorElementSelector: '.popup__input-error_',
    buttonSubmitSelector: '.popup__form_submit-button',
    spanErrorClass: 'popup__input-error_active',
    inputErrorClass: 'popup__form_input_type-error'
  });

  function setEventListeners (formElement, inputSelector, errorElementSelector, buttonSubmitSelector, spanErrorClass, inputErrorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(buttonSubmitSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, errorElementSelector, spanErrorClass, inputErrorClass);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  function checkInputValidity (formElement, inputElement, errorElementSelector, spanErrorClass, inputErrorClass) {
    const errorElement = formElement.querySelector(`${errorElementSelector}${inputElement.name}`);
        if (!inputElement.validity.valid) {
      showInputError(errorElement, inputElement.validationMessage, inputElement, spanErrorClass, inputErrorClass);
    } else {
      hideInputError(errorElement, inputElement, spanErrorClass, inputErrorClass);
    }
  };

  function showInputError (errorElement, errorMessage, inputElement, spanErrorClass, inputErrorClass) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(spanErrorClass);
    inputElement.classList.add(inputErrorClass);
  };
  
  function hideInputError (errorElement, inputElement, spanErrorClass, inputErrorClass) {
    errorElement.classList.remove(spanErrorClass);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
  };



  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__form_submit-button_inactive');
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove('popup__form_submit-button_inactive');
        buttonElement.disabled = false;
      }
  };

  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
   });
 };
