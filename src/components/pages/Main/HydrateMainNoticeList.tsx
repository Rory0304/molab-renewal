import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { NoticeUseCase } from 'src/useCases/notice';
import getQueryClient from 'src/utils/queryClient';

import MainNoticeList from './MainNoticeList';

const HydrateMainReviewList: React.FC = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const noticeUsecase = new NoticeUseCase(supabase);

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
