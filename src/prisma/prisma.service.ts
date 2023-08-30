import {
  OnModuleDestroy,
  OnModuleInit,
  INextApplication,
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
    this.$use(UserListener.onCreated);
  }

  async enableShutdownHooks(app: INextApplication) {
    this.$on('beforeExit', async (event) => {
      console.log(event.name);
      await app.close();
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
