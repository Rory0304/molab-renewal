import {
  ProposeProjectDetailEditor,
  ProposeProjectInformationEditor,
  ProposeProjectParticipationEditor,
  ProposeProjectToc,
} from "src/components/pages";

import { PROPOSE_STEPS } from "src/constants/proposeSteps";
import { ProduceStepType } from "src/types/common";

// -ref: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
const dynamicParams = false;
export { dynamicParams };

export const generateStaticParams = async () => {
  const slugs = PROPOSE_STEPS.map((step) => step.key);

  return slugs;
};

const ProposeDetailPage = ({ params }: { params: { slug: string } }) => {
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
    <div className="relative flex w-full overflow-auto">
      <ProposeProjectToc currentStep={params.slug} />
      <form className="p-10 flex flex-col w-[900px]">
        {renderProposeFormSection(params.slug as ProduceStepType)}
      </form>
    </div>
  );
};

export default ProposeDetailPage;
