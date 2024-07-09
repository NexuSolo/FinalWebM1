import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('messages')
export class MessageProcessor {
    constructor() {}

    @Process()
    async handleJob(job: Job) {
        const message = job.data;
        console.log(`Traitement du message : ${message.text}`);
    }
}
