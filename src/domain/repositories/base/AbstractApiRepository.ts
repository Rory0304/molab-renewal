import { SupabaseClientType } from 'src/data/types/supabase';

export abstract class AbstractApiRepository<T extends SupabaseClientType> {
  protected client: T;

  constructor(client: T) {
    this.client = client;
  }
}
