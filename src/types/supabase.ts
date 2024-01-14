import { Database } from '@rory0304/molab-renewal-types';
import { SupabaseClient } from '@supabase/supabase-js';

/**
 *
 */
export type Row<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

/**
 * Supabase Storage type
 */
export type StorageType =
  | 'review_thumbnail'
  | 'propose_thumbnail'
  | 'project_image';

/**
 *
 */
export type SupabaseClientType = SupabaseClient<Database>;

/**
 * Ref: https://github.com/supabase/gotrue/issues/915
 * As supabase dose not define sepecific error code to AuthApiError,
 * need to make this map manually
 */
export type AuthErrorCodeType =
  | 'SameWithPrevPassword'
  | 'AuthSessionMissingError'
  | 'EmailRateExceed'
  | 'EmailRequestOverload';
