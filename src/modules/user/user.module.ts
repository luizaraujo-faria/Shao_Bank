import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserPrismaRepository,
  UserRepository,
} from './repository/user.prisma.repository';
import { UserController } from './user.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
