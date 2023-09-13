"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Editor,
  DeferredLoading,
  OverlayLoading,
  Modal,
} from "src/components/blocks";
import { PROJECT_STEPS } from "src/constants/projectSteps";
import type { ProjectFormValues, ProjectStepType } from "src/types";
import useUpdateProject from "src/hooks/useUpdateProject";

const EDITOR_PLACE_HOLDER =
  "[문제 해결의 필요성 : 왜 문제에 관심을 가지게 되었고, 왜 해결되어야 하는가?]\n[문제와 관련된 이해관계자]\n[실행 계획]";

const ProjectDetailEditor: React.FC = () => {
  const {
    getValues,
    watch,
    reset,
    setValue,
    control,
    formState: { isDirty, dirtyFields },
  } = useFormContext<ProjectFormValues>();

  const [isUnsaveModalOpen, setIsUnsaveModalOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(PROJECT_STEPS[0]);

  const projectId = getValues("payload.uuid");
  const watchedIsFetching = watch("isFetching");
  const refetch = watch("refetch");

  const { isLoading, mutate } = useUpdateProject({
    projectId,
    refetch,
  });

  const renderEditor = (currentStep: ProjectStepType) => {
    switch (currentStep) {
      case "execution":
        return (
          <Editor
            value={getValues(`payload.stepDetail.execution.content`) || ""}
            placeholder={EDITOR_PLACE_HOLDER}
            onChange={(value) => {
              setValue(`payload.stepDetail.execution.content`, value, {
                shouldDirty: true,
              });
            }}
            editorStyles={{
              height: "450px",
            }}
          />
        );

      case "completion":
        return (
          <Editor
            value={getValues(`payload.stepDetail.completion.content`) || ""}
            placeholder={EDITOR_PLACE_HOLDER}
            onChange={(value) => {
              setValue(`payload.stepDetail.completion.content`, value, {
                shouldDirty: true,
              });
            }}
            editorStyles={{
              height: "450px",
            }}
          />
        );

      case "definition":
        return (
          <Editor
            value={getValues(`payload.stepDetail.definition.content`) || ""}
            placeholder={EDITOR_PLACE_HOLDER}
            onChange={(value) => {
              setValue(`payload.stepDetail.definition.content`, value, {
                shouldDirty: true,
              });
            }}
            editorStyles={{
              height: "450px",
            }}
          />
        );

      case "preparation":
        return (
          <Editor
            value={getValues(`payload.stepDetail.preparation.content`) || ""}
            placeholder={EDITOR_PLACE_HOLDER}
            onChange={(value) => {
              setValue(`payload.stepDetail.preparation.content`, value, {
                shouldDirty: true,
              });
            }}
            editorStyles={{
              height: "450px",
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {watchedIsFetching ? (
        <DeferredLoading timedOut={200}>
          <OverlayLoading />
        </DeferredLoading>
      ) : null}
      <section className="w-[900px]">
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
              onClick={() => {
                if (isDirty) {
                  setIsUnsaveModalOpen(true);
                } else {
                  setCurrentStep(step);
                }
              }}
            >
              {step.title}
            </li>
          ))}
        </ul>
        <div className="pt-7 h-[500px]">{renderEditor(currentStep.key)}</div>
        <button
          disabled={!isDirty}
          className="block mt-8 btn btn-primary w-fit"
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
      </section>
      <Modal
        closeBtn
        id={"project-detail-editor-unsaved-modal"}
        open={isUnsaveModalOpen}
        ModalHeader={
          <div>
            <strong className="text-xl font-bold">
              변경 사항을 저장할까요?
            </strong>
          </div>
        }
        ModalAction={
          <div>
            <button
              className={`btn btn-outline btn-neutral mr-2`}
              type="button"
              onClick={() => {
                reset();
                setIsUnsaveModalOpen(false);
              }}
            >
              삭제
            </button>
            <button
              type="button"
              className={`btn btn-primary`}
              onClick={() => {
                mutate(watch());
                setIsUnsaveModalOpen(false);
              }}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                <span>저장</span>
              )}
            </button>
          </div>
        }
        onClose={() => setIsUnsaveModalOpen(false)}
      />
    </>
  );
};

export default ProjectDetailEditor;
