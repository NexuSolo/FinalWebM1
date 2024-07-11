import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Utilisateur } from './models/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Resolver(() => Utilisateur)
export class UtilisateurResolver {
    constructor(private readonly utilisateurService: UtilisateurService) {}

    @Mutation(() => Utilisateur)
    async createUser(
        @Args('username') username: string,
        @Args('password') password: string,
        @Args('email') email: string
    ) {
        return this.utilisateurService.createUser(username, password, email);
    }

    @Query(() => Utilisateur)
    async getUtilisateurByUsername(@Args('username') username: string) {
        return this.utilisateurService.getUtilisateurByUsername(username);
    }

    @Query(() => Utilisateur)
    async login(@Args('username') username: string, @Args('password') password: string) {
        return this.utilisateurService.login(username, password);
    }
}
