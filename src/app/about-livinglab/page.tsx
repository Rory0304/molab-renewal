import React from "react";

import {
  WhatIsLivingLabSection,
  LivingLabExampleSection,
  FutureOfLivingLabBanner,
} from "src/components/pages/AboutLivingLab";

const AboutLivingLabPage: React.FC = () => {
  return (
    <div className="w-full">
      <WhatIsLivingLabSection />
      <LivingLabExampleSection />
      <FutureOfLivingLabBanner />
    </div>
  );
};

export default AboutLivingLabPage;
