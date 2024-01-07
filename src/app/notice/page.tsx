import React from 'react';

import { NoticeBanner, NoticeSearchArea } from 'src/components/pages/Notice';
import NoticePageProvider from 'src/context/NoticePageProvider';

const NoticePage: React.FC = () => {
  return (
    <div className="w-full">
      <NoticeBanner />
      <NoticePageProvider>
        <NoticeSearchArea />
      </NoticePageProvider>
    </div>
  );
};

export default NoticePage;
