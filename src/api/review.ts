import { decamelizeKeys } from 'humps';
import type { Row, SupabaseClientType } from 'src/types/supabase';

import { handleImageUpload } from './image';

export type ReviewType = Row<'Review'>;

/**
 *
 */
export const fetchReviewById =
  (supabase: SupabaseClientType) =>
  async ({ uuid }: { uuid: string }) => {
    const { data, error } = await supabase
      .from('Review')
      .select('*')
      .eq('uuid', uuid)
      .limit(1)
      .single<Row<'Review'>>();

    if (error) throw Error('fail to fetch review');

    return data;
  };

/**
 *
 */
export const fetchReviewList =
  (supabase: SupabaseClientType) =>
  async ({
    offset,
    pageCount,
    select,
    projectId,
  }: {
    select: string;
    offset: number;
    pageCount: number;
    projectId?: string;
  }) => {
    let query = supabase
      .from('Review')
      .select(select)
      // Filters
      .range(offset, offset + pageCount);

    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data, error } = await query;

    if (error) {
      throw Error('fail to fetch review list');
    }
    return data as Partial<ReviewType>[];
  };

/**
 * Upload Review
 */
export const uploadReview =
  (supabase: SupabaseClientType) =>
  async ({
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
      ? await handleImageUpload(supabase)(
          'review_thumbnail',
          `${uuid}-thumbnail`,
          imageFile
        )
      : '';

    const configuredData = decamelizeKeys({
      projectId,
      content,
      userId,
      uuid: uuid,
      thumbnail: thumbnailFilePath,
    }) as ReviewType;

    const { data, error } = await supabase
      .from('Review')
      .insert(configuredData)
      .returns<Row<'Review'>>();

    if (error) {
      throw new Error('fail to upload reivew');
    }

    return data;
  };
