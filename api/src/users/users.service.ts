import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({
      userName: createUserDto.userName,
    });

    const existingEmail = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (existingEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.userName = createUserDto.userName;
    user.email = createUserDto.email;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(createUserDto.password, salt);

    user.isActive = createUserDto.isActive;

    return this.usersRepository.save(user);
  }

  findOneByUserName(userName: string): Promise<User> {
    return this.usersRepository.findOneBy({ userName: userName });
  }

  async findOne(email: string): Promise<Partial<User>> {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      const { password, ...userWithoutPassword } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
      console.log(userWithoutPassword);
      return userWithoutPassword;
    }
    return null;
  }

  async remove(email: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.delete(email);
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await this.usersRepository.save(user);
  }
}
