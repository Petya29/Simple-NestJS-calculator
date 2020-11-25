import { Controller, Get, Render, Res, UseGuards, Request, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { AuthService } from '../src/authorization/auth/auth.service';
import { JwtAuthGuard } from './authorization/auth/jwt-auth-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  @Render('index')  // Dynamic template rendering
  root(@Res() res: Response){
    return res.render(
      this.appService.getCalculator(),
    )
  }

  //@UseGuards(LocalAuthGuard) Dont have local guards!!!
  @Post('auth/login')
  async login (@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
