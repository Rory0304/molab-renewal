import React from 'react';

const NoticeBanner: React.FC = () => {
  return (
    <div
      className="flex flex-col justify-center w-full h-64"
      style={{
        background:
          "url('/find-position.png') 80% 100% / 150px 200px no-repeat #01a9db",
      }}
    >
      <div className="text-center">
        <h3 className="pb-2 text-3xl font-bold text-white ">리빙랩 공고</h3>
        <p className="text-white">
          내가 살고 있는 지역의 리빙랩 프로젝트를 알아보세요
        </p>
      </div>
    </div>
  );
};

export default NoticeBanner;
