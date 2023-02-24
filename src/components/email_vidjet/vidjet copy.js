import { Observable, fromEvent, from, interval } from 'rxjs';
import { map, pluck }  from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

export default class EmailVidjet {
    constructor(appTag) {
        this.appContainer = document.querySelector('.app-container');
        this.messagesWrap = this.appContainer.querySelector('.messages-wrap');
        this.timeInteral = interval(5000);
        this.dataUrl = 'http://localhost:7070/messages/unread';
        this.timeInteral.subscribe(() => {
            this.dataStream$ = ajax.getJSON(this.dataUrl);
            this.dataStream$.subscribe((data) => {
                console.log(data.status)
                if (data.status === 'ok'){

                }
            });
        }, (err) => {
            console.log('etst')
        });



    }




    createMessage() {
        const messageItem = document.createElement('div');
        const messageEmail = document.createElement('div');
        const messageText = document.createElement('div');
        const messageDate = document.createElement('div');

        messageItem.classList.add('messages-item');
        messageEmail.classList.add('messages-item-email');
        messageText.classList.add('messages-item-text');
        messageDate.classList.add('messages-item-date');

        messageEmail.textContent = 'demo@mail.ru';
        messageText.textContent =  'test test ests';
        messageDate.textContent = '23.03.1989';

        messageItem.appendChild(messageEmail);
        messageItem.appendChild(messageText);
        messageItem.appendChild(messageDate);
        this.messagesWrap.appendChild(messageItem);

        return messageItem;
    }
}