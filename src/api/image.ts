import type { StorageType, SupabaseClientType } from 'src/types/supabase';

/**
 *
 */
export const handleImageUpload =
  (supabase: SupabaseClientType) =>
  async (from: StorageType, fileName: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(from)
      .upload(`public/${fileName}.${file.type.split('/')[1]}`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error('fail to upload image');
    }

    // path_to_file_in_buckey
    return data.path;
  };
