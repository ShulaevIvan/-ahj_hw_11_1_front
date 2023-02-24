import { Observable, fromEvent, from, interval } from 'rxjs';
import { map, pluck }  from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export default class EmailVidjet {
    constructor(appTag) {
        this.appContainer = document.querySelector('.app-container');
        this.messagesWrap = this.appContainer.querySelector('.messages-wrap');
        this.timeInteral = interval(5000);
        this.dataUrl = 'http://localhost:7070/messages/unread';
        this.timeInteral.subscribe({
            next: () => {
                this.dataStream$ = ajax.getJSON(this.dataUrl);
                this.dataStream$.subscribe((data) => {
                    if (data.status === 'ok') {
                        data.messages.forEach((message) => {
                           const time = new Date(message.received).toLocaleTimeString('ru')
                           const date = new Date(message.received).toLocaleDateString('ru');
                           const messageDate = `${time} ${date}`;
                           
                           this.createMessage(message.subject, message.from, messageDate);
                        })
                    }
                });
            },
            error: (err) => {
                console.log(err)
            }
        });



    }

    createMessage(subject, from, date) {
        this.subject = subject;
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