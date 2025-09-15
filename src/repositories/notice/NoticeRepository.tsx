import { camelizeKeys, decamelizeKeys } from 'humps';
import { MolabApiClient } from 'src/repositories/api/molab/MolabApiClient';
import { NoticeType } from 'src/types/notice';
import type { Row, SupabaseClientType } from 'src/types/supabase';

export class NoticeRepository extends MolabApiClient {
  constructor(client?: SupabaseClientType) {
    super({ client: client });
  }
  /**
   *
   */
  public async fetchAllNotice(_: {
    keyword: string;
    category: string;
    ascending: boolean;
    offset: number;
    pageCount: number;
  }) {
    const { keyword, category, ascending, offset, pageCount } = _;
    const { data, error } = await this.client
      .from('Notice')
      .select('*')
      // Filters
      .like('area', `%${keyword}%`)
      .like('category', `%${category}%`)
      .order('startDate', { ascending: ascending })
      .order('endDate', { ascending: ascending })
      .range(offset, offset + pageCount - 1);

    if (error) {
      throw new Error('fail to fetch all notices');
    }

    return { data: camelizeKeys(data) as NoticeType[] };
  }

  /**
   *
   */
  public async fetchNoticeById(noticeId: string) {
    const { data, error } = await this.client
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
  }
}
