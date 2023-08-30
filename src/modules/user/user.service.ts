import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interface/user.interface';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserServices {
  constructor(private prisma: PrismaService) {}
  async users(params: {
    skip?: number;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    where?: Prisma.UserWhereInput;
  }): Promise<User[]> {
    const { skip, orderBy, where } = params;
    return this.prisma.user.findMany({
      skip,
      orderBy,
      where,
    });
  }

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    return {
      firstName: 'Ifeanyi',
      lastName: 'Lucky',
      class: 'JSS1',
    };
  }

  async updateUser(): Promise<IUser> {
    return {
      firstName: 'Ifeanyi',
      lastName: 'Lucky',
      class: 'JSS1',
    };
  }

  async deleteUser(id: string): Promise<IUser> {
    return {
      firstName: 'Ifeanyi',
      lastName: 'Lucky',
      class: 'JSS1',
    };
  }

  async createUser(data): Promise<IUser> {
    return {
      firstName: 'Ifeanyi',
      lastName: 'Lucky',
      class: 'JSS1',
    };
  }
}
