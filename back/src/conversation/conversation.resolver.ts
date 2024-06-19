import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { Conversation } from './models/conversation.model';
import { ConversationService } from './conversation.service';

@Resolver(of => Conversation)
export class ConversationResolver {

    constructor(private readonly conversationService: ConversationService) {}

    @Query(returns => [Conversation])
    async getAllConversationsByUser(@Args('userId') userId: string) {
        return this.conversationService.getConversatinByUser(userId);
    }

    @Mutation(of => Conversation)
    async createConversation(@Args('user1') user1: string, @Args('user2') user2: string) {
        return this.conversationService.createConversation(user1, user2);
    }

}
