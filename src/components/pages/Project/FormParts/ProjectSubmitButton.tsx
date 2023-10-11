"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ProjectFormValues } from "src/types/project";
import useUpdateProject from "src/hooks/useUpdateProject";

interface ProjectSubmitButtonProps {
  methods: UseFormReturn<ProjectFormValues, any, undefined>;
}

const ProjectSubmitButton: React.FC<ProjectSubmitButtonProps> = ({
  methods,
}) => {
  const {
    getValues,
    trigger,
    watch,
    formState: { isDirty, isValid },
  } = methods;

  //
  //
  //

  const projectId = getValues("payload.uuid");
  const refetch = getValues("refetch");

  const { isLoading, mutate } = useUpdateProject({
    projectId,
    refetch,
  });

  const handleSubmit = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, isValid: boolean) => {
      e.preventDefault();

      if (!isValid) {
        trigger();
      } else {
        mutate(watch());
      }
    },
    []
  );

  return (
    <button
      disabled={!isDirty}
      className="mt-8 btn btn-primary w-fit"
      onClick={(e) => handleSubmit(e, isValid)}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <span>저장</span>
      )}
    </button>
  );
};

export default ProjectSubmitButton;
