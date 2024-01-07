import { Database } from '@rory0304/molab-renewal-types';
import { createClient } from '@supabase/supabase-js';
import { handleImageUpload } from 'src/api/image';
import { fetchAllNotice, fetchNoticeById } from 'src/api/notice';
import { fetchReviewById, fetchReviewList, uploadReview } from 'src/api/review';
import {
  createPropose,
  deleteProposeById,
  fetchMyProposeList,
  fetchProposeById,
  fetchProposeList,
  updatePropse,
} from 'src/app/api/propose';
import { SupabaseClientType } from 'src/types/supabase';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export const getServerSupabase = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY ?? ''
  );

export const molabApi = {
  molabApiFetchAllNotice: (supabase: SupabaseClientType) =>
    fetchAllNotice(supabase),
  molabApiFetchNoticeById: (supabase: SupabaseClientType) =>
    fetchNoticeById(supabase),
  molabApiFetchReviewById: (supabase: SupabaseClientType) =>
    fetchReviewById(supabase),
  molabApiFetchReviewList: (supabase: SupabaseClientType) =>
    fetchReviewList(supabase),
  molabApiUploadReview: (supabase: SupabaseClientType) =>
    uploadReview(supabase),
  molabApiFetchMyProposeList: (supabase: SupabaseClientType) =>
    fetchMyProposeList(supabase),
  molabApiFetchProposeList: (supabase: SupabaseClientType) =>
    fetchProposeList(supabase),
  molabApiUpdatePropse: (supabase: SupabaseClientType) =>
    updatePropse(supabase),
  molabApiFetchProposeById: (supabase: SupabaseClientType) =>
    fetchProposeById(supabase),
  molabApiHandleImageUpload: (supabase: SupabaseClientType) =>
    handleImageUpload(supabase),
  molabApiDeleteProposeById: (supabase: SupabaseClientType) =>
    deleteProposeById(supabase),
  molabApiCreatePropose: (supabase: SupabaseClientType) =>
    createPropose(supabase),
};
