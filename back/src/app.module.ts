import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MessageResolver } from './message/message.resolver';
import { MessageService } from './message/message.service';
import { UtilisateurService } from './utilisateur/utilisateur.service';
import { UtilisateurResolver } from './utilisateur/utilisateur.resolver';
import { ConversationResolver } from './conversation/conversation.resolver';
import { ConversationService } from './conversation/conversation.service';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { MessageProcessor } from './message/message.processor';

@Global()
@Module({
    imports: [
        CacheModule.register({
            ttl: 3600000
        }),
        BullModule.forRoot({
            redis: {
                host: 'redis',
                port: 6379
            }
        }),
        BullModule.registerQueue({
            name: 'messages',
            redis: {
                port: 6379
            }
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true
        }),
        DatabaseModule
    ],
    controllers: [],
    providers: [
        MessageResolver,
        MessageService,
        MessageProcessor,
        UtilisateurService,
        UtilisateurResolver,
        ConversationResolver,
        ConversationService,
        PrismaService
    ]
})
export class AppModule {}
