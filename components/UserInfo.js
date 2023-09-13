
// Класс UserInfo отвечает за управление отображением информации 
// о пользователе на странице. Этот класс:

// Принимает в конструктор объект с селекторами двух элементов:
//  элемента имени пользователя и элемента информации о себе.

// Содержит публичный метод getUserInfo, который возвращает объект с 
// данными пользователя. Этот метод пригодится когда данные пользователя 
// нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные 
// пользователя и добавляет их на страницу.

export default class UserInfo {
    constructor({ profileNameSelector, profileAboutSelector }) {
        this.nameSelector = document.querySelector(profileNameSelector);
        this.aboutSelector = document.querySelector(profileAboutSelector);
    }

    getUserInfo() { // возвращает объект с данными пользователя
        return {
            userName: this.nameSelector.textContent,
            userAbout: this.aboutSelector.textContent
        }
    }

    setUserInfo({ userName, userAbout }) { // принимает новые данные пользователя и добавляет их на страницу
        this.nameSelector.textContent = userName;
        this.aboutSelector.textContent = userAbout;
    }

}