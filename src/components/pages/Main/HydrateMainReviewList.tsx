import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import getQueryClient from 'src/utils/queryClient';
import { molabApi } from 'src/utils/supabase';

import MainReviewList from './MainReviewList';

const HydrateMainReviewList: React.FC = async () => {
  const supabaseClient = createClientComponentClient();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ['reviewList'],
    async () =>
      await molabApi.molabApiFetchReviewList(supabaseClient)({
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
