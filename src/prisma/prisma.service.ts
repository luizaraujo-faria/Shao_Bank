import {
  Injectable,
  OnModuleInit,
  // OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaMariaDb({
      user: process.env.DATABASE_USER_NAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      connectionLimit: 5,
      connectTimeout: 10000,
    });
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      Logger.log('Base de Dados Conectada');
    } catch (err) {
      Logger.error('Falha ao conectar com base de dados!', err);
    }
  }

  // async onModuleDestroy() {
  //   await this.$disconnect();
  // }
}
