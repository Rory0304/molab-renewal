import { camelizeKeys, decamelizeKeys } from 'humps';
import type { ProjectFormValues } from 'src/types/project';
import type { Proposetype } from 'src/types/project';
import type { Row, SupabaseClientType } from 'src/types/supabase';

/**
 *
 */
export const createPropose =
  (supabase: SupabaseClientType) => async (uuid: string, userId: string) => {
    const { data, error } = await supabase
      .from('Propose')
      .insert({ uuid: uuid, user_id: userId })
      .select();

    if (error) {
      throw new Error('fail to create propose');
    }

    return camelizeKeys(data);
  };

/**
 *
 */
export const handleImageUpload =
  (supabase: SupabaseClientType) =>
  async (fileName: string, file?: File | null) => {
    if (!file) return '';

    const { data, error } = await supabase.storage
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
  };

/**
 *
 */
export const updatePropse =
  (supabase: SupabaseClientType) =>
  async (uuid: string, proposeData: ProjectFormValues) => {
    const thumbnailFilePath = await handleImageUpload(supabase)(
      uuid,
      proposeData.payload.thumbnail?.[0]
    );

    const configuredProposeData = decamelizeKeys({
      ...proposeData['payload'],
      uuid: uuid,
      thumbnail: thumbnailFilePath,
    });

    const { data, error } = await supabase
      .from('Propose')
      .update(configuredProposeData)
      .eq('uuid', uuid)
      .returns<Row<'Propose'>>();

    if (error) {
      throw new Error('fail to update propose');
    }

    return camelizeKeys(data);
  };

/**
 *
 */
export const fetchMyProposeList =
  (supabase: SupabaseClientType) =>
  async (userId: string, offset: number, pageCount: number) => {
    const [total, proposeList] = await Promise.all([
      supabase
        .from('Propose')
        .select('*', { count: 'exact', head: true })
        // Filters
        .eq('user_id', userId),
      supabase
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
  };

/**
 *
 */
export const deleteProposeById =
  (supabase: SupabaseClientType) => async (projectId: string) => {
    console.log(projectId);

    const { data, error } = await supabase
      .from('Propose')
      .delete()
      .eq('uuid', projectId);

    if (error) {
      throw new Error('fail to delete propose');
    }

    return camelizeKeys(data);
  };

/**
 *
 */
export const fetchProposeById =
  (supabase: SupabaseClientType) => async (projectId: string) => {
    const { data, error } = await supabase
      .from('Propose')
      .select('*')
      // Filters
      .eq('uuid', projectId)
      .limit(1)
      .single<Row<'Propose'>>();
    if (error) {
      console.log('error', error);
      throw new Error('fail to fetch propose');
    }
    return { data: camelizeKeys(data) as Proposetype };
  };

/**
 * Fetch Propose List by area option
 */
export const fetchProposeList =
  (supabase: SupabaseClientType) =>
  async ({
    offset,
    pageCount,
    siDo,
    siGunGu,
  }: {
    offset: number;
    pageCount: number;
    siDo?: string;
    siGunGu?: string;
  }) => {
    let fetchList = supabase.from('Propose').select('*').eq('is_open', true);

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
  };
