import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import User from './user.entity';
import CreateUser from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(newUser: CreateUser): Promise<void> {
    const existingUser: User | null = await this.userRepository.getUserByEmail(
      newUser.email,
    );
    if (existingUser) throw new BadRequestException('Email já cadastrado');

    await this.userRepository.createUser(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.getAllUsers();
    if (!users.length) throw new NotFoundException('Nenhum usuário encontrado');

    return users;
  }
}
