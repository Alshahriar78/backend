import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import {
  Banner,
} from './entities/banner.entity.js';

import {
  CreateBannerDto,
} from './dto/create-banner.dto.js';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private readonly bannerRepository:
      Repository<Banner>,
  ) {}

  async create(dto: CreateBannerDto) {
    const banner =
      this.bannerRepository.create({
        title: dto.title,
        description: dto.description,
        imageUrl: dto.imageUrl,
        buttonText: dto.buttonText,
        buttonLink: dto.buttonLink,
        isActive:
          dto.isActive ?? true,
        displayOrder:
          dto.displayOrder ?? 0,
      });

    return await this.bannerRepository.save(
      banner,
    );
  }

  async findAll() {
    return await this.bannerRepository.find({
      order: {
        displayOrder: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findActive() {
    return await this.bannerRepository.find({
      where: {
        isActive: true,
      },
      order: {
        displayOrder: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const banner =
      await this.bannerRepository.findOne({
        where: {
          id,
        },
      });

    if (!banner) {
      throw new NotFoundException(
        'Banner not found',
      );
    }

    return banner;
  }
}