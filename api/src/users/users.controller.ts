import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get a single user by email' })
  @ApiParam({
    name: 'email',
    type: String,
    description: 'email of the user to fetch',
  })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('email') email: string): Promise<Partial<User>> {
    return this.usersService.findOne(email);
  }

  @Delete(':email')
  @ApiOperation({ summary: 'Delete a user by email' })
  @ApiParam({
    name: 'email',
    type: String,
    description: 'email of the user to delete',
  })
  @ApiResponse({ status: 200, description: 'User successfully deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('email') email: string): Promise<void> {
    return this.usersService.remove(email);
  }

  @Public()
  @Patch('update-password')
  @ApiOperation({ summary: 'Update a user password' })
  @ApiBody({
    description: 'Object containing the user email and the new password',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        newPassword: { type: 'string', example: 'NewSecurePassword123!' },
      },
      required: ['email', 'newPassword'],
    },
  })
  @ApiResponse({ status: 204, description: 'Password successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updatePassword(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<void> {
    await this.usersService.updatePassword(email, password);
  }
}
