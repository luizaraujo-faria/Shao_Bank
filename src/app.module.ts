import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
