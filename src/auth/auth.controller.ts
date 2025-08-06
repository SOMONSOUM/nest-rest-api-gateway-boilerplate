import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'src/common/utils';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() input: LoginDto) {
    return Response.success({
      message: 'User logged in successfully',
      data: await this.authService.login(input),
    });
  }
}
