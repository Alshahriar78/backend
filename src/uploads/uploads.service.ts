import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import path from 'path';

@Injectable()
export class UploadsService {
  private readonly supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  private readonly bucket =
    process.env.SUPABASE_STORAGE_BUCKET || 'tournament-images';

  async uploadImage(file: any) {
    if (!file) {
      throw new InternalServerErrorException('Image file is required');
    }

    const extension = path.extname(file.originalname);

    const fileName = `${Date.now()}-${randomUUID()}${extension}`;

    const { error } = await this.supabase.storage
      .from(this.bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw new InternalServerErrorException(
        `Image upload failed: ${error.message}`,
      );
    }

    const { data } = this.supabase.storage
      .from(this.bucket)
      .getPublicUrl(fileName);

    return {
      url: data.publicUrl,
      fileName,
    };
  }
}