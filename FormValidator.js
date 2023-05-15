
/**
 * Создайте класс FormValidator, который настраивает валидацию полей формы:
принимает в конструктор объект настроек с селекторами и классами формы;
принимает вторым параметром элемент той формы, которая валидируется;
имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, 
изменяют состояние кнопки сабмита, устанавливают все обработчики;
имеет публичный метод enableValidation, который включает валидацию формы.

Для каждой проверяемой формы создайте экземпляр класса FormValidator.
 */


export class FormValidator {
    constructor(data, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = data.inputSelector;
        this._errorElementSelector = data.errorElementSelector;
        this._buttonSubmitSelector = data.buttonSubmitSelector;
        this._spanErrorClass = data.spanErrorClass;
        this._inputErrorClass = data.inputErrorClass;
    }

    _showInputError (errorElement, errorMessage, inputElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._spanErrorClass);
        inputElement.classList.add(this._inputErrorClass);
      }
      
      _hideInputError (errorElement, inputElement) {
        errorElement.classList.remove(this._spanErrorClass);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
      }

      cleanInputErrors() {
        this._disableSubmitButton();
        this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
        this._inputList.forEach((inputElement) => {
        this._errorElement = this._formSelector.querySelector(`${this._errorElementSelector}${inputElement.name}`);
        this._hideInputError(this._errorElement, inputElement);
        });
      }

    _checkInputValidity(inputElement) {
        this._errorElement = this._formSelector.querySelector(`${this._errorElementSelector}${inputElement.name}`);
            if (!inputElement.validity.valid) {
          this._showInputError(this._errorElement, inputElement.validationMessage, inputElement);
        } else {
          this._hideInputError(this._errorElement, inputElement);
        }
      }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableSubmitButton() {
        this._buttonElement.classList.add('popup__form_submit-button_inactive');
        this._buttonElement.disabled = true;
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove('popup__form_submit-button_inactive');
        this._buttonElement.disabled = false;
    }

    _toggleButtonState() {
    if (this._hasInvalidInput()) {
        this._disableSubmitButton();
    } else {
        this._enableSubmitButton();
    }
}

_setEventListeners() {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._buttonSubmitSelector);
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        });
    });
}

enableValidation() {

    this._setEventListeners();
};
}