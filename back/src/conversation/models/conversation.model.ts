import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/message/models/message.model';
import { Utilisateur } from 'src/utilisateur/models/utilisateur.model';

@ObjectType()
export class Conversation {
    @Field(() => ID)
    id: number;

    @Field(() => [Utilisateur])
    users: Utilisateur[];

    @Field(() => [Message])
    messages: Message[];
}
