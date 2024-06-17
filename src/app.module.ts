import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { AppConsumer } from './app.consumer';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      },
    }),
    BullModule.registerQueue({
      name: 'health-check'
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppConsumer],
})
export class AppModule {}
