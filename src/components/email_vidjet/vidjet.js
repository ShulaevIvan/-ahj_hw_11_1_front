import { interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import Popup from '../popup/popup';

export default class EmailVidjet {
    constructor(appTag) {
        this.appContainer = document.querySelector('.app-container');
        this.messagesWrap = this.appContainer.querySelector('.messages-wrap');
        this.incomingTitle = this.appContainer.querySelector('.incoming-title');
        this.errBlock = this.appContainer.querySelector('.err-block');
        this.incomingSum = 0;
        this.popup = new Popup('.popup-wrap');
        this.timeInteral = interval(1000);
        this.dataUrl = 'http://localhost:7070/messages/unread';
        this.messageSorting = [];

        this.timeInteral.subscribe({
            next: () => {
                this.dataStream$ = ajax.getJSON(this.dataUrl);
                const messages = document.querySelectorAll('.messages-item');
                this.dataStream$.subscribe((data) => {
                    if (data.status === 'ok') {
                        this.errBlock.style.display = 'none';
                        this.incomingSum = data.messages.length;
                        data.messages.sort((a,b) => new Date(a.received) - new Date(b.received));
                        data.messages.forEach((message) => {
                           const time = new Date(message.received).toLocaleTimeString('ru')
                           const date = new Date(message.received).toLocaleDateString('ru');
                           const messageDate = `${time} ${date}`;
                           const messageFull = message.body;
                           messages.forEach((item) => item.style.display = 'none')
                           messages.forEach((item) => item.remove());
                           this.incomingTitle.textContent = `Incoming (${this.incomingSum})`;
                           this.createMessage(message.subject, message.from, messageDate, messageFull);
                        })
                    }
                }, (err) => {
                    this.errBlock.style.display = 'block';
                    this.errBlock.textContent = 'the server is unavailable ...';
                    this.incomingTitle.textContent = `Incoming (${this.incomingSum})`;
                });
            }
        });
    }

    messageOpenEvent = async (e) => {
        const position = {
            left: e.pageX,
            top: e.pageY,
        }
        const email = e.target.querySelector('.messages-item-email');
        const messageObj = {
            email: email.textContent,
            text: this.fullText,
            date: this.messageDate,
        }
        this.popup.hide();
        this.popup.show(messageObj, position);

    }

    createMessage(subject, from, date, messageFull) {
        this.subject = subject;
        this.fullText = messageFull;
        this.from = from;
        this.messageDate = date;
        if (this.subject.length >= 15) {
            const re = new RegExp('(.){15}');
            this.subject = `${re.exec(this.subject)[0]}...`;
        }
        const messageItem = document.createElement('div');
        const messageEmail = document.createElement('div');
        const messageText = document.createElement('div');
        const messageDate = document.createElement('div');

        messageItem.classList.add('messages-item');
        messageEmail.classList.add('messages-item-email');
        messageText.classList.add('messages-item-text');
        messageDate.classList.add('messages-item-date');

        messageItem.addEventListener('click', this.messageOpenEvent);

        messageEmail.textContent = this.from;
        messageText.textContent =  this.subject
        messageDate.textContent = this.messageDate;
        messageItem.appendChild(messageEmail);
        messageItem.appendChild(messageText);
        messageItem.appendChild(messageDate);
        this.messagesWrap.appendChild(messageItem);
        return messageItem;
    }
}