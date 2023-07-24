import React from "react";
import {
  CommunicationDetailInformationBox,
  CommunicationDetailHowToParticipationBox,
  CommunicationDetailProjectStepsBox,
  CommunicationDetailSpeachBox,
} from "src/components/pages";

const CommunicationDetailPage: React.FC = async () => {
  const preview = false;

  return (
    <div className="flex justify-between">
      <div>
        <CommunicationDetailInformationBox />
        <CommunicationDetailHowToParticipationBox />
        <CommunicationDetailProjectStepsBox />
      </div>
      <div>
        <CommunicationDetailSpeachBox />
      </div>
    </div>
  );
};

export default CommunicationDetailPage;
