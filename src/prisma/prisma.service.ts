import {
  OnModuleDestroy,
  OnModuleInit,
  Injectable,
  INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserListener } from 'src/modules/user/user.listener';

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({});
  }

  async onModuleInit() {
    await this.$connect();
    // this.$use(UserListener.onCreated);
  }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async (event) => {
  //     console.log(event);
  //     await app.close();
  //   });
  // }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
