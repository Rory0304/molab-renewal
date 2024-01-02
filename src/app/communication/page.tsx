import React from 'react';

import {
  CommunicationBanner,
  CommunicationSearchArea,
} from 'src/components/pages';

const CommunicationPage = () => {
  return (
    <div className="w-full">
      <CommunicationBanner />
      <CommunicationSearchArea />
    </div>
  );
};

export default CommunicationPage;
