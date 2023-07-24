"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  ThumbnailInput,
  AreaSelectInput,
  TextInput,
  ToggleInput,
} from "../../blocks/FormInput";

import { updatePropse } from "src/app/api/propose";
import type { ProjectFormValues } from "src/types/project";

const PROJECT_TITLE_MAX_LENGTH = 200;

const ProjectInformationEditor: React.FC = () => {
  const {
    register,
    watch,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useFormContext<ProjectFormValues>();

  const [isProjectOpen, setIsProjectOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  //
  //
  //
  const watchedTitle = watch("payload.title");

  // [INPUT REGISTER]
  const titleInputRegister = register("payload.title", {
    required: "필수 입력 항목입니다.",
    maxLength: {
      value: PROJECT_TITLE_MAX_LENGTH,
      message: "200자 이하로 작성해주세요.",
    },
  });

  // [AREA SELECT REGISTER]
  const siDoSelectInputRegister = register("payload.siDo", {
    required: "필수 입력 항목입니다.",
  });

  const siGunGuSelectInputRegister = register("payload.siGunGu", {
    required: "필수 입력 항목입니다.",
  });

  // [THUMBNAIL INPUT REGISTER]
  const thumbnailInputRegister = register("payload.thumbnail", {
    required: "필수 입력 항목입니다.",
    validate: {
      lessThan10MB: (fileList) =>
        (fileList?.[0] && fileList[0].size < 10000000) ||
        "10MB 이하 파일만 업로드 가능합니다.",
    },
  });

  // [OPEN TOGGLE REGISTER]
  const openToggleRegister = register("payload.isOpen");

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if(!isValid) {
      trigger()
    }
    else{
      setIsLoading(true);
      try {
        updatePropse("c645ce3f-f3d6-46c5-9ccb-1d0c5b8071b5", watch());
        // if success show alert
      } catch (e) {
        // show dialog
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section>
      <h4 className="pb-6 text-2xl font-bold text-neutral-600">기본 정보</h4>
      <div className="form-control">
        {/* Title Input */}
        <TextInput
          {...titleInputRegister}
          placeholder={"제목을 입력하세요"}
          label={"프로젝트 제목"}
          labelTextAlt={`${watchedTitle.length}/${PROJECT_TITLE_MAX_LENGTH}자`}
          error={Boolean(errors.payload?.title)}
          ErrorMessage={
            <ErrorMessage
              errors={errors}
              name="payload.title"
              render={({ message }) =>
                message ? (
                  <span className="mt-2 text-danger">{message}</span>
                ) : null
              }
            />
          }
        />

        {/* Area Input */}
        <AreaSelectInput
          selectedSido={watch("payload.siDo")}
          siDoError={Boolean(errors.payload?.siDo)}
          siGunGuError={Boolean(errors.payload?.siGunGu)}
          SiDoErrorMessage={
            <ErrorMessage
              errors={errors}
              name="payload.siDo"
              render={({ message }) =>
                message ? (
                  <span className="block mt-2 text-danger">{message}</span>
                ) : null
              }
            />
          }
          SiGunGuErrorMessage={
            <ErrorMessage
              errors={errors}
              name="payload.siGunGu"
              render={({ message }) =>
                message ? (
                  <span className="block mt-2 text-danger">{message}</span>
                ) : null
              }
            />
          }
          siDoSelectInputRegister={siDoSelectInputRegister}
          siGunGuSelectInputRegister={siGunGuSelectInputRegister}
        />

        {/* Thumbanil Image Input */}
        <ThumbnailInput
          labelText={"썸네일 이미지"}
          labelAltText={`제한 크기 10MB`}
          thumbnailInputRegister={thumbnailInputRegister}
          error={Boolean(errors.payload?.thumbnail)}
          ErrorMessage={
            <ErrorMessage
              errors={errors}
              name="payload.thumbnail"
              render={({ message }) =>
                message ? (
                  <span className="block mt-2 text-danger">{message}</span>
                ) : null
              }
            />
          }
        />

        {/* Project Open Toggle Input */}
        <ToggleInput
          labelText={"공개 여부"}
          checked={isProjectOpen}
          onChange={() => setIsProjectOpen(!isProjectOpen)}
        />

        <button
          className="btn btn-md btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span>저장</span>
          )}
        </button>
      </div>
    </section>
  );
};

export default ProjectInformationEditor;
