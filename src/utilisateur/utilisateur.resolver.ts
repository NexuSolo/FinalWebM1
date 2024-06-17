import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Utilisateur } from './models/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Resolver(of => Utilisateur)
export class UtilisateurResolver {
    constructor(private utilisateurService: UtilisateurService) {}

    @Mutation(of => Utilisateur)
    async createUser(@Args('username') username: string) {
        return this.utilisateurService.createUser(username);
    }

    @Query(returns => [Utilisateur])
    async getAllUsers() {
        return this.utilisateurService.findAll();
    }
}
