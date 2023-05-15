import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {initialCards, config} from './constants.js';

// Общие элементы
const cardsField = document.querySelector('.elements');
const btnPopupRename = document.querySelector('.popup__close-button');

// ПОПАП смены личных данных
const btnRename = document.querySelector('.button__rename');
const popupRename = document.querySelector('.popup-rename');

const formElementRename = document.querySelector('.popup__form-rename');
const nameInput = document.querySelector('.popup__form_name');
const jobInput = document.querySelector('.popup__form_profession');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__about');

// ПОПАП добавления карточки
const btnAddCard = document.querySelector('.button__add');
const popupAddNewCard = document.querySelector('.popup-addCard');
const btnPopupAddNewCardClose = popupAddNewCard.querySelector('.popup__close-button');

const formElementAddCard = document.querySelector('.popup__form-addCard')
const cardHeaderInput = document.querySelector('.popup__form_plase');
const cardLinkInput = document.querySelector('.popup__form_link');

// ПОПАП Открытия картинки 
const popupOpenImage = document.querySelector('.popup-image');
const popupCloseImage = popupOpenImage.querySelector('.popup__close-button');



// Личные данные попап

function openPopupRename() {
    openAnyPopup(popupRename);
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closeAnyPopup();
}

// Добавить карточку попап

function openPopupAddNewCard() {
    openAnyPopup(popupAddNewCard);
    cardHeaderInput.value = '';
    cardLinkInput.value = '';
};

initialCards.forEach((item) => {
    const card = new Card(item, '.card__template');
    const cardElement = card.generateCard();
    cardsField.prepend(cardElement);
});

function addCardFormSubmit(evt) {
    evt.preventDefault();
    let newCard = {
        name: '',
        link: ''
    };
    newCard.name = cardHeaderInput.value;
    newCard.link = cardLinkInput.value;
    const card = new Card(newCard, '.card__template');
    const cardElement = card.generateCard();
    cardsField.prepend(cardElement);
    closeAnyPopup();
}

// Открыть-закрыть, листнеры

export function openAnyPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closeAnyPopupOverlay);
    document.addEventListener('keydown', closeAnyPopupEsc);
    newCardPopupFormValidator.cleanInputErrors();
    renamePopupFormValidator.cleanInputErrors();
}

function closeAnyPopupEsc(event) {
    if (event.key === 'Escape') {
        closeAnyPopup();
    }
};


function closeAnyPopupOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closeAnyPopup();
    }
};

function closeAnyPopup() {
    const popup = document.querySelector('.popup_opened');
    popup.classList.remove('popup_opened');
    document.querySelector('.popup__input-error').textContent = '';
    popup.removeEventListener('click', closeAnyPopupOverlay);
    document.removeEventListener('keydown', closeAnyPopupEsc);
};

btnRename.addEventListener('click', openPopupRename);
btnPopupRename.addEventListener('click', closeAnyPopup);
formElementRename.addEventListener('submit', handleFormSubmit);
formElementAddCard.addEventListener('submit', addCardFormSubmit);
btnAddCard.addEventListener('click', openPopupAddNewCard);
btnPopupAddNewCardClose.addEventListener('click', closeAnyPopup);
popupCloseImage.addEventListener('click', closeAnyPopup);


const newCardPopupFormValidator = new FormValidator(config, formElementAddCard);
newCardPopupFormValidator.enableValidation();

const renamePopupFormValidator = new FormValidator(config, formElementRename);
renamePopupFormValidator.enableValidation();