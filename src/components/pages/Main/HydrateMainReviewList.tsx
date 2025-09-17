import { Hydrate, dehydrate } from '@tanstack/react-query';
import { ReviewUseCase } from 'src/domain/useCases/review';
import getQueryClient from 'src/utils/queryClient';

import MainReviewList from './MainReviewList';

const HydrateMainReviewList: React.FC = async () => {
  const reviewUseCase = new ReviewUseCase();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ['reviewList'],
    async () =>
      await reviewUseCase.fetchReviewList({
        select: `thumbnail, content, uuid`,
        offset: 0,
        pageCount: 3,
      })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MainReviewList />
    </Hydrate>
  );
};

export default HydrateMainReviewList;
