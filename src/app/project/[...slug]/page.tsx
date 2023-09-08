import React from "react";
import {
  ProposeProjectDetailEditor,
  ProposeProjectInformationEditor,
  ProposeProjectParticipationEditor,
  ProposeProjectToc,
  ProjectEidtorHeader,
  ProposeUnsaveModal,
} from "src/components/pages";

import { ProduceStepType } from "src/types/common";

const ProposeDetailPage = ({ params }: { params: { slug: string[] } }) => {
  const currentStep = params.slug?.[1];

  const renderProposeFormSection = (type: ProduceStepType) => {
    switch (type) {
      case "base":
        return <ProposeProjectInformationEditor />;

      case "participation":
        return <ProposeProjectParticipationEditor />;

      case "introduce":
        return <ProposeProjectDetailEditor />;

      default:
        return null;
    }
  };

  return (
    <>
      <ProjectEidtorHeader />
      <div className="relative flex w-full overflow-auto h-[calc(100vh-var(--sticky-header-height))]">
        <ProposeProjectToc currentStep={currentStep} />
        <div className="w-full">
          <form className="relative flex flex-col p-10">
            {renderProposeFormSection(currentStep as ProduceStepType)}
          </form>
        </div>
      </div>
      <ProposeUnsaveModal />
    </>
  );
};

export default ProposeDetailPage;
