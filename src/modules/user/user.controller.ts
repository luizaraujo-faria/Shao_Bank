import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUser from './dto/create-user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  @HttpCode(201)
  async createUser(@Body() reqBody: CreateUser) {
    await this.userService.createUser(reqBody);

    return {
      message: 'usuário criado com sucesso!',
    };
  }

  @Get('/')
  async getAllUsers() {
    const users = await this.userService.getAllUsers();

    return {
      message: 'Usuários buscados com sucesso!',
      data: users,
    };
  }
}
