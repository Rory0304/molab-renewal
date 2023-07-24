import React from "react";

import { ProjectContent } from "src/types/project";
import { PROJECT_STEPS } from "src/constants/projectSteps";

interface ProjectStepsBoxProps {
  contents: ProjectContent["stepDetail"];
}

const ProjectStepsBox: React.FC<ProjectStepsBoxProps> = ({ contents }) => {
  const [selectedStep, setSelectedStep] = React.useState(PROJECT_STEPS[0].key);

  return (
    <div>
      {/* Step Tabs */}
      <ul className="border-b tabs border-neutral-300">
        {PROJECT_STEPS.map((step) => (
          <li
            key={step.key}
            className={`tab-lg font-semibold text-neutral-600 tab ${
              selectedStep === step.key ? "tab-active tab-bordered" : ""
            }`}
            onClick={() => setSelectedStep(step.key)}
          >
            {step.title}
          </li>
        ))}
      </ul>
      {/* Step Detail */}
      <div className="py-8">
        <div
          dangerouslySetInnerHTML={{
            __html: contents[selectedStep].content ?? "",
          }}
        />
      </div>
    </div>
  );
};

export default ProjectStepsBox;
