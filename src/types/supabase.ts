import { Database } from '@rory0304/molab-renewal-types';
import { SupabaseClient } from '@supabase/supabase-js';

export type Row<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type StorageType =
  | 'review_thumbnail'
  | 'propose_thumbnail'
  | 'project_image';

export type SupabaseClientType = SupabaseClient<Database>;
