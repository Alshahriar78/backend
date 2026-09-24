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
  Announcement,
} from './entities/announcement.entity.js';

import {
  CreateAnnouncementDto,
} from './dto/create-announcement.dto.js';

import {
  UpdateAnnouncementDto,
} from './dto/update-announcement.dto.js';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository:
      Repository<Announcement>,
  ) {}

  // Create announcement
  async create(
    dto: CreateAnnouncementDto,
  ) {
    const announcement =
      this.announcementRepository.create({
        title: dto.title,
        content: dto.content,
        imageUrl: dto.imageUrl,
        isPublished:
          dto.isPublished ?? true,
      });

    return await this.announcementRepository.save(
      announcement,
    );
  }

  // Get all announcements
  async findAll() {
    return await this.announcementRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // Get published announcements
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

  // Get single announcement
  async findOne(id: number) {
    const announcement =
      await this.announcementRepository.findOne({
        where: { id },
      });

    if (!announcement) {
      throw new NotFoundException(
        'Announcement not found',
      );
    }

    return announcement;
  }

  // Update announcement
  async update(
    id: number,
    dto: UpdateAnnouncementDto,
  ) {
    const announcement =
      await this.findOne(id);

    if (dto.title !== undefined) {
      announcement.title = dto.title;
    }

    if (dto.content !== undefined) {
      announcement.content = dto.content;
    }

    if (dto.imageUrl !== undefined) {
      announcement.imageUrl = dto.imageUrl;
    }

    if (dto.isPublished !== undefined) {
      announcement.isPublished =
        dto.isPublished;
    }

    return await this.announcementRepository.save(
      announcement,
    );
  }

  // Toggle publish / unpublish
  async togglePublish(id: number) {
    const announcement =
      await this.findOne(id);

    announcement.isPublished =
      !announcement.isPublished;

    return await this.announcementRepository.save(
      announcement,
    );
  }

  // Delete announcement
  async remove(id: number) {
    const announcement =
      await this.findOne(id);

    await this.announcementRepository.remove(
      announcement,
    );

    return {
      message:
        'Announcement deleted successfully',
    };
  }
}