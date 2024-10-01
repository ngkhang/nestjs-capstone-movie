import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// FIXME: Convert using env variable
export class JwtAuthGuard extends AuthGuard('passport-jwt') {}
