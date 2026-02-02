import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: TUser, info: any): TUser {
    // SEM TOKEN
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (info?.name === 'JsonWebTokenError' || info?.name === 'NoAuthToken') {
      throw new UnauthorizedException('Token não fornecido!');
    }

    // TOKEN INVÁLIDO
    if (err || !user) {
      throw new UnauthorizedException('Token inválido ou expirado!');
    }

    return user;
  }
}
