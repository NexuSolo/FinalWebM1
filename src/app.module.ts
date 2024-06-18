import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { AppConsumer } from './app.consumer';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MessageResolver } from './message/message.resolver';
import { MessageService } from './message/message.service';
import { UtilisateurService } from './utilisateur/utilisateur.service';
import { UtilisateurResolver } from './utilisateur/utilisateur.resolver';
import { ConversationResolver } from './conversation/conversation.resolver';
import { ConversationService } from './conversation/conversation.service';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      },
    }),
    BullModule.registerQueue({
      name: 'messages'
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      host: 'localhost',
      port: 6379
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppConsumer, MessageResolver, MessageService, UtilisateurService, UtilisateurResolver, ConversationResolver, ConversationService],
})
export class AppModule {}
