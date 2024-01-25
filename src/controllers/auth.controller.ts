import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import {
  RefreshToken,
  SignIn,
  SignInResponse,
  SignUp,
  SignUpResponse,
} from '../validation/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: SignIn })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully login',
    type: SignInResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('login')
  signIn(@Body() signInDto: SignIn) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: SignUp })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
    type: SignUpResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('signup')
  signUp(@Body() signUpDto: SignUp) {
    return this.authService.signUp(
      signUpDto.fio,
      signUpDto.password,
      signUpDto.login,
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh Access Token' })
  @ApiBody({ type: RefreshToken })
  @ApiResponse({
    status: 201,
    description: 'The token has been successfully update',
    type: SignInResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshToken) {
    return this.authService.refreshToken(
      refreshTokenDto.login,
      refreshTokenDto.accessToken,
    );
  }
}
