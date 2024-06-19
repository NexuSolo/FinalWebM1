import { Inject, Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Utilisateur } from 'src/utilisateur/models/utilisateur.model';
import { Cache } from 'cache-manager';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
    lastid = 0;

    constructor(private readonly prisma: PrismaService) {}

    async createMessage(id : string, text : string, conversationId: string) {
        return this.prisma.message.create({
            data: {
                id,
                text,
                conversationId
            }
        })
        // await this.messagesQueue.add(message);
        // return message;
    }

    getMessageByConversation(id: string): Promise<Message[]> {
        //renvoyer tout les messages d'une conversation
        
    }

}
