import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MessageService } from './message.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Processor('messages')
export class MessagesProcessor {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private messageService: MessageService) {}

  @Process()
  async handleJob(job: Job) {
    const message = job.data;
    this.cacheManager.set(message.id.toString(), message, 0);
    // console.log(`Traitement du message : ${message.text}`);
  }
}