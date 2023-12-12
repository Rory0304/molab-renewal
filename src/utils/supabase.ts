import { createClient } from "@supabase/supabase-js";
import { Database } from "@rory0304/molab-renewal-types";
import {fetchAllNotice, fetchNoticeById} from 'src/app/api/notice';
import {fetchReviewById,fetchReviewList, uploadReview} from 'src/app/api/review';
import {fetchMyProposeList, fetchProposeList, fetchProposeById, updatePropse, deleteProposeById, createPropose} from 'src/app/api/propose';
import {handleImageUpload} from 'src/app/api/image';
import { SupabaseClientType } from "src/types/supabase";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export const getServerSupabase = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY ?? ""
  );


export const molabApi = ({
  molabApiFetchAllNotice: (supabase: SupabaseClientType) => fetchAllNotice(supabase),
  molabApiFetchNoticeById: (supabase: SupabaseClientType) => fetchNoticeById(supabase),
  molabApiFetchReviewById: (supabase: SupabaseClientType) => fetchReviewById(supabase),
  molabApiFetchReviewList: (supabase: SupabaseClientType) => fetchReviewList(supabase),
  molabApiUploadReview: (supabase: SupabaseClientType) => uploadReview(supabase),
  molabApiFetchMyProposeList: (supabase: SupabaseClientType) => fetchMyProposeList(supabase),
  molabApiFetchProposeList: (supabase: SupabaseClientType) => fetchProposeList(supabase),
  molabApiUpdatePropse: (supabase: SupabaseClientType) => updatePropse(supabase),
  molabApiFetchProposeById: (supabase: SupabaseClientType) => fetchProposeById(supabase),
  molabApiHandleImageUpload:(supabase: SupabaseClientType) =>  handleImageUpload(supabase),
  molabApiDeleteProposeById:(supabase: SupabaseClientType) => deleteProposeById(supabase),
  molabApiCreatePropose: (supabase: SupabaseClientType) => createPropose(supabase)
})

