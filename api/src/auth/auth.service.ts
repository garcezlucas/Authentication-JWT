import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  private refreshTokens = new Map();

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const passwordMatches = await bcrypt.compare(pass, user.password);
    if (!passwordMatches) {
      throw new NotFoundException('Passwords do not match');
    }

    const payload = { username: user.userName, sub: user.id };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    this.refreshTokens.set(user.id, refresh_token);

    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(oldRefreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(oldRefreshToken, {
        secret: jwtConstants.secret,
      });

      const storedToken = this.refreshTokens.get(payload.sub);
      if (!storedToken || storedToken !== oldRefreshToken) {
        throw new Error('Invalid refresh token');
      }

      const newAccessToken = await this.jwtService.signAsync(
        { sub: payload.sub },
        { expiresIn: '15m' },
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new NotFoundException('Invalid or expired refresh token');
    }
  }
}
