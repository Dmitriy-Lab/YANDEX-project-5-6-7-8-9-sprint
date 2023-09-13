export default class Popup {
    constructor(selector) {
        this.popup = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        this.popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);

    }

    close() {
        this.popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {  // содержит логику закрытия попапа клавишей Esc
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() { //добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы
        const btnClosePopup = this.popup.querySelector('.popup__close-button');
        btnClosePopup.addEventListener('click', this.close);
        this.popup.addEventListener('click', (evt) => {
            if (evt.currentTarget === evt.target) {
                this.close();
            }
        });
    }
}



