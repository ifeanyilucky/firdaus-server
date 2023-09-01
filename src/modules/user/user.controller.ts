import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('/users')
export class UserController {
  // userService: UserServices
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.users({});
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser({ id });
  }

  @Post()
  async createUser(@Body() userData: User): Promise<User> {
    return this.userService.createUser({ data: userData });
  }

  @Patch(':id')
  async updateUser(@Body() userData: User, @Param('id') id: string) {
    return this.userService.updateUser({ where: { id }, data: userData });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ where: { id } });
  }
}
