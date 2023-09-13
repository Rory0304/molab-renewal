import { getServerSupabase } from "src/utils/supabase";
import type { StorageType } from "src/types/supabase";

const supabase = getServerSupabase();

/**
 *
 */
export const handleImageUpload = async (
  from: StorageType,
  fileName: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from(from)
    .upload(`public/${fileName}.${file.type.split("/")[1]}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error("fail to upload image");
  }

  // path_to_file_in_buckey
  return data.path;
};
