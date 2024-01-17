'use client';

import React from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from 'src/components/blocks/Carousel/Carousel';
import type { ProjectContent } from 'src/types/project';
import { molabApi } from 'src/utils/supabase';

interface MainCommunicationCardProps
  extends Pick<ProjectContent, 'title' | 'siDo' | 'siGunGu'> {
  thumbnail: string;
  link: string;
}

const MainCommunicationCard: React.FC<MainCommunicationCardProps> = ({
  link,
  thumbnail,
  title,
  siDo,
  siGunGu,
}) => {
  return (
    <Link href={link} className="w-full">
      <div className="flex items-center w-full pt-4">
        <div className="relative pt-[30%] w-[30%] mr-4 rounded-md overflow-hidden">
          <Image
            fill
            src={thumbnail}
            alt={`${title} 열린 참여 썸네일`}
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="flex flex-col w-[70%]">
          <span className="px-2 text-sm border rounded-md w-fit border-primary text-primary">
            {siDo} {siGunGu}
          </span>
          <strong className="pt-2 text-base font-semibold">{title}</strong>
        </div>
      </div>
    </Link>
  );
};

const MainCommunicationList: React.FC = () => {
  const supabaseClient = createClientComponentClient();

  const { data: communicationList } = useQuery({
    queryKey: ['communicationList'],
    queryFn: async () =>
      await molabApi.molabApiFetchProposeList(supabaseClient)({
        offset: 0,
        pageCount: 3,
        siDo: '',
        siGunGu: '',
      }),
  });

  return (
    <div className="overflow-hidden bg-white border-gray-500 shadow-lg rounded-xl p-8">
      <div className="flex flex-col">
        <span className="pb-1 text-sm text-neutral-500">열린 참여</span>
        <strong className="text-lg">
          <span className="border-b-[3px] border-primary mr-1">시민 주도</span>
          리빙랩 프로젝트 참여하기
        </strong>
      </div>
      <Carousel paginationVariant="slider">
        {communicationList?.map(item => (
          <li className="w-full cursor-pointer carousel-item" key={item.uuid}>
            <MainCommunicationCard
              link={`/communication/${item.uuid}`}
              title={item.title || ''}
              thumbnail={
                `${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/propose_thumbnail/${item.thumbnail}` ??
                ''
              }
              siDo={item.siDo ?? ''}
              siGunGu={item.siGunGu ?? ''}
            />
          </li>
        ))}
      </Carousel>
    </div>
  );
};

export default MainCommunicationList;
