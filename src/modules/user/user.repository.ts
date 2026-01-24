import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import CreateUser from './dto/create-user.dto';
import User from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(newUser: CreateUser): Promise<void> {
    await this.prisma.$executeRaw`
        call spCreate_User(
            ${newUser.userName}, 
            ${newUser.email}, 
            ${newUser.userPassword}
        );`;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.tbuser.findUnique({ where: { email } });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prisma.tbuser.findMany();
  }
}
