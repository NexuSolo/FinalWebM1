import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './models/message.model';

@Resolver(of => Message)
export class MessageResolver {

    constructor(private messageService: MessageService) {}

    @Query(returns => [Message])
    async messages() {
        return this.messageService.findAll();
    }
}
