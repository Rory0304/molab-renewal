"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { OverlayLoading, DeferredLoading } from "src/components/blocks";
import type { ProjectFormValues } from "src/types/project";

import ProjectAreaSelect from "./FormParts/ProjectAreaSelect";
import ProjectToggleInput from "./FormParts/ProjectToggleInput";
import ProjectTitleInput from "./FormParts/ProjectTitleInput";
import ProjectDatePickerInput from "./FormParts/ProjectDatePickerInput";
import ProjectThumbnailInput from "./FormParts/ProjectThumbnailInput";
import ProjectSubmitButton from './FormParts/ProjectSubmitButton';

const ProjectInformationEditor: React.FC = () => {
  const methods = useFormContext<ProjectFormValues>();
  const watchedIsFetching = useWatch({ control: methods.control, name: "isFetching" });

  return (
    <>
      {watchedIsFetching ? (
        <DeferredLoading timedOut={200}>
          <OverlayLoading />
        </DeferredLoading>
      ) : null}
      <section className="max-w-[900px]">
        <h4 className="pb-6 text-2xl font-bold text-neutral-600">기본 정보</h4>
        <div className="form-control">
          {/* Title Input */}
          <ProjectTitleInput methods={methods} />

          {/* Area Input */}
          <ProjectAreaSelect methods={methods} />

          {/* Thumbanil Image Input */}
          <ProjectThumbnailInput methods={methods} />

          {/* Project Date Input */}
          <ProjectDatePickerInput methods={methods} />

          {/* Project Open Toggle Input */}
          <ProjectToggleInput methods={methods} />

          {/* Project Submit Button */}
          <ProjectSubmitButton methods={methods} />
        </div>
      </section>
    </>
  );
};

export default ProjectInformationEditor;
