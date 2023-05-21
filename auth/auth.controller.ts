import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly localService: LocalStrategy) {}
  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login (@Body() b) {
    console.log(b)
    return this.authService.login(b.username,b.password);
  }
}
