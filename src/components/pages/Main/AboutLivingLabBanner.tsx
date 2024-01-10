import React from 'react';

import Link from 'next/link';

const AboutLivingLabBanner: React.FC = () => {
  return (
    <div className="w-auto rounded-xl mb-8">
      <Link href="/main">
        <div className="bg-banner bg-[length:130px_130px] bg-no-repeat bg-right-bottom bg-[#172945] overflow-hidden block pb-[180px] lg:pb-[56.72%] rounded-xl h-0">
          <div className="px-8 py-8">
            <strong className="pt-2 text-lg text-white">
              {'살아있는 실험실,\n"리빙랩"을 알아보세요'}
            </strong>
            <p className="text-slate-400">#시민 #도시문제해결</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AboutLivingLabBanner;
