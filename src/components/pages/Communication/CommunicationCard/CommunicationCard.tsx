'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { getProjectStatus } from 'src/utils/project';

import ProjectStatusBadge from '../ProjectStatusBadge';

interface CommunicationCardProps {
  link: string;
  title: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  siDo: string;
  siGunGu: string;
}

const CommunicationCard: React.FC<CommunicationCardProps> = ({
  link,
  title,
  thumbnail,
  siDo,
  siGunGu,
  startDate,
  endDate,
}) => {
  const [isThumbnailExist, setIsThumbnailExist] = React.useState(true);
  const projectStatus = getProjectStatus(new Date(endDate as string));

  return (
    <Link href={link}>
      <div className="overflow-hidden bg-white rounded-xl">
        <div className="relative pt-[70%] rounded-xl overflow-hidden bg-slate-200 border border-gray-200">
          <div className="absolute z-10 top-0 left-0 p-3 flex flex-row items-center justify-between w-full">
            <span className="px-2 py-1 font-semibold rounded-md text-md text-primary bg-zinc-800">
              {siDo} {siGunGu}
            </span>
            <ProjectStatusBadge
              endDate={new Date(endDate)}
              status={projectStatus}
            />
          </div>
          {isThumbnailExist ? (
            <Image
              fill
              src={thumbnail}
              alt={title}
              sizes={'397px'}
              onError={() => setIsThumbnailExist(false)}
              style={{
                objectFit: 'cover',
              }}
            />
          ) : (
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-slate-200">
              <span className="text-neutral-500">대표 이미지 등록 필요</span>
            </div>
          )}
        </div>
        <div className="flex flex-col py-4 h-[calc(100% - 225px)]">
          <h3 className="mb-2 text-lg font-bold">{title}</h3>
          <p className="text-sm text-neutral-600">{`${new Date(
            startDate
          ).toLocaleDateString()} ~ ${new Date(
            endDate
          ).toLocaleDateString()}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default CommunicationCard;
