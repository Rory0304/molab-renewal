"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Editor } from "src/components/blocks";
import { PROJECT_STEPS } from "src/constants/projectSteps";

const ProjectDetailEditor: React.FC = () => {
  const { getValues, setValue } = useFormContext();
  const [editorContent, setEditorContent] = React.useState("");
  const [currentStep, setCurrentStep] = React.useState(PROJECT_STEPS[0]);

  React.useEffect(() => {
    const currentStepDetailContent = getValues(
      `payload.stepDetail.${currentStep.key}.content`
    );
    setEditorContent(currentStepDetailContent);
  }, [currentStep]);

  const handleEditorContentChange = (value: string) => {
    setEditorContent(value);
    setValue(`payload.stepDetail.${currentStep.key}.content`, value);
  };

  return (
    <section>
      <h4 className="pb-6 text-2xl font-bold text-neutral-600">
        프로젝트 소개
      </h4>
      <ul className="tabs">
        {PROJECT_STEPS.map((step) => (
          <li
            className={`tab tab-bordered ${
              currentStep.key === step.key ? "tab-active" : ""
            }`}
            key={step.key}
            onClick={(e) => setCurrentStep(step)}
          >
            {step.title}
          </li>
        ))}
      </ul>
      <div className="pt-7 min-h-[500px]">
        <Editor
          value={editorContent}
          placeholder={
            "[문제 해결의 필요성 : 왜 문제에 관심을 가지게 되었고, 왜 해결되어야 하는가?]\n[문제와 관련된 이해관계자]\n[실행 계획]"
          }
          onChange={handleEditorContentChange}
        />
      </div>
    </section>
  );
};

export default ProjectDetailEditor;
