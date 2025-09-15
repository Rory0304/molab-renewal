import { SupabaseClient } from '@supabase/supabase-js';
import { ImageRepository } from 'src/repositories/image';
import { StorageType } from 'src/types/supabase';

export class ImageUseCase {
  private imageRepository: ImageRepository;

  constructor(client?: SupabaseClient) {
    this.imageRepository = new ImageRepository(client);
  }

  async uploadImage(from: StorageType, fileName: string, file: File) {
    return await this.imageRepository.uploadImage(from, fileName, file);
  }
}
