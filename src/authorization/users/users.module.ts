import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchema } from '../usersdb/schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'userModel', schema: usersSchema}])], // zaimportit authmodule
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
