import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Utilisateur } from 'src/utilisateur/models/utilisateur.model';
import { Conversation } from './models/conversation.model';

@Injectable()
export class ConversationService {

    // constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    createConversation(user1 : Utilisateur, user2 : Utilisateur) {
        const conversation = new Conversation(user1, user2);
        return conversation;
    }

}
