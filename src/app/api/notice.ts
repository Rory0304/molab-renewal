import { camelizeKeys } from 'humps';
import type { NoticeType } from 'src/types/notice';
import type { Row, SupabaseClientType } from 'src/types/supabase';

/**
 *
 */
export const fetchAllNotice =
  (supabase: SupabaseClientType) =>
  async ({
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
      .from('Notice')
      .select('*')
      // Filters
      .like('area', `%${keyword}%`)
      .like('category', `%${category}%`)
      .order('created_at', { ascending: ascending })
      .range(offset, offset + pageCount - 1);

    if (error) {
      throw new Error('fail to fetch all notices');
    }

    return { data: camelizeKeys(data) as NoticeType[] };
  };

/**
 *
 */
export const fetchNoticeById =
  (supabase: SupabaseClientType) => async (noticeId: string) => {
    const { data, error } = await supabase
      .from('Notice')
      .select('*')
      //Filters
      .eq('id', noticeId)
      .limit(1)
      .single<Row<'Notice'>>();

    if (error) {
      throw new Error('fail to fetch notice');
    }

    return { data: camelizeKeys(data) as NoticeType };
  };
