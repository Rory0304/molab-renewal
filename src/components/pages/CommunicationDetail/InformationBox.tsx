'use client';

import React from 'react';

import Image from 'next/image';
import ProjectStatusBadge from 'src/components/pages/Communication/ProjectStatusBadge';
import { Proposetype } from 'src/types';
import { getProjectStatus } from 'src/utils/project';

interface InformationBoxProps
  extends Pick<
    Proposetype,
    'title' | 'thumbnail' | 'siDo' | 'siGunGu' | 'startDate' | 'endDate'
  > {}

const InformationBox: React.FC<InformationBoxProps> = ({
  title,
  thumbnail,
  siDo,
  siGunGu,
  startDate,
  endDate,
}) => {
  const projectStatus = getProjectStatus(new Date(endDate as string));

  return (
    <section className="flex flex-col">
      <div className="flex flex-col pb-8">
        <h3 className="order-2 mt-6 text-3xl font-bold text-neutral-600">
          {title}
        </h3>
        <div className="flex items-center flex-wrap order-1 gap-y-2 gap-x-3">
          <span className="px-2 py-1 font-semibold rounded-md text-md text-primary bg-zinc-800">
            {siDo} {siGunGu}
          </span>
          {!!endDate && !!startDate ? (
            <>
              <ProjectStatusBadge
                endDate={new Date(endDate)}
                status={projectStatus}
              />
              <span className="text-gray-400">
                {`${startDate} ~ ${endDate}`}
              </span>
            </>
          ) : null}
        </div>
      </div>
      <div className="relative w-full pt-[40%] rounded-md overflow-hidden">
        {thumbnail ? (
          <Image
            fill
            priority
            quality={70}
            alt={`${title} 썸네일`}
            src={thumbnail}
            style={{ objectFit: 'cover' }}
          />
        ) : null}
      </div>
    </section>
  );
};

export default InformationBox;
