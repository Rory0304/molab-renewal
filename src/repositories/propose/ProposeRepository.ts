import { camelizeKeys, decamelizeKeys } from 'humps';
import { MolabApiClient } from 'src/repositories/api/molab/MolabApiClient';
import type { ProjectFormValues } from 'src/types/project';
import type { Proposetype } from 'src/types/project';
import type { Row, SupabaseClientType } from 'src/types/supabase';

export class ProposeRepository extends MolabApiClient {
  constructor(client?: SupabaseClientType) {
    super({ client: client });
  }

  /**
   * 프로젝트 생성
   */
  public async createPropose(uuid: string, userId: string) {
    const { data, error } = await this.client
      .from('Propose')
      .insert({ uuid: uuid, user_id: userId })
      .select();

    if (error) {
      throw new Error('fail to create propose');
    }

    return camelizeKeys(data);
  }

  /**
   * 이미지 업로드
   */
  public async uploadProposeImage(fileName: string, file?: File | null) {
    if (!file) return '';

    const { data, error } = await this.client.storage
      .from('propose_thumbnail')
      .upload(`public/${fileName}-thumbnail.${file.type.split('/')[1]}`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new Error('fail to upload image');
    }

    // path_to_file_in_buckey
    return data.path;
  }

  /**
   * 프로젝트 수정
   */
  public async updatePropose(uuid: string, proposeData: ProjectFormValues) {
    const thumbnailFilePath = await this.uploadProposeImage(
      uuid,
      proposeData.payload.thumbnail?.[0]
    );

    const configuredProposeData = decamelizeKeys({
      ...proposeData['payload'],
      uuid: uuid,
      thumbnail: thumbnailFilePath,
    });

    const { data, error } = await this.client
      .from('Propose')
      .update(configuredProposeData)
      .eq('uuid', uuid)
      .returns<Row<'Propose'>>();

    if (error) {
      throw new Error('fail to update propose');
    }

    return camelizeKeys(data);
  }

  /**
   * 프로젝트 리스트
   */
  public async paginateMyProposeList(_: {
    userId: string;
    offset: number;
    pageCount: number;
  }) {
    const { userId, offset, pageCount } = _;

    const [total, proposeList] = await Promise.all([
      this.client
        .from('Propose')
        .select('*', { count: 'exact', head: true })
        // Filters
        .eq('user_id', userId),
      this.client
        .from('Propose')
        .select('*')
        // Filters
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .range(offset, offset + pageCount - 1),
    ]);

    const { data, error } = proposeList;
    const { count } = total;

    if (error) throw new Error('fail to fetch my propose list');

    return { data: camelizeKeys(data) as Proposetype[], count };
  }

  /**
   * 프로젝트 삭제
   */
  public async deleteProposeById(projectId: string) {
    const { data, error } = await this.client
      .from('Propose')
      .delete()
      .eq('uuid', projectId);

    if (error) {
      throw new Error('fail to delete propose');
    }

    return camelizeKeys(data);
  }

  /**
   * 프로젝트 id 를 기반으로 프로젝트를 가져오기
   */
  public async fetchProposeById(projectId: string) {
    const { data, error } = await this.client
      .from('Propose')
      .select('*')
      // Filters
      .eq('uuid', projectId)
      .limit(1)
      .single<Row<'Propose'>>();
    if (error) {
      throw new Error('fail to fetch propose');
    }
    return { data: camelizeKeys(data) as Proposetype };
  }

  /**
   * 지역에 따른 프로젝트 리스트
   */
  public async paginateProposeList(_: {
    offset: number;
    pageCount: number;
    siDo?: string;
    siGunGu?: string;
  }) {
    const { offset, pageCount, siDo, siGunGu } = _;

    let fetchList = this.client.from('Propose').select('*').eq('is_open', true);

    if (siDo) {
      fetchList = fetchList.eq('si_do', siDo);
    }
    if (siGunGu) {
      fetchList = fetchList.eq('si_gun_gu', siGunGu);
    }

    const proposeList = await fetchList
      // Pagination
      .range(offset, offset + pageCount - 1);

    const { data, error } = proposeList;

    if (error) throw new Error('fail to fetch my propose list');

    return camelizeKeys(data) as Proposetype[];
  }
}
