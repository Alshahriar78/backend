
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

import {
  UpdateGalleryDto,
} from './dto/update-gallery.dto.js';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository:
      Repository<Gallery>,
  ) {}

  // Create gallery item
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

  // Get all gallery items
  async findAll() {
    return await this.galleryRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // Get published gallery items
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

  // Get gallery items by category
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

  // Get single gallery item
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

  // Update gallery item
  async update(
    id: number,
    dto: UpdateGalleryDto,
  ) {
    const gallery = await this.findOne(id);

    if (dto.title !== undefined) {
      gallery.title = dto.title;
    }

    if (dto.imageUrl !== undefined) {
      gallery.imageUrl = dto.imageUrl;
    }

    if (dto.description !== undefined) {
      gallery.description = dto.description;
    }

    if (dto.category !== undefined) {
      gallery.category = dto.category;
    }

    if (dto.isPublished !== undefined) {
      gallery.isPublished =
        dto.isPublished;
    }

    return await this.galleryRepository.save(
      gallery,
    );
  }

  // Publish / Unpublish
  async togglePublish(id: number) {
    const gallery = await this.findOne(id);

    gallery.isPublished =
      !gallery.isPublished;

    return await this.galleryRepository.save(
      gallery,
    );
  }

  // Delete gallery item
  async remove(id: number) {
    const gallery = await this.findOne(id);

    await this.galleryRepository.remove(
      gallery,
    );

    return {
      message: 'Gallery item deleted successfully',
    };
  }
}

