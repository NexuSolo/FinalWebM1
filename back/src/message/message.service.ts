import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class MessageService {
    constructor(
        private readonly prisma: PrismaService,
        @InjectQueue('messages') private messageQueue: Queue,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async createMessage(userId: string, text: string, conversationId: string) {
        const result = await this.prisma.message.create({
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
        const cachedMessages: any[] = (await this.cacheManager.get(conversationId)) || [];
        const updatedMessages = [...cachedMessages, result];
        await this.cacheManager.set(conversationId, updatedMessages);
        await this.messageQueue.add(result);
        return result;
    }

    async getMessageByConversation(id: string) {
        const cachedMessages = await this.cacheManager.get(id);
        if (cachedMessages == undefined) {
            const messages = await this.prisma.message.findMany({
                where: {
                    conversationId: id
                },
                include: {
                    conversation: true,
                    user: true
                }
            });
            if (messages.length > 0) {
                await this.cacheManager.set(id, messages);
            }
            return messages;
        } else {
            return cachedMessages;
        }
    }
}
