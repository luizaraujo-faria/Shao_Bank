jest.mock('bcrypt');
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { UserService } from '../../../src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('Testes do serviço de autenticação', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Autenticação de usuários', () => {
    it('Deve retornar token quando as credenciais forem corretas', async () => {
      userService.findByEmail.mockResolvedValue({
        id: 1,
        userName: 'teste',
        email: 'test@test.com',
        userPassword: 'hash_password',
        createdAt: new Date(),
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.signAsync.mockResolvedValue('jwt_fake');

      const token = await service.signIn({
        email: 'test@test.com',
        userPassword: 'test123@E',
      });

      expect(token).toEqual({ access_token: 'jwt_fake' });
      expect(userService.findByEmail).toHaveBeenCalledWith('test@test.com');
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: 1,
        email: 'test@test.com',
      });
    });

    it('Deve lançar erro ao receber senha incorreta', async () => {
      userService.findByEmail.mockResolvedValue({
        id: 1,
        userName: 'teste',
        email: 'test@test.com',
        userPassword: 'hash_password',
        createdAt: new Date(),
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.signIn({
          email: 'test@test.com',
          userPassword: 'senha_incorreta',
        }),
      ).rejects.toThrow(new UnauthorizedException('Email ou senha inválidos!'));
      expect(userService.findByEmail).toHaveBeenCalledWith('test@test.com');
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    it('Deve lançar erro ao não encontrar usuário pelo email', async () => {
      userService.findByEmail.mockRejectedValue(
        new NotFoundException('Nenhum usuário encontrado para este email!'),
      );

      await expect(
        service.signIn({
          email: 'test@test.com',
          userPassword: 'senha_incorreta',
        }),
      ).rejects.toThrow(NotFoundException);

      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });
  });
});
