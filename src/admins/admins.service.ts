import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

import {
  Admin,
} from './entities/admin.entity.js';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository:
      Repository<Admin>,
  ) {}

  async create(
    username: string,
    password: string,
  ) {
    // Check existing username
    const existingAdmin =
      await this.adminRepository.findOne({
        where: {
          username,
        },
      });

    if (existingAdmin) {
      throw new ConflictException(
        'Username already exists',
      );
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin =
      this.adminRepository.create({
        username,
        password: hashedPassword,
        isActive: true,
      });

    const savedAdmin =
  await this.adminRepository.save(admin);

const { password: _, ...result } =
  savedAdmin;

return result;
  }

  async findByUsername(
    username: string,
  ) {
    return await this.adminRepository.findOne({
      where: {
        username,
      },
    });
  }

  async findOne(id: number) {
    return await this.adminRepository.findOne({
      where: {
        id,
      },
    });
  }
}