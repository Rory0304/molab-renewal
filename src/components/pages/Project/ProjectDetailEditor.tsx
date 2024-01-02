'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import {
  DeferredLoading,
  Editor,
  Modal,
  OverlayLoading,
} from 'src/components/blocks';
import { PROJETC_DETAIL_STEP } from 'src/constants/projectSteps';
import useUpdateProject from 'src/hooks/useUpdateProject';
import type { ProjectFormValues } from 'src/types';

const EDITOR_PLACE_HOLDER =
  '[문제 해결의 필요성 : 왜 문제에 관심을 가지게 되었고, 왜 해결되어야 하는가?]\n[문제와 관련된 이해관계자]\n[실행 계획]';

type ProjectDetailNameFieldType =
  | 'payload.stepDetail.definition.content'
  | 'payload.stepDetail.preparation.content'
  | 'payload.stepDetail.execution.content'
  | 'payload.stepDetail.completion.content';

interface ProjectDetailEditorProps {
  currentStep: string;
}

const ProjectDetailEditor: React.FC<ProjectDetailEditorProps> = ({
  currentStep,
}) => {
  const {
    getValues,
    watch,
    reset,
    setValue,
    formState: { isDirty },
  } = useFormContext<ProjectFormValues>();

  const [isUnsaveModalOpen, setIsUnsaveModalOpen] = React.useState(false);

  const projectId = getValues('payload.uuid');
  const watchedIsFetching = watch('isFetching');
  const refetch = watch('refetch');

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
      <section className="w-[900px]">
        <h4 className="flex pb-6 text-2xl font-bold text-neutral-600">
          프로젝트 소개 <ChevronRightIcon width={32} height={32} />
          {PROJETC_DETAIL_STEP.find(step => step.key === currentStep)?.title}
        </h4>
        <div className="h-[500px]">
          <Editor
            value={
              getValues(
                `payload.stepDetail.${currentStep}.content` as ProjectDetailNameFieldType
              ) || ''
            }
            placeholder={EDITOR_PLACE_HOLDER}
            onChange={value => {
              setValue(
                `payload.stepDetail.${currentStep}.content` as ProjectDetailNameFieldType,
                value,
                {
                  shouldDirty: true,
                }
              );
            }}
            editorStyles={{
              height: '450px',
            }}
          />
        </div>
        <button
          disabled={!isDirty}
          className="block mt-8 btn btn-primary w-fit"
          onClick={e => {
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
        id={'project-detail-editor-unsaved-modal'}
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
