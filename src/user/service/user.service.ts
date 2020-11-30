import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/authorization/services/auth.service';
import { UserDTO } from '../models/dto/users.dto';
import { userModel } from '../models/interfaces/users.interface';

@Injectable()
export class UserService {
    constructor( @InjectModel('userModel') private readonly user: Model<userModel>,
        private authService: AuthService, ){}

    async createUser(userDTO: UserDTO): Promise<userModel>{
        const newUser = new this.user(userDTO)
        return await newUser.save()
    }

    async findAll(): Promise<userModel[]> {
        const users = await this.user.find().exec()
        return users
    }

    async findById(id): Promise<userModel> {
        const user = await this.user.findById(id).exec()
        return user
    }

    async login(userDTO: UserDTO) {
        const user = await this.validateUser(userDTO.username, userDTO.password)
        return this.authService.login(user)
    }

    async validateUser(username: String, pass: String): Promise<any> {
        const user = await this.findByUsername(username)
        if(user && user.password === pass){
            const { password, ...result } = user
            return result
        }else{
            return null
        }
    }

    async findByUsername(username: String): Promise<userModel | undefined> {
        return this.user.findOne({username: username}).exec()
    }

}