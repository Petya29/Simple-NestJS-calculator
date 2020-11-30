import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './services/jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: 'secretKey',
            signOptions: { expiresIn: '100s' }
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
