import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';
import { SignInDto } from './dto/signIn.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'Successful login', type: TokenDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out the user' })
  @ApiResponse({ status: 200, description: 'Successful logout' })
  logout() {
    return { message: 'Logout successful' };
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Update the access token with a refresh token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Token updated successfully',
    type: TokenDto,
  })
  @ApiResponse({ status: 404, description: 'Invalid or expired refresh token' })
  refreshToken(@Body() body: { refresh_token: string }) {
    return this.authService.refreshToken(body.refresh_token);
  }
}
