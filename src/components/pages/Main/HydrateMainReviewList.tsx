import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { ReviewUseCase } from 'src/useCases/review';
import getQueryClient from 'src/utils/queryClient';

import MainReviewList from './MainReviewList';

const HydrateMainReviewList: React.FC = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const reviewUseCase = new ReviewUseCase(supabase);

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
