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

@Global()
@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: 'redis',
                port: 6379
            }
        }),
        BullModule.registerQueue({
            name: 'messages'
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
        UtilisateurService,
        UtilisateurResolver,
        ConversationResolver,
        ConversationService,
        PrismaService
    ]
})
export class AppModule {}
