import { SupabaseClient } from '@supabase/supabase-js';
import { NoticeRepository } from 'src/domain/repositories/notice';

export class NoticeUseCase {
  private noticeRepository: NoticeRepository;

  constructor(client?: SupabaseClient) {
    this.noticeRepository = new NoticeRepository(client);
  }

  async fetchAllNotice(props: {
    keyword: string;
    category: string;
    ascending: boolean;
    offset: number;
    pageCount: number;
  }) {
    return await this.noticeRepository.fetchAllNotice(props);
  }

  async fetchNoticeById(noticeId: string) {
    return await this.noticeRepository.fetchNoticeById(noticeId);
  }
}
