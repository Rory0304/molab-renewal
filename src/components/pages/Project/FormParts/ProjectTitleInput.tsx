"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "src/components/blocks";
import { ErrorMessage } from "@hookform/error-message";

import type { ProjectFormValues } from "src/types/project";
import type { UseFormReturn } from "react-hook-form";
import { PROPOSE_TUTORIAL_STEPS_SELECTORS } from "src/constants/proposeTutorial";

const PROJECT_TITLE_MAX_LENGTH = 200;

interface ProjectTitleInputProps {
  methods: UseFormReturn<ProjectFormValues, any, undefined>;
}

const ProjectTitleInput: React.FC<ProjectTitleInputProps> = ({
  methods: { control },
}) => {
  return (
    <Controller
      control={control}
      name="payload.title"
      rules={{
        required: "필수 입력 항목입니다.",
        maxLength: {
          value: PROJECT_TITLE_MAX_LENGTH,
          message: "200자 이하로 작성해주세요.",
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextInput
          className={PROPOSE_TUTORIAL_STEPS_SELECTORS[0]}
          value={value}
          onChange={onChange}
          placeholder={"제목을 입력하세요"}
          label={"프로젝트 제목"}
          labelTextAlt={`${value.length}/${PROJECT_TITLE_MAX_LENGTH}자`}
          error={Boolean(error?.message)}
          ErrorMessage={
            <ErrorMessage
              name="payload.title"
              render={({ message }) =>
                message ? (
                  <span className="mt-2 text-danger">{message}</span>
                ) : null
              }
            />
          }
        />
      )}
    />
  );
};

export default React.memo(ProjectTitleInput, (prev, cur) => true);
