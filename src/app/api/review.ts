import { getServerSupabase } from "src/utils/supabase";
import { handleImageUpload } from "./image";

import type { Row } from "src/types/supabase";

const supabase = getServerSupabase();

export type ReviewType = Row<"Review">;

/**
 *
 */
export const fetchReviewById = async ({ uuid }: { uuid: string }) => {
  const { data, error } = await supabase
    .from("Review")
    .select("*")
    .eq("uuid", uuid)
    .limit(1)
    .single<Row<"Review">>();

  if (error) throw Error("fail to fetch review");

  return data;
};

/**
 *
 */
export const fetchReviewList = async ({
  projectId,
  offset,
  pageCount,
}: {
  projectId: string;
  offset: number;
  pageCount: number;
}) => {
  const { data, error } = await supabase
    .from("Review")
    .select(`thumbnail, uuid`)
    // Filters
    .eq("projectId", projectId)
    .range(offset, offset + pageCount);

  if (error) {
    throw Error("fail to fetch review list");
  }
  return data;
};

/**
 * Upload Review
 */
export const uploadReview = async ({
  projectId,
  uuid,
  userId,
  content,
  imageFile,
}: {
  projectId: string;
  uuid: string;
  content: string;
  userId: string;
  imageFile?: File;
}) => {
  // upload image
  const thumbnailFilePath = imageFile
    ? await handleImageUpload(
        "review_thumbnail",
        `${uuid}-thumbnail`,
        imageFile
      )
    : "";

  const { data, error } = await supabase
    .from("Review")
    .insert({
      projectId,
      content,
      userId,
      uuid: uuid,
      thumbnail: thumbnailFilePath,
    })
    .returns<Row<"Review">>();

  if (error) {
    throw new Error("fail to upload reivew");
  }

  return data;
};
