// {
//   "moduleFileExtensions": ["js", "json", "ts"],
//   "rootDir": ".",
//   "testEnvironment": "node",
//   "testRegex": ".e2e-spec.ts$",
//   "transform": {
//     "^.+\\.(t|j)s$": "ts-jest"
//   }
// }

import { Test } from '@nestjs/testing';
import { UserRepository } from '../../src/modules/user/repository/user.repository';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('Testes do UserRepository', () => {
  let repository: UserRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: {
            tbUser: {
              $executeRaw: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get(UserRepository);
    prisma = module.get(PrismaService);
  });

  it('Deve executar a procedure ao criar um usuário', async () => {
    prisma.tbUser.$executeRaw.mockResolveValue(1 as any);

    await repository.createUser({
      userName: 'Teste',
      email: 'teste@gmail.com',
      userPassword: 'Teste@123'
    })

    expect(prisma.tbUser.$executeRaw).toHaveBeenCalled();
  });
});
