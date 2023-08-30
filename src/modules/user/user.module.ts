import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  imports: [PrismaService],
  exports: [UserService],
  providers: [UserService, PrismaService],
})
export class UserModule {}
