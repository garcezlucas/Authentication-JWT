import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ type: String, description: 'The refresh token' })
  refresh_token: string;
}
