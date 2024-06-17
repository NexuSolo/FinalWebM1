import { Injectable } from '@nestjs/common';
import { Utilisateur } from './models/utilisateur.model';

@Injectable()
export class UtilisateurService {

    utilisateurs: Utilisateur[] = [];

    async createUser(username: string) {
        const utilisateur = {
            id: this.utilisateurs.length + 1,
            username
        };
        this.utilisateurs.push(utilisateur);
        return utilisateur;
    }

    async findAll() {
        return this.utilisateurs;
    }
}

