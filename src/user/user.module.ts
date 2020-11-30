import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './models/schemas/users.schema'
import { AuthModule } from 'src/authorization/auth.module';
import { JwtStrategy } from 'src/authorization/services/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'userModel', schema: userSchema}]),
        AuthModule
    ],
    providers: [UserService, JwtStrategy],
    controllers: [UserController]
})
export class UserModule{}