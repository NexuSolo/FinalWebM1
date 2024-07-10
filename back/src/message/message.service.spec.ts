import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { PrismaService } from '../database/prisma.service';
import { getQueueToken } from '@nestjs/bull';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Queue } from 'bull';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { ConversationService } from '../conversation/conversation.service';

describe('MessageService', () => {
    let service: MessageService;
    let prismaService: PrismaService;
    let utilisateurService: UtilisateurService;
    let conversationService: ConversationService;
    let cacheManagerMock: Partial<Cache>;
    let messageQueueMock: Partial<Queue>;

    beforeEach(async () => {
        cacheManagerMock = {
            get: jest.fn(),
            set: jest.fn()
        };

        messageQueueMock = {
            add: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MessageService,
                {
                    provide: PrismaService,
                    useValue: {
                        message: {
                            create: jest.fn(),
                            findMany: jest.fn()
                        }
                    }
                },
                {
                    provide: UtilisateurService,
                    useValue: {
                        getUtilisateurById: jest.fn()
                    }
                },
                {
                    provide: ConversationService,
                    useValue: {
                        getConversationByUser: jest.fn()
                    }
                },
                {
                    provide: getQueueToken('messages'),
                    useValue: messageQueueMock
                },
                {
                    provide: CACHE_MANAGER,
                    useValue: cacheManagerMock
                }
            ]
        }).compile();

        service = module.get<MessageService>(MessageService);
        prismaService = module.get<PrismaService>(PrismaService);
        utilisateurService = module.get<UtilisateurService>(UtilisateurService);
        conversationService = module.get<ConversationService>(ConversationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createMessage', () => {
        it('should create a new message', async () => {
            const input = { conversationId: 'id1', userId: 'id1', text: 'content' };
            const useroutput = { id: 'id1', username: 'user1' };
            const conversationOutput = [
                {
                    messages: [],
                    users: [
                        { id: 'id1', username: 'user1' },
                        { id: 'id2', username: 'user2' }
                    ],
                    id: 'id1'
                }
            ];
            const resultOutput = {
                id: 'id1',
                text: 'content',
                userId: 'id2',
                conversationId: 'id1',
                conversation: [{}],
                user: [
                    { id: 'id1', username: 'user1' },
                    { id: 'id2', username: 'user2' }
                ],
                createdAt: new Date()
            };
            jest.spyOn(utilisateurService, 'getUtilisateurById').mockResolvedValueOnce(useroutput);
            jest.spyOn(conversationService, 'getConversationByUser').mockResolvedValueOnce(conversationOutput);
            jest.spyOn(prismaService.message, 'create').mockResolvedValueOnce(resultOutput);
            (cacheManagerMock.get as jest.Mock).mockResolvedValueOnce(null);
            (cacheManagerMock.set as jest.Mock).mockResolvedValueOnce([]);
            (messageQueueMock.add as jest.Mock).mockResolvedValueOnce([]);

            const res = await service.createMessage(input.userId, input.text, input.conversationId);

            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledWith(input.userId);
            expect(conversationService.getConversationByUser).toHaveBeenCalledWith(input.userId);
            expect(prismaService.message.create).toHaveBeenCalledWith({
                data: {
                    userId: input.userId,
                    text: input.text,
                    conversationId: input.conversationId
                },
                include: {
                    conversation: true,
                    user: true
                }
            });
            expect(cacheManagerMock.get).toHaveBeenCalledWith(input.conversationId);
            expect(cacheManagerMock.set).toHaveBeenCalledWith(input.conversationId, [resultOutput]);
            expect(messageQueueMock.add).toHaveBeenCalledWith(resultOutput);
            expect(res).toEqual(resultOutput);
        });

        it('should return null if user does not exist', async () => {
            const input = { conversationId: 'id1', userId: 'id1', text: 'content' };
            const useroutput = null;
            jest.spyOn(utilisateurService, 'getUtilisateurById').mockResolvedValueOnce(useroutput);
            expect(await service.createMessage(input.userId, input.text, input.conversationId)).toBeNull();
        });

        it('should return null if conversation is not in the user conversations', async () => {
            const input = { conversationId: 'id1', userId: 'id1', text: 'content' };
            const useroutput = { id: 'id1', username: 'user1' };
            const conversationOutput = [];
            jest.spyOn(utilisateurService, 'getUtilisateurById').mockResolvedValueOnce(useroutput);
            jest.spyOn(conversationService, 'getConversationByUser').mockResolvedValueOnce(conversationOutput);
            expect(await service.createMessage(input.userId, input.text, input.conversationId)).toBeNull();
        });
    });

    describe('getMessagesByConversation', () => {
        it('should return all messages of a conversation with no cache and not bdd empty', async () => {
            const input = 'id1';
            const result = [
                {
                    id: 'id1',
                    text: 'content',
                    userId: 'id2',
                    conversationId: 'id1',
                    user: [
                        { id: 'id1', username: 'user1' },
                        { id: 'id2', username: 'user2' }
                    ],
                    createdAt: new Date()
                }
            ];
            (cacheManagerMock.get as jest.Mock).mockResolvedValueOnce(null);
            jest.spyOn(prismaService.message, 'findMany').mockResolvedValueOnce(result);
            (cacheManagerMock.set as jest.Mock).mockResolvedValueOnce([]);

            const res = await service.getMessageByConversation(input);
            expect(cacheManagerMock.get).toHaveBeenCalledWith(input);
            expect(prismaService.message.findMany).toHaveBeenCalledWith({
                where: { conversationId: input },
                include: { conversation: true, user: true }
            });
            expect(cacheManagerMock.set).toHaveBeenCalledWith(input, result);
            expect(res).toEqual(result);
        });

        it('should return all messages of a conversation with no cache and bdd empty', async () => {
            const input = 'id1';
            const result = [];
            (cacheManagerMock.get as jest.Mock).mockResolvedValueOnce(null);
            jest.spyOn(prismaService.message, 'findMany').mockResolvedValueOnce(result);

            const res = await service.getMessageByConversation(input);
            expect(cacheManagerMock.get).toHaveBeenCalledWith(input);
            expect(prismaService.message.findMany).toHaveBeenCalledWith({
                where: { conversationId: input },
                include: { conversation: true, user: true }
            });
            expect(res).toEqual(result);
        });

        it('should return all messages of a conversation with cache', async () => {
            const input = 'id1';
            const result = [
                {
                    id: 'id1',
                    text: 'content',
                    userId: 'id2',
                    conversationId: 'id1',
                    user: [
                        { id: 'id1', username: 'user1' },
                        { id: 'id2', username: 'user2' }
                    ],
                    createdAt: new Date()
                }
            ];
            (cacheManagerMock.get as jest.Mock).mockResolvedValueOnce([
                {
                    id: 'id1',
                    text: 'content',
                    userId: 'id2',
                    conversationId: 'id1',
                    user: [
                        { id: 'id1', username: 'user1' },
                        { id: 'id2', username: 'user2' }
                    ],
                    createdAt: new Date()
                }
            ]);

            const res = await service.getMessageByConversation(input);
            expect(cacheManagerMock.get).toHaveBeenCalledWith(input);
            expect(res).toEqual(result);
        });
    });
});
