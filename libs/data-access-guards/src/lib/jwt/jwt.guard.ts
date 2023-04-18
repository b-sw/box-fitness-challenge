import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

const JWT_GUARD_TYPE = 'jwt';

@Injectable()
export class JwtGuard extends AuthGuard(JWT_GUARD_TYPE) {}
