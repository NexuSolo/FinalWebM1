import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Utilisateur } from "src/utilisateur/models/utilisateur.model";

@ObjectType()
export class Message {

    @Field(type => ID)
    id: number;

    @Field(type => Utilisateur)
    user: Utilisateur;

    @Field(type => String)
    text: string;

    @Field(type => Date, { nullable: true })
    creationDate: Date;
}
