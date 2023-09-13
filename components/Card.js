
// Свяжите класс Card c попапом. Сделайте так, 
// чтобы Card принимал в конструктор функцию handleCardClick. 
// Эта функция должна открывать попап с картинкой при клике на карточку.

export default class Card {
  constructor({ data, handelCardClick }, templateSelector) {

    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handelCardClick = handelCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  _deletCard(event) {
    const targetCard = event.target;
    const card = targetCard.closest('.elements__element');
    card.remove();
  }

  _addLikeOnCard(event) {
    const DarkHeart = event.target;
    DarkHeart.classList.toggle('button__like-active');
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector('.button__like');
    buttonLike.addEventListener('click', this._addLikeOnCard);

    const btnRemove = this._element.querySelector('.button__remove');
    btnRemove.addEventListener('click', this._deletCard);

    const cardImage = this._element.querySelector('.elements__photo');
    cardImage.addEventListener('click', this._handelCardClick);
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.elements__photo').src = this._link;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

}