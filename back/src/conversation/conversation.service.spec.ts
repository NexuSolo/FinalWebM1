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
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: UtilisateurService,
          useValue: {
            getUtilisateurById: jest.fn()
          }
        }
      ],
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
      const input = { user1: "id1", user2: "id2" };
      const result = { id: "id1", messages : [], users: [input.user1, input.user2] };
      jest.spyOn(utilisateurService, 'getUtilisateurById')
        .mockImplementationOnce(() => Promise.resolve(new Utilisateur(input.user1, "user1"))) 
        .mockImplementationOnce(() => Promise.resolve(new Utilisateur(input.user2, "user2")));
      jest.spyOn(prismaService.conversation, 'create').mockResolvedValue(result);
      expect(await service.createConversation(input.user1, input.user2)).toEqual(result);
    })
  });

});

