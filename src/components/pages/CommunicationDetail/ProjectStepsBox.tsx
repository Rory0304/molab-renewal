'use client';

import React from 'react';
import 'react-quill/dist/quill.snow.css';

import { PROJETC_DETAIL_STEP } from 'src/constants/projectSteps';
import { ProjectContent } from 'src/types/project';

interface ProjectStepsBoxProps {
  content: ProjectContent['stepDetail'];
}

const ProjectStepsBox: React.FC<ProjectStepsBoxProps> = ({ content }) => {
  const [selectedStep, setSelectedStep] = React.useState(
    PROJETC_DETAIL_STEP[0].key
  );

  return (
    <section>
      {/* Step Tabs */}
      <ul className="flex overflow-x-scroll border-b flex-nowrap tabs border-neutral-300 ">
        {PROJETC_DETAIL_STEP.map(step => (
          <li
            key={step.key}
            className={`flex-auto flex-grow-0 flex-shrink-0 tab-lg font-semibold text-neutral-600 tab ${
              selectedStep === step.key ? 'tab-active tab-bordered' : ''
            }`}
            onClick={() => setSelectedStep(step.key)}
          >
            {step.title}
          </li>
        ))}
      </ul>
      {/* Step Detail */}
      <div className="py-8 quill">
        <div className="ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{
              __html: content?.[selectedStep].content ?? '',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectStepsBox;
