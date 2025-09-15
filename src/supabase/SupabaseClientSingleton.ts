import { Database } from '@rory0304/molab-project-types';
import { createClient } from '@supabase/supabase-js';
import { SupabaseClientType } from 'src/types/supabase';

export class SupabaseClientSingleton {
  private static _client?: SupabaseClientType;

  static getClient(): SupabaseClientType {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      throw new Error(
        'Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY'
      );
    }

    if (!this._client) {
      this._client = createClient<Database>(url, anonKey);

      return this._client;
    }

    return this._client;
  }
}
