import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookmarkById } from 'src/api/bookmark';
import queryKeys from 'src/data/constants/queryKeys';
import { SupabaseClientType } from 'src/data/types/supabase';

import { useOptimisticMutation } from './query';

const useDeleteBookMarkMutation = (supabaseClient: SupabaseClientType) => {
  const mutation = useOptimisticMutation({
    mutationFn: deleteBookmarkById(supabaseClient),
    queryKey: [queryKeys.GET_BOOKMARK_ID_LIST],
    updater: (prevData: number[], newBookMark) => {
      return prevData?.filter(id => id !== newBookMark.noticeId);
    },
    invalidates: [queryKeys.GET_BOOKMARK_ID_LIST],
  });

  return mutation;
};

export default useDeleteBookMarkMutation;
