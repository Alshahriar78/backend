import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { AdminsService } from '../admins/admins.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ) {
    const admin =
      await this.adminsService.findByUsername(
        username,
      );

    if (!admin) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password,
      );

    if (!isMatch) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const payload = {
      sub: admin.id,
      username: admin.username,
    };

    return {
      access_token:
        await this.jwtService.signAsync(
          payload,
        ),
    };
  }
}