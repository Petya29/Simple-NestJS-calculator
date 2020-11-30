import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userModel } from 'src/user/models/interfaces/users.interface';

@Injectable()
export class AuthService {
    constructor( private readonly jwtService: JwtService ){}

    async login(user: userModel){
        const payload = { username: user.username }
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
    
}