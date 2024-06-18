import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Message } from "src/message/models/message.model";
import { Utilisateur } from "src/utilisateur/models/utilisateur.model";

@ObjectType()
export class Conversation {

    constructor(user1: Utilisateur, user2: Utilisateur) {
        this.user1 = user1;
        this.user2 = user2;
    }

    @Field(type => ID)
    id: number;

    @Field(type => String)
    name: string;

    @Field(type => Utilisateur)
    user1: Utilisateur;

    @Field(type => Utilisateur)
    user2: Utilisateur;

    @Field(type => [Message])
    messages: Message[];
    
}
