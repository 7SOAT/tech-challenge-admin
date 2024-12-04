import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { decodeJwt } from 'jose'
@Injectable()

export class AdminGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const bearerToken = authHeader.split(' ')[1];
    if (!bearerToken) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = decodeJwt(bearerToken);
      if (!payload.isAdmin) {
        throw new UnauthorizedException('Unauthorized');
      }
      (request as Request & { user: any }).user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
