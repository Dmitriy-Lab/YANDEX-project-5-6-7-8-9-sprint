import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

import {
    initialCards,
    config,
    templateSelector,
    btnRename,
    btnAddCard,
    nameOnSite,
    aboutOnSite,
    popupAddCardClass,
    popupUserInfoClass
} from './utils/constants.js';

const userInfo = new UserInfo({
    profileNameSelector: '.profile__name',
    profileAboutSelector: '.profile__about'
});

function createCard(data) {
    const card = new Card({ data, handelCardClick: () => { openImagePopup(data) } }, templateSelector);
    return card.generateCard();
}

const imagePopup = new PopupWithImage('.popup-image');

function openImagePopup(data) {
    imagePopup.open(data);
}

const section = new Section({
    items: initialCards,
    renderer: (data) => {
        section.addItem(createCard(data));
    }
}, '.elements')

section.renderItems();

const userInfoPopup = new PopupWithForm('.popup-rename', (data) => {
    userInfo.setUserInfo({
        userName: data.name,
        userAbout: data.profession
    })
});

const cardAddPopup = new PopupWithForm('.popup-addCard', (data) => {
    const userCard = createCard(data);
    section.addItem(userCard);
    cardAddPopup.close();
});

imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
cardAddPopup.setEventListeners();

function changeNameOfSite() {
    const inputValues = userInfo.getUserInfo();
    nameOnSite['value'] = inputValues.userName;
    aboutOnSite['value'] = inputValues.userAbout;
};

const userFormValodator = new FormValidator(config, popupUserInfoClass);

const cardFormValodator = new FormValidator(config, popupAddCardClass);

userFormValodator.enableValidation();
cardFormValodator.enableValidation();

btnRename.addEventListener('click', () => {
    userInfoPopup.open();
    changeNameOfSite();
    userFormValodator.resetValodation();
});

btnAddCard.addEventListener('click', () => {
    cardAddPopup.open();
    cardFormValodator.resetValodation();
});