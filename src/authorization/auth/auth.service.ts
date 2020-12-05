import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDTO } from '../usersdb/dto/users.dto';
import { userModel } from '../usersdb/interfaces/users.interface'
import { Model } from 'mongoose'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, 
      private jwtService: JwtService,
      @InjectModel('userModel') private readonly userModel : Model<userModel>) {}

    getMain(): string {
      return 'main';
    }

    getRegister(): string {
      return 'register'
    }
    
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneInDb(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
    }

      async login(usersDTO: UsersDTO) {
      const payload = { username: usersDTO.username };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }

    async addUser(usersDTO: UsersDTO): Promise<userModel> {
      const newUser = new this.userModel(usersDTO)
      return await newUser.save()
    }

    async getUsers(): Promise<userModel[]> {
      const users = await this.userModel.find().exec()
      return users
    }

}