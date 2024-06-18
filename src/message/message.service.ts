import { Inject, Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Utilisateur } from 'src/utilisateur/models/utilisateur.model';
import { Cache } from 'cache-manager';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MessageService {
    lastid = 0;

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    async createMessage(userId : number, content : string) {
        const message = new Message();
        message.id = this.lastid++;
        message.user = new Utilisateur();
        message.user.id = userId;
        message.text = content;
        // const job = await this.messagesQueue.add(message);
        // this.cacheManager.set(message.id.toString(), message, 0);
        return message;
    }

    async getAllMessages(id : number) {
        return await this.cacheManager.get(id.toString()).then((messages) => {
            if (messages) {
                return messages;
            }
        })
    }
}
