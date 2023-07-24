"use client";

import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

import { PROPOSE_STEPS } from "src/constants/proposeSteps";
import type { ProjectFormValues } from "src/types/project";
import { supabase } from "src/utils/supabase";

interface ProjectTocParams {
  currentStep: string;
}

const ProjectToc: React.FC<ProjectTocParams> = ({ currentStep }) => {
  const {
    watch,
    trigger,
    formState: { errors, isValid },
  } = useFormContext<ProjectFormValues>();

  const uuid = watch("payload.uuid");

  return (
    <aside className="sticky right-0 top-0 w-80 self-start border-r bg-neutral-100/30  borer-neutral-300 h-[calc(100vh-var(--sticky-header-height))]">
      <div className="p-8">
        <ul>
          {PROPOSE_STEPS.map((step) => (
            <li
              key={step.key}
              className={`py-2 px-4 rounded-lg font-semibold text-lg ${
                currentStep === step.key
                  ? "bg-neutral-300/50"
                  : "bg-transparent"
              } `}
            >
              <Link href={`/project/${uuid}/${step.key}`}>{step.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ProjectToc;
