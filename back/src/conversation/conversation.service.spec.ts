import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService } from './conversation.service';
import { PrismaService } from '../database/prisma.service';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { Utilisateur } from '../utilisateur/models/utilisateur.model';

describe('ConversationService', () => {
    let service: ConversationService;
    let prismaService: PrismaService;
    let utilisateurService: UtilisateurService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ConversationService,
                {
                    provide: PrismaService,
                    useValue: {
                        conversation: {
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
                }
            ]
        }).compile();

        service = module.get<ConversationService>(ConversationService);
        prismaService = module.get<PrismaService>(PrismaService);
        utilisateurService = module.get<UtilisateurService>(UtilisateurService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createConversation', () => {
        it('should create a new conversation', async () => {
            const input = { user1: 'id1', user2: 'id2' };
            const result = { id: 'id1', messages: [], users: [input.user1, input.user2] };
            jest.spyOn(utilisateurService, 'getUtilisateurById')
                .mockImplementationOnce(() => Promise.resolve(new Utilisateur(input.user1, 'user1')))
                .mockImplementationOnce(() => Promise.resolve(new Utilisateur(input.user2, 'user2')));
            jest.spyOn(prismaService.conversation, 'create').mockResolvedValue(result);
            expect(await service.createConversation(input.user1, input.user2)).toEqual(result);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledTimes(2);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledWith(input.user1);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledWith(input.user2);
            expect(prismaService.conversation.create).toHaveBeenCalledWith({
                data: {
                    users: {
                        connect: [{ id: input.user1 }, { id: input.user2 }]
                    }
                }
            });
        });
        it('should return null if user1 does not exist', async () => {
            const input = { user1: 'id1', user2: 'id2' };
            jest.spyOn(utilisateurService, 'getUtilisateurById')
                .mockImplementationOnce(() => null)
                .mockImplementationOnce(() => Promise.resolve(new Utilisateur(input.user2, 'user2')));
            expect(await service.createConversation(input.user1, input.user2)).toBeNull();
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledTimes(2);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledWith(input.user1);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledWith(input.user2);
            expect(prismaService.conversation.create).not.toHaveBeenCalled();
        });
        it('should return null if user2 does not exist', async () => {
            const input = { user1: 'id1', user2: 'id2' };
            jest.spyOn(utilisateurService, 'getUtilisateurById')
                .mockImplementationOnce(() => Promise.resolve(new Utilisateur(input.user1, 'user1')))
                .mockImplementationOnce(() => null);
            expect(await service.createConversation(input.user1, input.user2)).toBeNull();
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledTimes(2);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledWith(input.user1);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledWith(input.user2);
            expect(prismaService.conversation.create).not.toHaveBeenCalled();
        });
    });

    describe('getConversationByUser', () => {
        it('should return all conversations of a user', async () => {
            const input = 'id1';
            const result = [{ id: 'id1', messages: [], users: ['id1', 'id2'] }];
            jest.spyOn(utilisateurService, 'getUtilisateurById').mockResolvedValueOnce(new Utilisateur(input, 'user1'));
            jest.spyOn(prismaService.conversation, 'findMany').mockResolvedValueOnce(result);
            expect(await service.getConversationByUser(input)).toEqual(result);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledTimes(1);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledWith(input);
            expect(prismaService.conversation.findMany).toHaveBeenCalledWith({
                where: {
                    users: {
                        some: {
                            id: input
                        }
                    }
                },
                include: {
                    users: true,
                    messages: true
                }
            });
        });
        it('should return null if user does not exist', async () => {
            const input = 'id1';
            jest.spyOn(utilisateurService, 'getUtilisateurById').mockResolvedValueOnce(Promise.resolve(null));
            expect(await service.getConversationByUser(input)).toBeNull();
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledTimes(1);
            expect(utilisateurService.getUtilisateurById).toHaveBeenCalledWith(input);
            expect(prismaService.conversation.findMany).not.toHaveBeenCalled();
        });
    });
});
