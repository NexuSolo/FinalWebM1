import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ConversationService {

    constructor(private readonly prisma: PrismaService) {}

    createConversation(userId : string, userId2 : string) {
        return this.prisma.conversation.create({
            data: {
                userId,
                userId2
            }
        })
    }

    // getMessageByConversation(id: string): Promise<Conversation> {
    //     return this.prisma.conversation.findUnique({
    //         where: {
    //             id
    //         }
    //     }) as Promise<Conversation>;
    // }

    getConversatinByUser(userId: string) {
        return this.prisma.conversation.findMany({
            where: {
                OR: [
                    {userId},
                    {userId2: userId}
                ]
            }
        })
    }

}
