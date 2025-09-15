import { Database } from '@rory0304/molab-project-types';
import { createClient } from '@supabase/supabase-js';
import { SupabaseClientType } from 'src/types/supabase';

export class SupabaseClientSingleton {
  private static _client?: SupabaseClientType;

  static getClient(): SupabaseClientType {
    if (!this._client) {
      this._client = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
      );

      return this._client;
    }

    return this._client;
  }
}
