import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { NoticeUseCase } from 'src/useCases/notice';
import getQueryClient from 'src/utils/queryClient';

import MainNoticeList from './MainNoticeList';

const HydrateMainReviewList: React.FC = async () => {
  const supabaeClient = createClientComponentClient();
  const noticeUsecase = new NoticeUseCase(supabaeClient);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ['noticeList'],
    async () =>
      await noticeUsecase
        .fetchAllNotice({
          keyword: '',
          category: '',
          ascending: false,
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
