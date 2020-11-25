import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [ {
            userId: 1,
            username: 'Petya',
            password: 'qwerty'
        }, 
        {
            userId: 2,
            username: 'Dima',
            password: 'qwertlol'
        },
        {
            userId: 3,
            username: 'Tanya',
            password: 'qwertytoo'
        },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

}
