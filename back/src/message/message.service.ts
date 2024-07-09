import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MessageService {
    constructor(
        private readonly prisma: PrismaService,
        @InjectQueue('messages') private readonly messageQueue: Queue
    ) {}

    async createMessage(userId: string, text: string, conversationId: string) {
        const data = {
            userId,
            text,
            conversationId
        };
        this.messageQueue.add(data);
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
        });
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
        });
    }
}
