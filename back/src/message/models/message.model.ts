import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Conversation } from "src/conversation/models/conversation.model";
import { Utilisateur } from "src/utilisateur/models/utilisateur.model";

@ObjectType()
export class Message {
    @Field(type => ID)
    id: string;

    @Field(type => Utilisateur)
    user: Utilisateur;

    @Field(type => String)
    text: string;

    @Field(type => Date, { nullable: true })
    createdAt: Date;

    @Field(type => Conversation)
    conversation: Conversation;
}
