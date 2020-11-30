import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { userModel } from 'src/user/models/interfaces/users.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( private readonly authService: AuthService) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: 'secretKey',
      });
    }
  
    async validate(payload: userModel): Promise<any> {
      return { username: payload.username };
      //return this.userService.findByUsername(payload.username)
    }
  }