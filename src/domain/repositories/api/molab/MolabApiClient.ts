import { SupabaseClientType } from 'src/data/types/supabase';
import { SupabaseClientSingleton } from 'src/supabase/SupabaseClientSingleton';

export abstract class MolabApiClient {
  protected readonly client: SupabaseClientType;

  constructor(_: { client?: SupabaseClientType }) {
    const { client } = _;

    // 서버사이드, 클라이언트 사이드의 supabase client 가 없다면 static singleton 사용
    this.client = client ?? SupabaseClientSingleton.getClient();
  }
}
