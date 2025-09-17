'use client';

import React from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useAuth } from 'src/context/AuthProvider';
import { useModals } from 'src/context/ModalProvider';
import { NoticeStatus } from 'src/data/types/notice';
import { NoticeCategory } from 'src/data/types/notice';
import { NoticeType } from 'src/data/types/notice';
import useDeleteBookmarkMutation from 'src/hooks/useDeleteBookmarkMutation';
import useInsertBookmarkMutation from 'src/hooks/useInsertBookmarkMutation';
import { getNoticeStatus } from 'src/utils/notice';

import BookmarkButton from '../BookmarkButton/BookmarkButton';
import NoticeStatusBadge from './NoticeStatusBadge';

export interface NoticeCardProps extends NoticeType {
  isBookmarked: boolean;
}

const NoticeCard: React.FC<NoticeCardProps> = ({
  id,
  title,
  category,
  thumbnail,
  endDate,
  area,
  isBookmarked,
}) => {
  const { userInfo } = useAuth();
  const { onModalOpen } = useModals();

  const supabaseClient = createClientComponentClient();

  const noticeStatus = getNoticeStatus(new Date(endDate as string));

  const insertBookmarkMutation = useInsertBookmarkMutation(supabaseClient);
  const deleteBoookmarkMutation = useDeleteBookmarkMutation(supabaseClient);

  const handleToggleBookmark = (noticeId: number) => {
    if (!userInfo?.id) {
      onModalOpen('loginRequire');
      return;
    }

    if (isBookmarked) {
      deleteBoookmarkMutation.mutate({
        userId: userInfo?.id,
        noticeId,
      });
    } else {
      insertBookmarkMutation.mutate({
        userId: userInfo?.id,
        noticeId,
      });
    }
  };

  return (
    <div
      className={`h-full relative flex flex-col items-center overflow-hidden bg-white border border-gray-300 border-solid cursor-pointer rounded-xl ${
        noticeStatus === NoticeStatus.ENDED
          ? 'after:overlay after:rounded-[0.75rem]'
          : ''
      }`}
    >
      <div className="relative w-full pt-[81%]">
        <div className="absolute right-0 z-10 flex justify-between w-full px-4 flex-items top-4">
          <NoticeStatusBadge
            endDate={new Date(endDate)}
            noticeStatus={noticeStatus}
          />
          <BookmarkButton
            onToggleBookmark={e => {
              e.preventDefault();
              handleToggleBookmark(id);
            }}
            isBookmarked={isBookmarked}
          />
        </div>
        {thumbnail ? (
          <Image
            fill
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/notice_thumbnail${thumbnail}`}
            alt={`${title} 공고 썸네일`}
            style={{ objectFit: 'cover' }}
          />
        ) : null}
      </div>
      <div className="flex flex-col w-full px-5 py-6">
        <span className="text-sm not-italic color text-neutral-500">
          {NoticeCategory[(category as keyof typeof NoticeCategory) ?? 'Etc']} |{' '}
          {area}
        </span>
        <strong className="pt-1 text-lg line-clamp-2">{title}</strong>
      </div>
    </div>
  );
};

export default React.memo(NoticeCard);
