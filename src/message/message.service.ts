import { Inject, Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Utilisateur } from 'src/utilisateur/models/utilisateur.model';

@Injectable()
export class MessageService {



    createMessage(userId : number, content : string) {
        const message = new Message(userId, content);
        return message;
    }

    getAllMessages() {

    }
}
