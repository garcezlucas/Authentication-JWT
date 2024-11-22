import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: "User's first name" })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: "User's last name" })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Username', minLength: 3, maxLength: 20 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  userName: string;

  @ApiProperty({ description: "User's password", minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'password must be at least 6 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;

  @ApiProperty({ description: "User's account status" })
  @IsBoolean()
  isActive: boolean;
}
