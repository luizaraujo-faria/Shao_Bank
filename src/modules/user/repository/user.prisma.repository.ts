import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import CreateUser from '../dto/create-user.dto';
import User from '../user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(newUser: CreateUser): Promise<void> {
    await this.prisma.$executeRaw`
        call spCreate_User(
            ${newUser.userName}, 
            ${newUser.email}, 
            ${newUser.userPassword}
        );`;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.tbUser.findUnique({ where: { email } });
  }

  async getAll(): Promise<User[]> {
    return await this.prisma.tbUser.findMany();
  }
}
export { UserRepository };
