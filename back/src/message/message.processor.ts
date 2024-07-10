import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SocketService } from 'src/socket/socket.service';

@Processor('messages')
export class MessageProcessor {
    constructor(private readonly socketService: SocketService) {}

    @Process()
    async handleJob(job: Job) {
        const message = job.data;
        this.socketService.emitClientEvent(message);
    }
}
