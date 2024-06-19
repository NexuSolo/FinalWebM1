import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Injectable()
export class ConversationService {

    constructor(private readonly prisma: PrismaService, private readonly utilisateurService: UtilisateurService) {}

    async createConversation(userId : string, userId2 : string) {
        const user1 = await this.utilisateurService.getUtilisateurById(userId);
        const user2 = await this.utilisateurService.getUtilisateurById(userId2);
        if(!user1 || !user2) {
            return null;
        }
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

    getConversationByUser(userId: string) {
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
