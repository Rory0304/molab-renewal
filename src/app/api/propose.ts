import { getServerSupabase } from "src/utils/supabase";
import type { ProjectFormValues } from "src/types/project";
import type { Row } from "src/types/supabase";

const supabase = getServerSupabase();

/**
 *
 */
export const createPropose = async (uuid: string, userId: string) => {
  const { data, error } = await supabase
    .from("Propose")
    .insert({ uuid: uuid, userId: userId });

  if (error) {
    throw new Error("fail to create propose");
  }

  return data;
};

/**
 *
 */
export const handleImageUpload = async (
  fileName: string,
  file?: File | null
) => {
  if (!file) return "";

  const { data, error } = await supabase.storage
    .from("propose_thumbnail")
    .upload(`public/${fileName}-thumbnail.${file.type.split("/")[1]}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error("fail to upload image");
  }

  // path_to_file_in_buckey
  return data.path;
};

/**
 *
 */
export const updatePropse = async (
  uuid: string,
  proposeData: ProjectFormValues
) => {
  const thumbnailFilePath = await handleImageUpload(
    uuid,
    proposeData.payload.thumbnail?.[0]
  );

  const { data, error } = await supabase
    .from("Propose")
    .update({
      ...proposeData["payload"],
      uuid: uuid,
      thumbnail: thumbnailFilePath,
    })
    .eq("uuid", uuid)
    .returns<Row<"Propose">>();

  if (error) {
    throw new Error("fail to update propose");
  }

  return data;
};

/**
 *
 */
export const fetchMyProposeList = async (
  userId: string,
  offset: number,
  pageCount: number
) => {
  const [total, proposeList] = await Promise.all([
    supabase
      .from("Propose")
      .select("*")
      // Filters
      .eq("userId", userId),
    supabase
      .from("Propose")
      .select("*")
      // Filters
      .eq("userId", userId)
      .range(offset, offset + pageCount),
  ]);

  const { data, error } = proposeList;
  const { count } = total;

  if (error) throw new Error("fail to fetch my propose list");

  return { data, count };
};

/**
 *
 */
export const fetchProposeById = async (projectId: string, userId: string) => {
  const { data, error } = await supabase
    .from("Propose")
    .select("*")
    // Filters
    .eq("userId", userId)
    .eq("uuid", projectId)
    .limit(1)
    .single<Row<"Propose">>();
  if (error) throw new Error("fail to fetch propose");
  return { data };
};
