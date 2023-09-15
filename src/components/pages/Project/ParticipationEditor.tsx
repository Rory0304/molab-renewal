"use client";

import React from "react";
import { Editor, DeferredLoading, OverlayLoading } from "src/components/blocks";
import { useFormContext } from "react-hook-form";
import type { ProjectFormValues } from "src/types/project";
import useUpdateProject from "src/hooks/useUpdateProject";

const ParticipationEditor: React.FC = () => {
  const {
    watch,
    setValue,
    getValues,
    formState: { isDirty },
  } = useFormContext<ProjectFormValues>();

  const projectId = getValues("payload.uuid");
  const refetch = watch("refetch");
  const watchedEditorContent = watch("payload.howTo.content");
  const watchedIsFetching = watch("isFetching");

  const { isLoading, mutate } = useUpdateProject({
    projectId,
    refetch,
  });

  return (
    <>
      {watchedIsFetching ? (
        <DeferredLoading timedOut={200}>
          <OverlayLoading />
        </DeferredLoading>
      ) : null}
      <section className="max-w-[900px]">
        <h4 className="pb-6 text-2xl font-bold text-neutral-600">참여 방법</h4>
        <div className="h-[500px]">
          <Editor
            key="payload.howTo.content"
            value={watchedEditorContent as string}
            placeholder={"프로젝트 참여 방법을 작성해주세요."}
            onChange={(value) =>
              setValue(`payload.howTo.content`, value, { shouldDirty: true })
            }
            editorStyles={{
              height: "450px",
            }}
          />
        </div>
        <div className="mt-8">
          <button
            disabled={!isDirty}
            className="btn btn-primary w-fit"
            onClick={(e) => {
              e.preventDefault();
              mutate(watch());
            }}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <span>저장</span>
            )}
          </button>
        </div>
      </section>
    </>
  );
};

export default ParticipationEditor;
