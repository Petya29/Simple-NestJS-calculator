import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login (@Request() req) {
    return this.authService.login(req.user);
    //return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}