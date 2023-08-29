import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserServices } from './user.service';
import { IUser } from 'src/interface/user.interface';

@Controller('/users')
export class UserController {
  // userService: UserServices
  constructor(private userService: UserServices) {}

  @Get()
  getAll(): Promise<IUser[]> {
    return this.userService.users();
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<IUser> {
    return this.userService.getUser(id);
  }

  @Post()
  createUser(@Body() userData: IUser): Promise<IUser> {
    return this.userService.createUser(userData);
  }

  @Delete()
  deleteUser(@Param('id') id: string): Promise<IUser> {
    return this.userService.deleteUser(id);
  }
}
