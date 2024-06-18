import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { Conversation } from './models/conversation.model';
import { Message } from 'src/message/models/message.model';

@Resolver(of => Conversation)
export class ConversationResolver {

    @Query(returns => [Conversation])
    async getAllConversationsByUser() {
        return [];
    }

    @Query(returns => [Message])
    async getMessagesByConversation(@Args('conversationId') conversationId: number) {
        return [];
    }

    @Mutation(of => Conversation)
    async createConversation(@Args('user1') user1: number, @Args('user2') user2: number) {
        return null;
    }


}
