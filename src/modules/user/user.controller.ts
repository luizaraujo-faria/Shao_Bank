import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUser from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { SuccessResponse } from '../../res/AppResponse';
import { UserResponse } from './dto/get-user-response';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @HttpCode(201)
  async createUser(@Body() reqBody: CreateUser) {
    await this.userService.createUser(reqBody);

    return SuccessResponse.res('Usuário registrado com sucesso!', null);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return SuccessResponse.res<UserResponse>('Perfil carregado!', req.user);
  }

  @Get('all')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();

    return SuccessResponse.res<UserResponse[]>(
      'Usuários listados com sucesso!',
      users,
    );
  }
}
