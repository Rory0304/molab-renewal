import { SupabaseClient } from '@supabase/supabase-js';
import { StorageType } from 'src/data/types/supabase';
import { ImageRepository } from 'src/domain/repositories/image';

export class ImageUseCase {
  private imageRepository: ImageRepository;

  constructor(client?: SupabaseClient) {
    this.imageRepository = new ImageRepository(client);
  }

  async uploadImage(from: StorageType, fileName: string, file: File) {
    return await this.imageRepository.uploadImage(from, fileName, file);
  }
}
