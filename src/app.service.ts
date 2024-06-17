import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AppService {

  constructor(@InjectQueue('health-check') private healthQueue : Queue) {}

  async getHello(): Promise<string> {
    const job = await this.healthQueue.add({ test: 'test' });
    return `Hello World! Job ID: ${job.id}`;
  }

}
