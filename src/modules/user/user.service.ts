import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interface/user.interface';

@Injectable()
export class UserServices {
  async users(): Promise<IUser[]> {
    return [];
  }

  async getUser(id: string): Promise<IUser> {
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
