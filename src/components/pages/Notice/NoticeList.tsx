'use client';

import React from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getBookmarkIdListByuserId } from 'src/api/bookmark';
import VerticalNoticeCard from 'src/components/blocks/NoticeCard/VerticalNoticeCard';
import queryKeys from 'src/constants/queryKeys';
import { useAuth } from 'src/context/AuthProvider';
import { NoticeType } from 'src/types/notice';

interface NoticeListProps {
  noticeList: NoticeType[];
}

const NoticeList: React.FC<NoticeListProps> = ({ noticeList }) => {
  const { userInfo } = useAuth();

  const supabaseClient = createClientComponentClient();

  const { data: bookmarkListData } = useQuery(
    [queryKeys.GET_BOOKMARK_ID_LIST, userInfo],
    () => getBookmarkIdListByuserId(supabaseClient)(userInfo?.id),
    {
      enabled: Boolean(userInfo),
    }
  );

  return noticeList.map((card, index) => (
    <li key={index}>
      <Link href={`/notice/${card.id}`}>
        <VerticalNoticeCard
          {...card}
          isBookmarked={Boolean(bookmarkListData?.includes(card.id))}
        />
      </Link>
    </li>
  ));
};

export default NoticeList;
