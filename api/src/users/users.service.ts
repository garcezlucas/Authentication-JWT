import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.userName = createUserDto.userName;
    user.password = createUserDto.password;
    user.isActive = createUserDto.isActive;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(userName: string): Promise<User> {
    return this.usersRepository.findOneBy({ userName: userName });
  }

  async remove(userName: string): Promise<void> {
    await this.usersRepository.delete(userName);
  }
}
