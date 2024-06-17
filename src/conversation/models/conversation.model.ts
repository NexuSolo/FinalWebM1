import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Message } from "src/message/models/message.model";
import { Utilisateur } from "src/utilisateur/models/utilisateur.model";

@ObjectType()
export class Conversation {

    @Field(type => ID)
    id: number;

    @Field(type => String)
    name: string;

    @Field(type => [Utilisateur])
    users: Utilisateur[];

    @Field(type => [Message])
    messages: Message[];
}
