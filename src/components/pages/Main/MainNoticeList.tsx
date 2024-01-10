'use client';

import React from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { NoticeCategory } from 'src/types/notice';
import type { NoticeType } from 'src/types/notice';
import { molabApi } from 'src/utils/supabase';

interface NoticeCardProps extends NoticeType {}

//
// If larger than `md`, then show `vertical` card, else show `horizontal`
//
const NoticeCard: React.FC<NoticeCardProps> = ({
  id,
  thumbnail,
  title,
  category,
  content,
}) => {
  return (
    <Link href={`/notice/${id}`}>
      <div className="flex flex-col items-center overflow-hidden bg-white shadow-md cursor-pointer hover:shadow-xl md:flex-row rounded-xl transition ease-in-out">
        <div className="relative pt-[50%] md:pt-[30%] w-full md:w-[30%]">
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
        <div className="flex flex-col py-6 pl-6 pr-8 w-full md:w-[70%]">
          <span className="pb-1 marker:text-sm text-neutral-500">
            {NoticeCategory[(category as keyof typeof NoticeCategory) ?? 'Etc']}
          </span>
          <strong className="pb-2 text-lg">{title}</strong>
          <p className=" text-neutral-600 line-clamp-3">{content}</p>
        </div>
      </div>
    </Link>
  );
};

const MainNoticeList: React.FC = () => {
  const supabaseClient = createClientComponentClient();

  const { data: noticeList } = useQuery({
    queryKey: ['noticeList'],
    queryFn: async () =>
      await molabApi
        .molabApiFetchAllNotice(supabaseClient)({
          keyword: '',
          category: '',
          ascending: false,
          offset: 0,
          pageCount: 4,
        })
        .then(res => res.data),
  });

  return (
    <div className="flex flex-col gap-8 pb-8">
      {noticeList?.map((notice, index) => (
        <NoticeCard key={index} {...notice} />
      ))}
    </div>
  );
};

export default MainNoticeList;
