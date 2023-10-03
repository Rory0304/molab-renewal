"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import ConditionalRouterLink from "src/components/blocks/ConditionalRouterLink/ConditionalRouterLink";

import { PROPOSE_STEPS } from "src/constants/proposeSteps";
import useUnsaveModal from "src/hooks/useUnsaveModal";
import type { ProjectFormValues } from "src/types/project";

interface ProjectTocParams {
  currentStep: string;
}

const ProjectToc: React.FC<ProjectTocParams> = ({ currentStep }) => {
  const {
    watch,
    formState: { isDirty },
  } = useFormContext<ProjectFormValues>();

  const { handleModalOpen } = useUnsaveModal();
  const uuid = watch("payload.uuid");

  console.log(currentStep);

  return (
    <aside className="sticky right-0 top-0 w-96 self-start border-r bg-neutral-100/30  borer-neutral-300 h-[calc(100vh-var(--sticky-header-height))]">
      <div className="p-8">
        <ul className="w-56 p-0 menu bg-base-200 rounded-box">
          {PROPOSE_STEPS.map((step) => (
            <li key={step.key} className={`rounded-lg font-semibold text-lg`}>
              {step.items ? (
                <details open>
                  <summary>{step.title}</summary>
                  <ul>
                    {step.items.map((item) => {
                      return (
                        <li
                          key={item.key}
                          className={`rounded-lg font-semibold text-lg p-1`}
                        >
                          <ConditionalRouterLink
                            href={`/project/${uuid}/${step.key}/${item.key}`}
                            when={isDirty}
                            className={`block ${
                              currentStep === item.key
                                ? "bg-neutral-300/50"
                                : ""
                            }`}
                            callback={() =>
                              handleModalOpen(
                                `/project/${uuid}/${step.key}/${item.key}`
                              )
                            }
                          >
                            {item.title}
                          </ConditionalRouterLink>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ) : (
                <ConditionalRouterLink
                  href={`/project/${uuid}/${step.key}`}
                  when={isDirty}
                  className={`block ${
                    currentStep === step.key ? " bg-neutral-300/50" : ""
                  }`}
                  callback={() =>
                    handleModalOpen(`/project/${uuid}/${step.key}`)
                  }
                >
                  {step.title}
                </ConditionalRouterLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ProjectToc;