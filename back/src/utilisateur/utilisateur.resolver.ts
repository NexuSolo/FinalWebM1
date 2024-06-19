import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Utilisateur } from './models/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Resolver(of => Utilisateur)
export class UtilisateurResolver {

    constructor(private readonly utilisateurService: UtilisateurService) {}

    @Mutation(of => Utilisateur)
    async createUser(@Args('username') username: string) {
        return this.utilisateurService.createUser(username);
    }

}
