import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserSignIn } from '../user/dto/user-signin';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // MINHA USERSERVICE
    private readonly jwtService: JwtService, // CLASSE DO @NEST/JWT
  ) {}

  async signIn(userSignin: UserSignIn): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(userSignin.email);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos!');
    }

    // COMPARA SENHAS
    const passwordMatch = await bcrypt.compare(
      userSignin.userPassword,
      user.userPassword,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Email ou senha inválidos!');
    }

    // ESTRUTURA DO TOKEN
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload), // RETORNA TOKEN
    };
  }
}
