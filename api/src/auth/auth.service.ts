import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException('User does not exist');
    } else if (user?.password !== pass) {
      throw new NotFoundException('Passwords do not match');
    }
    const payload = { username: user.userName, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
