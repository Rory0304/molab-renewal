import { getServerSupabase } from "src/utils/supabase";

const supabase = getServerSupabase();

/**
 *
 */
export const handleImageUpload = async (
  from: string,
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
