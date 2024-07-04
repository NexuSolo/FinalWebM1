import { Injectable } from '@nestjs/common';
import { Utilisateur } from './models/utilisateur.model';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UtilisateurService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(username: string): Promise<Utilisateur> {
        const user = await this.getUtilisateurByUsername(username);
        if (user) {
            return null;
        }
        return this.prisma.user.create({
            data: {
                username
            }
        });
    }

    getUtilisateurById(id: string): Promise<Utilisateur> {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    getUtilisateurByUsername(username: string): Promise<Utilisateur> {
        return this.prisma.user.findUnique({
            where: {
                username
            }
        });
    }
}
