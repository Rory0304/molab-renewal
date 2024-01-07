import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookmarkById } from 'src/api/bookmark';
import queryKeys from 'src/constants/queryKeys';
import { SupabaseClientType } from 'src/types/supabase';

const useDeleteBookMarkMutation = (supabaseClient: SupabaseClientType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deleteBookmarkById(supabaseClient), {
    onMutate: async newBookMark => {
      await queryClient.cancelQueries([queryKeys.GET_BOOKMARK_ID_LIST]);

      const previousBookMark = queryClient.getQueryData([
        queryKeys.GET_BOOKMARK_ID_LIST,
      ]);

      queryClient.setQueriesData(
        [queryKeys.GET_BOOKMARK_ID_LIST],
        (prev: number[] | undefined) =>
          prev?.filter(id => id !== newBookMark.noticeId)
      );

      return { previousBookMark };
    },

    onError: (_error, _newBookMark, context) => {
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

export default useDeleteBookMarkMutation;
