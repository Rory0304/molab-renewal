import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import getQueryClient from 'src/utils/queryClient';
import { molabApi } from 'src/utils/supabase';

import MainNoticeList from './MainNoticeList';

const HydrateMainReviewList: React.FC = async () => {
  const supabaeClient = createClientComponentClient();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ['noticeList'],
    async () =>
      await molabApi
        .molabApiFetchAllNotice(supabaeClient)({
          keyword: '',
          category: '',
          ascending: true,
          offset: 0,
          pageCount: 4,
        })
        .then(res => res.data)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MainNoticeList />
    </Hydrate>
  );
};

export default HydrateMainReviewList;
