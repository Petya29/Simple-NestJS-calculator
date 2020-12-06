import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userModel } from '../usersdb/interfaces/users.interface'
import { Model } from 'mongoose'
import { User } from '../users/user'
import { UsersDTO } from '../usersdb/dto/users.dto';

@Injectable()
export class UsersService {
    private readonly users: UsersDTO[];

    constructor(@InjectModel('userModel') private readonly userModel : Model<userModel>) {
            this.users = [ 
                {
                    username: 'Petya',
                    password: 'qwertyPetya'
                }, 
                {
                    username: 'Dima',
                    password: 'qwertyDima'
                },
                {
                    username: 'Tanya',
                    password: 'qwertyTanya'
                },
                ];
        }

    async findOne(username: String): Promise<any> {
        return this.userModel.find(user => user.username === username);
    }

    async findOneInDb(username: String): Promise<any> {
        return this.userModel.findOne({username: username})
    }

}
