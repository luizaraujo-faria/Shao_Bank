import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../src/modules/user/repository/user.repository';
import { UserService } from '../../../src/modules/user/user.service';

describe('Testes da UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
            findByEmail: jest.fn(),
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(UserService);
    repository = module.get(UserRepository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  // TESTES DE SUCESSO
  it('Deve criar usuário se email não existir', async () => {
    repository.findByEmail.mockResolvedValue(null);

    await expect(
      service.createUser({
        userName: 'teste',
        email: 'test@test.com',
        userPassword: 'test@123E',
      }),
    ).resolves.not.toThrow();

    expect(repository.createUser).toHaveBeenCalledWith({
      userName: 'teste',
      email: 'test@test.com',
      userPassword: 'test@123E',
    });
  });

  it('Deve retornar todos os usuários corretamente', async () => {
    repository.getAll.mockResolvedValue([
      {
        id: 1,
        userName: 'teste',
        email: 'test@test.com',
        userPassword: 'test@123E',
        createdAt: new Date(),
      },
      {
        id: 2,
        userName: 'teste2',
        email: 'test2@test.com',
        userPassword: 'test@123E',
        createdAt: new Date(),
      },
    ]);

    const users = await service.getAllUsers();

    expect(users).toHaveLength(2);
    expect(users[0].email).toBe('test@test.com');
    expect(users[1].email).toBe('test2@test.com');
  });

  // TESTES DE FALHAS
  it('Deve lançar erro ao criar usuário com email já existente', async () => {
    repository.findByEmail.mockResolvedValue({
      id: 1,
      userName: 'teste',
      email: 'test@test.com',
      userPassword: 'test@123E',
      createdAt: new Date(),
    });

    await expect(
      service.createUser({
        userName: 'teste',
        email: 'test@test.com',
        userPassword: 'test@123E',
      }),
    ).rejects.toThrow('Email já cadastrado!');

    expect(repository.createUser).not.toHaveBeenCalled();
  });

  it('deve lançar erro ao não encontrar nenhum usuário', async () => {
    repository.getAll.mockResolvedValue([]);

    await expect(service.getAllUsers()).rejects.toThrow(
      'Nenhum usuário encontrado!',
    );
    expect(repository.getAll).toHaveBeenCalledTimes(1);
  });
});
