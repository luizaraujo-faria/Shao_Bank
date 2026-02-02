import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignIn } from '../user/dto/user-signin';
import { SignInResponse } from '../../res/AppResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() userSignIn: UserSignIn) {
    const token = await this.authService.signIn(userSignIn);
    return SignInResponse.res(token.access_token);
  }
}
