import { Injectable } from '@nestjs/common';
import { Message } from './models/message.model';

@Injectable()
export class MessageService {

    messages: Message[] = [];

    createMessage(text: string) {
        const message = {
            id: this.messages.length + 1,
            text
        };
    }

    getAllMessages() {
        return this.messages;
    }
}
