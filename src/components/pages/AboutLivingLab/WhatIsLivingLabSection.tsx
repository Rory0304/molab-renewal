'use client';

import React from 'react';
import LottiePlayer from 'react-lottie-player';

import lottieJson from '../../../../public/business-team.json';

const WhatIsLivingLabSection: React.FC = () => {
  return (
    <section className="flex flex-row items-center w-full bg-primary  h-[calc(100vh-var(--sticky-header-height))] mb-32 p-20">
      <div className="flex flex-col justify-center h-full mr-5 basis-4/5">
        <h2 className="mb-12 text-6xl font-bold text-white">
          What is Living Lab?
        </h2>
        <p className="mb-3 text-2xl font-semibold underline underline-offset-4">
          "살아 있는 실험실"에 대하여 알아봅시다.
        </p>
        <p className="text-lg font-medium whitespace-pre-wrap">
          {
            '리빙랩은 사용자의 관점에서 삶에 실질적인 도움이 되는 연구를 말합니다.\n다시 말해, 시민의 의견을 수용한 서비스 구현 방법론이 리빙랩이죠.\n도시문제를 해결하기 위해서는 도시의 실 사용자인 시민이 주체가 되어\n시민이 체감할 수 있는 서비스를 발굴함으로써,\n시민들의 행복과 삶의 질을 향상하는 방향으로 초점을 맞춰야 합니다.'
          }
        </p>
      </div>
      <div className="mb-24 basis-4/5">
        <LottiePlayer loop play animationData={lottieJson} />
      </div>
    </section>
  );
};

export default WhatIsLivingLabSection;
