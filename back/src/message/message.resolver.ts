import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './models/message.model';

@Resolver(() => Message)
export class MessageResolver {
    constructor(private messageService: MessageService) {}

    @Mutation(() => Message)
    async createMessage(
        @Args('text') text: string,
        @Args('userId') userId: string,
        @Args('conversationId') conversationId: string
    ) {
        return this.messageService.createMessage(userId, text, conversationId);
    }

    @Query(() => [Message])
    async getMessageByConversation(@Args('conversationId') conversationId: string) {
        return this.messageService.getMessageByConversation(conversationId);
    }
}
