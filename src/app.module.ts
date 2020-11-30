import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CalculatorModule } from './calculator/calculator.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-calc', { useNewUrlParser: true }),
    MongooseModule.forRoot('mongodb://localhost/nest-users', { useNewUrlParser: true }),
    CalculatorModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
