import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify as jwtDecode } from '../utils/jwt';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userIdFromToken = this.getUserIdFromToken(
      request.headers.authorization,
    );

    if (!userIdFromToken) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    const requestedUserId = request.params.id;

    if (userIdFromToken !== requestedUserId) {
      throw new UnauthorizedException(
        'Unauthorized. Token user does not match requested user',
      );
    }

    return true;
  }

  private getUserIdFromToken(authorizationHeader: string): string | null {
    try {
      const token = authorizationHeader.split(' ')[1];
      const decoded = jwtDecode(token);
      return decoded['userId'];
    } catch (error) {
      return null;
    }
  }
}
