import { MolabApiClient } from 'src/repositories/api/molab/MolabApiClient';
import type { Row, StorageType, SupabaseClientType } from 'src/types/supabase';

export type ReviewType = Row<'Review'>;

export class ImageRepository extends MolabApiClient {
  constructor(client?: SupabaseClientType) {
    super({ client: client });
  }

  /**
   *
   */
  public async uploadImage(from: StorageType, fileName: string, file: File) {
    const { data, error } = await this.client.storage
      .from(from)
      .upload(`${fileName}.${file.type.split('/')[1]}`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error('fail to upload image');
    }

    // path_to_file_in_buckey
    return data.path;
  }
}
