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
  Gallery,
} from './entities/gallery.entity.js';

import {
  CreateGalleryDto,
} from './dto/create-gallery.dto.js';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository:
      Repository<Gallery>,
  ) {}

  async create(dto: CreateGalleryDto) {
    const gallery =
      this.galleryRepository.create({
        title: dto.title,
        imageUrl: dto.imageUrl,
        description: dto.description,
        category: dto.category,
        isPublished:
          dto.isPublished ?? true,
      });

    return await this.galleryRepository.save(
      gallery,
    );
  }

  async findAll() {
    return await this.galleryRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findPublished() {
    return await this.galleryRepository.find({
      where: {
        isPublished: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByCategory(
    category: string,
  ) {
    return await this.galleryRepository.find({
      where: {
        category,
        isPublished: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const gallery =
      await this.galleryRepository.findOne({
        where: {
          id,
        },
      });

    if (!gallery) {
      throw new NotFoundException(
        'Gallery item not found',
      );
    }

    return gallery;
  }
}