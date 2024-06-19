import { Test, TestingModule } from '@nestjs/testing';
import { UtilisateurService } from './utilisateur.service';
import { PrismaService } from '../database/prisma.service';
import { v4 as uuidv4 } from 'uuid';

describe('UtilisateurService', () => {
  let service: UtilisateurService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UtilisateurService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UtilisateurService>(UtilisateurService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const input = "username";
      const result = { id : uuidv4(), username: input };
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(result);
      expect(await service.createUser(input)).toEqual(result);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          username: input
        }
      });
    }),
    it('should throw an error if the user already exists', async () => {
      const input = "username";
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({ id: uuidv4(), username: input });
      expect(await service.createUser(input)).toBe(null)
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {
          username: input
        }
      });
    });
  });

});