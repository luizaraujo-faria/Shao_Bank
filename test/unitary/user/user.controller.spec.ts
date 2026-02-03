import { Test } from '@nestjs/testing';
import { UserController } from '../../../src/modules/user/user.controller';
import { UserService } from '../../../src/modules/user/user.service';

describe('Testes da UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            getAllUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(UserController);
    service = module.get(UserService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  })

  // CADASTRO
  describe('Cadastro de usuário', () => {
    it('Deve chamar a service para criar usuário', async () => {
      service.createUser.mockResolvedValue(undefined);

      const newUser = {
        userName: 'teste',
        email: 'test@test.com',
        userPassword: 'test@123E',
      };

      await expect(controller.createUser(newUser)).resolves.not.toThrow();

      expect(service.createUser).toHaveBeenCalledWith(newUser);
      expect(service.createUser).toHaveBeenCalledTimes(1);
    });

    it('Deve propagar o erro da service ao criar usuário', async () => {
      service.createUser.mockRejectedValue(new Error('Email já cadastrado!'));

      const newUser = {
        userName: 'teste',
        email: 'test@test.com',
        userPassword: 'test@123E',
      };

      await expect(controller.createUser(newUser)).rejects.toThrow(
        'Email já cadastrado!',
      );

      expect(service.createUser).toHaveBeenCalledWith(newUser);
      expect(service.createUser).toHaveBeenCalledTimes(1);
    });
  });

  // LISTA TODOS USUÁRIOS
  describe('Lista todos os usuários', () => {
    it('Deve chamar a service para buscar todos os usuários', async () => {
      service.getAllUsers.mockResolvedValue([
        {
          id: 1,
          userName: 'teste',
          email: 'test@test.com',
        },
      ]);

      const users = await controller.getAllUsers();

      expect(users.data).toHaveLength(1);
      expect(users.data![0].email).toBe('test@test.com');
      expect(service.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('Deve propagar o erro da service ao buscar todos os usuários', async () => {
      service.getAllUsers.mockRejectedValue(
        new Error('Nenhum usuário encontrado!'),
      );

      await expect(controller.getAllUsers()).rejects.toThrow(
        'Nenhum usuário encontrado!',
      );
    });
  });
});
