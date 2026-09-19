import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './entities/admin.entity.js';
import { AdminsService } from './admins.service.js';
import { AdminsController } from './admins.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin,]),
    forwardRef(()=>AuthModule)
  ],

  providers: [
    AdminsService,
  
  ],
  controllers:[AdminsController],
  exports: [
    AdminsService,
  ],
})
export class AdminsModule {}