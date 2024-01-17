'use client';

import React from 'react';
import { useMedia } from 'react-use';

const NoticeBanner: React.FC = () => {
  const isTabletOrSmaller = useMedia('(max-width: 768px)');

  return (
    <div
      className="flex flex-col justify-center w-full h-64 bg-primary"
      style={{
        background: isTabletOrSmaller
          ? ''
          : "url('/find-position.png') 80% 100% / 150px 200px no-repeat #01a9db",
      }}
    >
      <div className="text-center content-layout w-full">
        <h3 className="pb-2 text-3xl font-bold text-white ">리빙랩 공고</h3>
        <p className="text-white">
          내가 살고 있는 지역에서 주최된 리빙랩 프로젝트를 알아보세요
        </p>
      </div>
    </div>
  );
};

export default NoticeBanner;
