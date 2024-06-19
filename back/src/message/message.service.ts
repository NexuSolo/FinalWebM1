import { Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { PrismaService } from 'src/database/prisma.service';

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

    // getMessageByConversation(id: string): Promise<Message[]> {
    //     //renvoyer tout les messages d'une conversation
        
    // }

}
