import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import User from './user.entity';
import CreateUser from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';
import { plainToInstance } from 'class-transformer';
import { UserResponse } from './dto/get-user-response';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(newUser: CreateUser): Promise<void> {
    const existingUser: User | null = await this.userRepository.findByEmail(
      newUser.email,
    );
    if (existingUser) throw new BadRequestException('Email já cadastrado!');

    await this.userRepository.createUser(newUser);
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.getAll();
    if (!users.length)
      throw new NotFoundException('Nenhum usuário encontrado!');

    return plainToInstance(UserResponse, users, {
      excludeExtraneousValues: true,
    });
  }
}
