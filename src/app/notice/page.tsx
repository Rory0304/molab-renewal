import React from 'react';

import { NoticeBanner, NoticeSearchArea } from 'src/components/pages/Notice';

const NoticePage = () => {
  return (
    <div className="w-full">
      <NoticeBanner />
      <NoticeSearchArea />
    </div>
  );
};

export default NoticePage;
