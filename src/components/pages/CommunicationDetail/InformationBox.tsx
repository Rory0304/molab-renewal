'use client';

import React from 'react';

import Image from 'next/image';
import { ProjectStatus, Proposetype } from 'src/types';
import { calculateDaysLeft } from 'src/utils/date';
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

  const renderProjectStatusBadge = (status: ProjectStatus, endDate: Date) => {
    switch (status) {
      case ProjectStatus.D_DAY:
        return 'D-DAY';
      case ProjectStatus.ENDED:
        return '종료됨';
      case ProjectStatus.ONGOING:
        const daysLeft = calculateDaysLeft(endDate);
        return `${daysLeft}일 남음`;
      default:
        return null;
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex flex-col pb-8">
        <h3 className="order-2 mt-6 text-3xl font-bold text-neutral-600">
          {title}
        </h3>
        <div className="flex flex-wrap order-1 gap-y-2">
          <span className="px-2 mr-3 font-semibold rounded-md text-md text-primary bg-zinc-800">
            {siDo} {siGunGu}
          </span>
          {!!endDate && !!startDate ? (
            <>
              <span className="px-2 mr-3 font-semibold bg-gray-200 rounded-md text-m">
                {renderProjectStatusBadge(projectStatus, new Date(endDate))}
              </span>
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
