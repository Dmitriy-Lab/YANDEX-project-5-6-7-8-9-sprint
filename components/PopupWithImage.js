import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

    constructor(props) {
        super(props);
        this.popupImage = this.popup.querySelector('.popup__image');
        this.popupImageHeader = this.popup.querySelector('.popup__image_header');
    }

    open(data) {
        super.open();
        this.popupImage.setAttribute('src', data.link);
        this.popupImage.setAttribute('alt', data.name);

        this.popupImageHeader.textContent = data.name;

    }
}