import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServices } from './user.service';

@Module({
  controllers: [UserController],
  imports: [],
  exports: [UserServices],
  providers: [UserServices],
})
export class UserModule {}
