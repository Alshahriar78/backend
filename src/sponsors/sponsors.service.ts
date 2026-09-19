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
  Sponsor,
} from './entities/sponsor.entity.js';

import {
  CreateSponsorDto,
} from './dto/create-sponsor.dto.js';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private readonly sponsorRepository:
      Repository<Sponsor>,
  ) {}

  async create(dto: CreateSponsorDto) {
    const sponsor =
      this.sponsorRepository.create({
        name: dto.name,
        logoUrl: dto.logoUrl,
        websiteUrl: dto.websiteUrl,
        sponsorshipType:
          dto.sponsorshipType,
        isActive:
          dto.isActive ?? true,
        displayOrder:
          dto.displayOrder ?? 0,
      });

    return await this.sponsorRepository.save(
      sponsor,
    );
  }

  async findAll() {
    return await this.sponsorRepository.find({
      order: {
        displayOrder: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findActive() {
    return await this.sponsorRepository.find({
      where: {
        isActive: true,
      },
      order: {
        displayOrder: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findByType(
    sponsorshipType: string,
  ) {
    return await this.sponsorRepository.find({
      where: {
        sponsorshipType,
        isActive: true,
      },
      order: {
        displayOrder: 'ASC',
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const sponsor =
      await this.sponsorRepository.findOne({
        where: {
          id,
        },
      });

    if (!sponsor) {
      throw new NotFoundException(
        'Sponsor not found',
      );
    }

    return sponsor;
  }
}