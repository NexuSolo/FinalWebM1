import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Utilisateur } from './models/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';

@Resolver(of => Utilisateur)
export class UtilisateurResolver {

    

}
