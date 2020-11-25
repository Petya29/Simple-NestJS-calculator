import { Injectable } from '@nestjs/common';
import { User } from '../users/user';

//export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [ {
            userId: 1,
            username: 'Petya',
            password: 'qwertyPetya'
        }, 
        {
            userId: 2,
            username: 'Dima',
            password: 'qwertyDima'
        },
        {
            userId: 3,
            username: 'Tanya',
            password: 'qwertyTanya'
        },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

}
