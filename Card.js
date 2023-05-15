/**
 * Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
принимает в конструктор её данные и селектор её template-элемента;
содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
содержит приватные методы для каждого обработчика;
содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.
 */

import { openAnyPopup } from './index.js';

export class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .cloneNode(true);
        return cardElement;
      }

      _openPopupImage(event) {
        const targetImage = event.target;
        const popupImage = document.querySelector('.popup__image');
        const popupImageHeader = document.querySelector('.popup__image_header');
        const popupCard = document.querySelector('.popup-image');
        popupImageHeader.textContent = targetImage.alt;
        popupImage.src = targetImage.src;
        openAnyPopup(popupCard);
    };

      _deletCard(event) {
        const targetCard = event.target;
        const card = targetCard.closest('.elements__element');
        card.remove();
      }
    
      _addLikeOnCard(event) {
        const DarkHeart = event.target;
        DarkHeart.classList.add('button__like-active');
      }

      _setEventListeners() {
        const buttonLike = this._element.querySelector('.button__like');
        buttonLike.addEventListener('click', this._addLikeOnCard);

        const btnRemove = this._element.querySelector('.button__remove');
        btnRemove.addEventListener('click', this._deletCard);

        const cardImage = this._element.querySelector('.elements__photo');
        cardImage.setAttribute('src', this._link);
        cardImage.setAttribute('alt', this._name);
        cardImage.addEventListener('click', this._openPopupImage);

      }

      generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.elements__photo').src = this._link;
        this._element.querySelector('.elements__name').textContent = this._name;
    
        return this._element;
      }

}