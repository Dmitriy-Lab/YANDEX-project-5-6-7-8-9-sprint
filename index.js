
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

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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

function createCard(card) {
    const newCard = document.querySelector('.card__template').content.cloneNode(true);
    const cardName = newCard.querySelector('.elements__name');
    cardName.textContent = card.name;
    const cardImage = newCard.querySelector('.elements__photo');
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);
    const btnLike = newCard.querySelector('.button__like');
    btnLike.addEventListener('click', addLike);
    const btnRemove = newCard.querySelector('.button__remove');
    btnRemove.addEventListener('click', removeCard);
    cardImage.addEventListener('click', openPopupImage);
    cardsField.prepend(newCard);
};

initialCards.forEach(createCard);


function addLike (like) {
const activeLike = like.target;
activeLike.classList.add('button__like-active');
}

function removeCard (event) {
    const targetCard = event.target;
    const card = targetCard.closest('.elements__element')
    card.remove();
    }


function addCardFormSubmit(evt) {
    evt.preventDefault();
    let newCard = {
        name: '',
        link: ''
    };
    newCard.name = cardHeaderInput.value;
    newCard.link = cardLinkInput.value;
    initialCards.unshift(newCard);
    createCard(initialCards[0]);
    closeAnyPopup();
}

// Открыть картинку попап 

function openPopupImage(event) {
    const targetImage = event.target;
    const popupImage = document.querySelector('.popup__image');
    const popupImageHeader = document.querySelector('.popup__image_header');
    popupImageHeader.textContent = targetImage.alt;
    popupImage.src = targetImage.src;
    openAnyPopup(popupOpenImage);
};


// Открыть-закрыть, листнеры

function openAnyPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closeAnyPopupOverlay);
    document.addEventListener('keydown', closeAnyPopupEsc); 
};

function closeAnyPopupEsc (event) {
if (event.key === 'Escape') {
    closeAnyPopup();
}
};


function closeAnyPopupOverlay (evt) {
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



