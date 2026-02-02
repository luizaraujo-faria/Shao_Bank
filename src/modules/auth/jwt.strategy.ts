import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { plainToInstance } from 'class-transformer';
import { UserResponse } from '../user/dto/get-user-response';

export interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userSerivice: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userSerivice.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Token não fornecido!');
    }

    // RETORNA APENAS DADOS SEGUROS
    return plainToInstance(UserResponse, user, {
      excludeExtraneousValues: true,
    });
  }
}
