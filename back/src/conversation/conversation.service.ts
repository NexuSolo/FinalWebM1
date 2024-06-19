import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Conversation } from './models/conversation.model';

@Injectable()
export class ConversationService {

    constructor(private readonly prisma: PrismaService) {}

    createConversation(userId : string, userId2 : string) {
        return this.prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {id: userId},
                        {id: userId2}
                    ]
                }
            }
        })
    }

    getConversatinByUser(userId: string) {
        return this.prisma.conversation.findMany({
            where: {
                users: {
                    some: {
                        id: userId
                    }
                }
            },
            include: {
                users: true,
                messages: true
            }
        })
    }

}
