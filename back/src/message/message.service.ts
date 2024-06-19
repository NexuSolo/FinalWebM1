import { Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MessageService {
    lastid = 0;

    constructor(private readonly prisma: PrismaService) {}

    async createMessage(userId : string, text : string, conversationId: string) {
        return this.prisma.message.create({
            data: {
                userId,
                text,
                conversationId
            },
            include: {
                conversation: true,
                user: true
            }
        })
        // await this.messagesQueue.add(message);
    }

    async getMessageByConversation(id: string) {
        return this.prisma.message.findMany({
            where: {
                conversationId: id
            },
            include: {
                conversation: true,
                user: true
            }
        })
    }

}
