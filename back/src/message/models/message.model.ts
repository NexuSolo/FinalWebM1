import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Conversation } from 'src/conversation/models/conversation.model';
import { Utilisateur } from 'src/utilisateur/models/utilisateur.model';

@ObjectType()
export class Message {
    @Field(() => ID)
    id: string;

    @Field(() => Utilisateur)
    user: Utilisateur;

    @Field(() => String)
    text: string;

    @Field(() => Date, { nullable: true })
    createdAt: Date;

    @Field(() => Conversation)
    conversation: Conversation;
}
