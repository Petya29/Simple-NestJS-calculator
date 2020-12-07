import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { UsersDTO } from '../usersdb/dto/users.dto';
import { userModel } from '../usersdb/interfaces/users.interface';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

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

    async addUser(usersDTO: UsersDTO): Promise<userModel | String> {
      const newUser = new this.userModel(usersDTO)
      const temp = await this.usersService.findOneInDb(usersDTO.username)
      const dirName = newUser.username
      
      if(temp != null){
        return 'username incorrect'
      }else{
        fs.mkdir(path.join(__dirname, `../../../../src/authorization/users/data/${dirName}`), (err) => {
          if(err){
            return console.error(err)
          }
          console.log('mkdir!')
        })
        fs.appendFile(`src/authorization/users/data/${dirName}/${dirName}Results.json`, '', (err) => {
          if(err){
            return console.error(err)
          }
          return console.log('appendFile!')
        })
        return await newUser.save()
      }

    }

    async getUsers(): Promise<userModel[]> {
      const users = await this.userModel.find().exec()
      return users
    }

    async removeUser(username): Promise<any> {
      const temp = await this.usersService.findOneInDb(username)

      if(temp != null){
        const dirName = temp.username
          fs.unlink(`src/authorization/users/data/${dirName}/${dirName}Results.json`, (err) => {
          if(err){
            return console.error(err)
          }
          return console.log('unlink file!')
        })
        fs.rmdir(path.join(__dirname, `../../../../src/authorization/users/data/${dirName}`), (err) => {
          if(err){
            return console.error(err)
          }
          console.log('rmdir!')
        })
      }else{
        throw new NotFoundException('User does nor exist !');
      }

      const deletedUser = await this.userModel.findOneAndRemove({username: username})
      return deletedUser
    }

}