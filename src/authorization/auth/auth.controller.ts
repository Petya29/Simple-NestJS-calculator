import { Controller, Get, Post, UseGuards, Request, Render, Res, Body, HttpStatus, Query, Redirect, HttpCode, Header } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { query, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { UsersDTO } from '../usersdb/dto/users.dto';

@ApiTags('authorization')
@Controller()
export class AuthController {
    constructor( private authService: AuthService ) {}

  @Get('register')
  @Render('register')
  root(@Res() res: Response){
    return res.render(
      this.authService.getRegister()
    )
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async addUser(@Res() res: Response, @Body() usersDTO: UsersDTO){
    await this.authService.addUser(usersDTO)
    //return res.json(newUser)
    res.redirect('/calculator')
  }

  @Get('users')
  async getUsers(@Res() res){
    const users = await this.authService.getUsers()
    return res.status(HttpStatus.OK).json(users)
  }

  @UseGuards(AuthGuard('local'))
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async login (@Request() req, @Body() query: UsersDTO, @Res() res) {
    const token = await this.authService.login(query)
    return res.json(token)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}