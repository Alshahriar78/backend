import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  Repository,
} from 'typeorm';

import {
  Announcement,
} from './entities/announcement.entity.js';

import {
  CreateAnnouncementDto,
} from './dto/create-announcement.dto.js';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository:
      Repository<Announcement>,
  ) {}

  async create(
    dto: CreateAnnouncementDto,
  ) {
    const announcement =
      this.announcementRepository.create({
        title: dto.title,
        content: dto.content,
        isPublished:
          dto.isPublished ?? true,
      });

    return await this.announcementRepository.save(
      announcement,
    );
  }

  async findAll() {
    return await this.announcementRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findPublished() {
    return await this.announcementRepository.find({
      where: {
        isPublished: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}