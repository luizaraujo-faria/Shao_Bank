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
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(newUser: CreateUser): Promise<void> {
    const existingUser: User | null = await this.userRepository.findByEmail(
      newUser.email,
    );
    if (existingUser) throw new BadRequestException('Email já cadastrado!');

    const hashPassword: string = await bcrypt.hash(newUser.userPassword, 10);

    const serializedUser: CreateUser = {
      ...newUser,
      userPassword: hashPassword,
    };

    await this.userRepository.createUser(serializedUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.userRepository.findByEmail(email);
    // if (!user) {
    //   throw new NotFoundException('Nenhum usuário encontrado para este email!');
    // }

    return user;
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
