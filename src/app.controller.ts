import { Controller, Get, Render, Res, UseGuards, Request, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')  // Dynamic template rendering
  root(@Res() res: Response){
    return res.render(
      this.appService.getCalculator(),
    )
  }

}
