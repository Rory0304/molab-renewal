import { QueryCache, useMutation, useQueryClient } from '@tanstack/react-query';
import { inserBookmarkByIds } from 'src/api/bookmark';
import queryKeys from 'src/constants/queryKeys';
import { SupabaseClientType } from 'src/types/supabase';

const useInsertBookmarkMutation = (supabaseClient: SupabaseClientType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(inserBookmarkByIds(supabaseClient), {
    onMutate: async newBookMark => {
      await queryClient.cancelQueries([queryKeys.GET_BOOKMARK_ID_LIST]);

      const previousBookMark = queryClient.getQueryData([
        queryKeys.GET_BOOKMARK_ID_LIST,
      ]);

      queryClient.setQueriesData(
        [queryKeys.GET_BOOKMARK_ID_LIST],
        (prev: number[] | undefined) => {
          return [...(prev || []), newBookMark.noticeId];
        }
      );
      return { previousBookMark };
    },

    onError: (error, newBookMark, context) => {
      queryClient.setQueriesData(
        [queryKeys.GET_BOOKMARK_ID_LIST],
        context?.previousBookMark
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_BOOKMARK_ID_LIST],
      });
    },
  });

  return mutation;
};

export default useInsertBookmarkMutation;
