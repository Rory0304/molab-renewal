import { inserBookmarkByIds } from 'src/api/bookmark';
import queryKeys from 'src/data/constants/queryKeys';
import { SupabaseClientType } from 'src/data/types/supabase';

import { useOptimisticMutation } from './query';

const useInsertBookmarkMutation = (supabaseClient: SupabaseClientType) => {
  const mutation = useOptimisticMutation({
    mutationFn: inserBookmarkByIds(supabaseClient),
    queryKey: [queryKeys.GET_BOOKMARK_ID_LIST],
    updater: (prevData: number[], newBookMark) => {
      return [...(prevData || []), newBookMark.noticeId];
    },
    invalidates: [queryKeys.GET_BOOKMARK_ID_LIST],
  });

  return mutation;
};

export default useInsertBookmarkMutation;
