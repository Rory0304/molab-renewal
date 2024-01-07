'use client';

import React from 'react';

import Image from 'next/image';
import { NoticeCategory } from 'src/types/notice';
import { NoticeType } from 'src/types/notice';

export interface NoticeCardProps extends NoticeType {}

const NoticeCard: React.FC<NoticeCardProps> = ({
  title,
  category,
  content,
  thumbnail,
}) => {
  return (
    <div className="flex items-center overflow-hidden bg-white shadow-lg cursor-pointer rounded-xl">
      <div className="relative pt-[30%] w-[30%]">
        {thumbnail ? (
          <Image
            fill
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/notice_thumbnail${thumbnail}`}
            alt={`${title} 공고 썸네일`}
            style={{
              objectFit: 'cover',
            }}
          />
        ) : null}
      </div>
      <div className="flex flex-col p-6 w-[70%]">
        <em className="text-sm not-italic color text-neutral-500">
          {NoticeCategory[(category as keyof typeof NoticeCategory) ?? 'Etc']}
        </em>
        <strong className="pt-1 text-lg">{title}</strong>
        <p className="pt-1 text-neutral-600 line-clamp-3">{content}</p>
      </div>
    </div>
  );
};

export default NoticeCard;
