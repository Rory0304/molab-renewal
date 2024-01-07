import { Camelized, camelizeKeys } from 'humps';
import type { Row, SupabaseClientType } from 'src/types/supabase';

export type BookmarkType = Camelized<Omit<Row<'Bookmark'>, 'created_at'>>;

interface BookmarkApiParams {
  noticeId: number;
  userId?: string;
}

/**
 * Insert bookmark by noticeId and userId
 * @param userId
 * @param noticeId
 */
export const inserBookmarkByIds =
  (supabase: SupabaseClientType) =>
  async ({ userId, noticeId }: BookmarkApiParams) => {
    const { data, error } = await supabase.from('Bookmark').insert({
      notice_id: noticeId,
      user_id: userId,
    });

    if (error) throw Error('fail to insert bookmark by id');

    return camelizeKeys(data);
  };

/**
 * Delete bookmark by bookmarkId
 * @param userId
 * @param noticeId
 */
export const deleteBookmarkById =
  (supabase: SupabaseClientType) =>
  async ({ userId, noticeId }: BookmarkApiParams) => {
    const { data, error } = await supabase
      .from('Bookmark')
      .delete()
      .match({ user_id: userId, notice_id: noticeId });

    if (error) throw Error('fail to delete bookmark by id');

    return camelizeKeys(data);
  };

/**
 * Get Bookmark by userId and noticeId
 * @param userId
 * @param noticeId
 */
export const getBookmarkByNoticeIds =
  (supabase: SupabaseClientType) =>
  async ({ userId, noticeIds }: { noticeIds: number[]; userId?: string }) => {
    const { data, error } = await supabase
      .from('Bookmark')
      .select('*')
      .eq('user_id', userId)
      .in('notice_id', noticeIds);

    if (error) {
      throw Error('fail to get bookmark by noticeIds');
    }

    return data;
  };

/**
 * Get Bookmark id list by userId
 * @param userId
 */
export const getBookmarkIdListByuserId =
  (supabase: SupabaseClientType) => async (userId?: string) => {
    const { data, error } = await supabase
      .from('Bookmark')
      .select('notice_id')
      .eq('user_id', userId);

    if (error) {
      throw Error('fail to get bookmark ids by userId');
    }

    return data.map(value => value.notice_id);
  };
