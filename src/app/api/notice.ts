import { getServerSupabase } from "src/utils/supabase";

import type { Row } from "src/types/supabase";

const supabase = getServerSupabase();

/**
 *
 */
export const fetchAllNotice = async ({
  keyword,
  category,
  ascending,
  offset,
  pageCount,
}: {
  keyword: string;
  category: string;
  ascending: boolean;
  offset: number;
  pageCount: number;
}) => {
  const { data, error } = await supabase
    .from("Notice")
    .select("*")
    // Filters
    .like("title", `%${keyword}%`)
    .like("category", `%${category}%`)
    .order("startDate", { ascending: ascending })
    .range(offset - 1, offset + pageCount);

  if (error) {
    throw new Error("fail to fetch all notices");
  }

  return { data };
};

/**
 *
 */
export const fetchNoticeById = async (noticeId: string) => {
  const { data, error } = await supabase
    .from("Notice")
    .select("*")
    //Filters
    .eq("id", noticeId)
    .limit(1)
    .single<Row<"Notice">>();

  if (error) {
    throw new Error("fail to fetch notice");
  }

  return { data };
};
