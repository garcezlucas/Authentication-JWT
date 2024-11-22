import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ type: String, description: 'The token' })
  access_token: string;

  @ApiProperty({ type: String, description: 'The refresh token' })
  refresh_token: string;
}
