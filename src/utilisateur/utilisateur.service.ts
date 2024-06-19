import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Utilisateur } from './models/utilisateur.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtilisateurService {
    
    constructor(private readonly prisma: PrismaService) {}
    
    createUser(username: string): Promise<Utilisateur> {
        return this.prisma.user.create({
            data: {
                username
            }
        })
    }

    getUtilisateurById(id: string) : Promise<Utilisateur> {
        return this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

}

