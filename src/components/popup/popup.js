export default class Popup {
    constructor(popupTag) {
        this.popupContainer = document.querySelector(popupTag);
        this.popupBody = this.popupContainer.querySelector('.popup-body');
        this.popupHeader = this.popupContainer.querySelector('.popup-header');
        this.popupEmail = this.popupContainer.querySelector('.popup-item-email');
        this.popupDate = this.popupContainer.querySelector('.popup-item-date');
        this.popupText = this.popupContainer.querySelector('.popup-item-text');
        this.popupClose = this.popupContainer.querySelector('.popup-close');

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);     
        this.popupClose.addEventListener('click', this.hide);

    }

    show(message, position) {
        this.popupContainer.classList.remove('popup-hide');
        this.popupContainer.classList.add('popup-show');
        this.popupContainer.style.top = `${position.top}px`;
        this.popupContainer.style.left = `${position.left / 2 + 50}px`;

        this.popupEmail.textContent = message.email;
        this.popupDate.textContent = message.date;
        this.popupText.textContent = message.text;
        
    }

    hide() {
        this.popupContainer.classList.add('popup-hide');
        this.popupContainer.classList.remove('popup-show');
        this.popupEmail.textContent = '';
        this.popupDate.textContent = '';
        this.popupText.textContent = '';
        this.popupContainer.style.top = 0+'px'
        this.popupContainer.style.left = 0 +'px'
    }
}