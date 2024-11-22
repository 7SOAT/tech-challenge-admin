import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

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
      const payload = this.jwtService.verify(bearerToken);
      if (!payload.isAdmin) {
        throw new ForbiddenException('You do not have permission to access this resource');
      }
      (request as Request & { user: any }).user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
