import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './models/message.model';

@Resolver(of => Message)
export class MessageResolver {

    constructor(private messageService: MessageService) {}

    @Mutation(of => Message)
    async createUser(@Args('text') text: string) {
        return this.messageService.createMessage(text);
    }

    @Query(returns => [Message])
    async getAllMessages() {
        return this.messageService.getAllMessages();
    }
}
