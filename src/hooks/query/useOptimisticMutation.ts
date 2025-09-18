import {
  type MutationFunction,
  type QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

type OptimisticProps<TData = unknown, TVariables = void, TQueryFnData = any> = {
  queryKey: QueryKey;
  invalidates: QueryKey;
  mutationFn: MutationFunction<TData, TVariables>;
  updater: (
    prevData: TQueryFnData | undefined,
    variables: TVariables
  ) => TQueryFnData | undefined;
};

export const useOptimisticMutation = <
  TData = unknown,
  TVariables = void,
  TQueryFnData = any,
>({
  queryKey,
  invalidates,
  mutationFn,
  updater,
}: OptimisticProps<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async variables => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (prevData: TQueryFnData | undefined) =>
        updater(prevData, variables)
      );

      return () => {
        queryClient.setQueryData(queryKey, previousData);
      };
    },
    onError: (err, variables, context) => {
      context?.();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: invalidates,
      });
    },
  });
};
