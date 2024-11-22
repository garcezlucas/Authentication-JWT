import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ type: String, description: 'The userName' })
  userName: string;

  @ApiProperty({ type: String, description: 'The password' })
  password: string;
}
