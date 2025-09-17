import { decamelizeKeys } from 'humps';
import type { Row, SupabaseClientType } from 'src/data/types/supabase';
import { MolabApiClient } from 'src/domain/repositories/api/molab/MolabApiClient';
import { ImageUseCase } from 'src/domain/useCases/image';

export type ReviewType = Row<'Review'>;

export class ReviewRepository extends MolabApiClient {
  constructor(client?: SupabaseClientType) {
    super({ client: client });
  }
  /**
   *
   */
  public async fetchReviewById({ uuid }: { uuid: string }) {
    const { data, error } = await this.client
      .from('Review')
      .select('*')
      .eq('uuid', uuid)
      .limit(1)
      .single<Row<'Review'>>();

    if (error) throw Error('fail to fetch review');

    return data;
  }

  /**
   *
   */
  public async fetchReviewList(props: {
    select: string;
    offset: number;
    pageCount: number;
    projectId?: string;
  }) {
    const { select, offset, pageCount, projectId } = props;

    let query = this.client
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
  }

  /**
   * Upload Review
   */
  public async uploadReview(props: {
    projectId: string;
    uuid: string;
    content: string;
    userId: string;
    imageFile?: File;
  }) {
    const { projectId, uuid, content, userId, imageFile } = props;
    const imageUsecase = new ImageUseCase(this.client);

    // upload image
    const thumbnailFilePath = imageFile
      ? await imageUsecase.uploadImage(
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

    const { data, error } = await this.client
      .from('Review')
      .insert(configuredData)
      .returns<Row<'Review'>>();

    if (error) {
      throw new Error('fail to upload reivew');
    }

    return data;
  }
}
