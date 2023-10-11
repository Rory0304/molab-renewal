"use client";

import React from "react";
import { Controller } from "react-hook-form";

import { ThumbnailInput } from "src/components/blocks";
import { ErrorMessage } from "@hookform/error-message";

import type { ProjectFormValues } from "src/types/project";
import type { UseFormReturn } from "react-hook-form";

interface ProjectThumbnailInputProps {
  methods: UseFormReturn<ProjectFormValues, any, undefined>;
}

const ProjectThumbnailInput: React.FC<ProjectThumbnailInputProps> = ({
  methods: { control },
}) => {
  return (
    <Controller
      name="payload.thumbnail"
      control={control}
      rules={{
        required: "필수 입력 항목입니다.",
        validate: {
          lessThan10MB: (fileList) =>
            (fileList?.[0] && fileList[0].size < 10000000) ||
            "10MB 이하 파일만 업로드 가능합니다.",
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <ThumbnailInput
          onChange={(event) => onChange(event.target.files || null)}
          labelText={"썸네일 이미지"}
          labelAltText={`파일 형식: jpg 또는 png / 제한 크기: 10MB`}
          thumbnailImage={value?.[0]}
          error={Boolean(error?.message)}
          onRemoveThumbnailImage={() => onChange(null)}
          ErrorMessage={
            <ErrorMessage
              name="payload.thumbnail"
              render={({ message }) =>
                message ? (
                  <span className="block mt-2 text-danger">{message}</span>
                ) : null
              }
            />
          }
        />
      )}
    />
  );
};

export default React.memo(
  ProjectThumbnailInput,
  (prev, cur) =>
    JSON.stringify(prev.methods.getFieldState("payload.thumbnail")) ===
    JSON.stringify(cur.methods.getFieldState("payload.thumbnail"))
);
