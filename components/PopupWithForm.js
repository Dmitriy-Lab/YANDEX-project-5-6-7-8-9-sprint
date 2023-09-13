import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(selector, submitForm) {
    super(selector);
    this.submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this.popup.querySelectorAll('.popup__form_input');
    const formValues = {};
    this._inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  }

  setEventListeners() { // добавлять обработчик сабмита формы
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitForm(this._getInputValues());
      this.close();
    });
  }

  close() { // при закрытии попапа форма должна ещё и сбрасываться
    this.popup.querySelector('.popup__form').reset();
    super.close();
  }

}
