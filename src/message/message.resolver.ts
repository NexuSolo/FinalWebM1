import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './models/message.model';

@Resolver(of => Message)
export class MessageResolver {

    constructor(private messageService: MessageService) {}

    @Mutation(of => Message)
    async createMessage(@Args('text') text: string, @Args('userId') userId: number) {
        return this.messageService.createMessage(userId, text);
    }

    @Query(returns => Message)
    async getMessage(@Args('id') id: number) {
        return this.messageService.getAllMessages(id);
    }
    
}
