import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards, Request } from '@nestjs/common';
import { UserDTO } from '../models/dto/users.dto';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/authorization/services/jwt-auth-guard';

@Controller('users')
export class UserController {
    constructor( private userService: UserService ){}

    @Post()
    async createUser(@Res() res, @Body() userDTO: UserDTO) {
        const newUser = await this.userService.createUser(userDTO)
        return res.status(HttpStatus.OK).json(newUser)
    }

    @Post('login')
    async login(@Res() res, @Body() userDTO: UserDTO) {
        const user = await this.userService.login(userDTO)
        return res.status(HttpStatus.OK).json(user)
    }

    @Get(':id')
    async findById(@Param() params, @Res() res) {
        const user = await this.userService.findById(params.id)
        return res.status(HttpStatus.OK).json(user)
    }

    @Get('find/:username')
    async findByUsername(@Param() params, @Res() res) {
        const user = await this.userService.findByUsername(params.username)
        return res.status(HttpStatus.OK).json(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get()
    async findAll(@Res() res) {
        const users = await this.userService.findAll()
        return res.status(HttpStatus.OK).json(users)
    }

}