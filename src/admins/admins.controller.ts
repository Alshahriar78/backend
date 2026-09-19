import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AdminsService } from './admins.service.js';

import { CreateAdminDto } from './dto/create-admin.dto.js';

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('admins')
export class AdminsController {
  constructor(
    private readonly adminsService: AdminsService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateAdminDto,
  ) {
    return this.adminsService.create(
      dto.username,
      dto.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: any) {
    return req.user;
  }
}