import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userRole = request.user.role;

    return matchRoles(roles, userRole);
  }
}

function matchRoles(
  roles: any,
  userRoles: any,
): boolean | Promise<boolean> | Observable<boolean> {
  console.log(roles, userRoles);
  if (roles.includes(userRoles)) {
    return true;
  } else {
    throw new ForbiddenException({
      statusCode: 403,
      message: 'You Do Not Have Access To This Protected Data',
      error: 'Forbidden',
    });
  }
}
