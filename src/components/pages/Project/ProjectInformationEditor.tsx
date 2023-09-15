"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  ThumbnailInput,
  AreaSelectInput,
  TextInput,
  ToggleInput,
  DatePickerInput,
  OverlayLoading,
  DeferredLoading,
} from "src/components/blocks";
import type { ProjectFormValues } from "src/types/project";
import useUpdateProject from "src/hooks/useUpdateProject";

const PROJECT_TITLE_MAX_LENGTH = 200;

const ProjectInformationEditor: React.FC = () => {
  const {
    register,
    watch,
    getValues,
    trigger,
    setValue,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useFormContext<ProjectFormValues>();

  console.log("dirtyFields", dirtyFields);
  //
  //
  //
  const watchedIsFetching = watch("isFetching");
  const watchedThumbnailImage = watch("payload.thumbnail");
  const watchedTitle = watch("payload.title");
  const watchedStartDate = watch("payload.startDate");

  const projectId = getValues("payload.uuid");
  const refetch = getValues("refetch");

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
  const toggleRegister = register("payload.isOpen", {
    onChange: (e) => setValue("payload.isOpen", e.target.checked),
  });

  // [DATE INPUT REGISTER]
  const startDateInputRegister = register("payload.startDate", {
    required: "필수 입력 항목입니다.",
  });

  const endDateInputRegister = register("payload.endDate", {
    required: "필수 입력 항목입니다.",
    validate: (date) =>
      new Date(date).getTime() > new Date(watchedStartDate).getTime() ||
      "종료 일자가 시작 일자보다 빠른 날짜입니다. 올바른 날짜를 선택해 주세요",
  });

  const { isLoading, mutate } = useUpdateProject({
    projectId,
    refetch,
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!isValid) {
      trigger();
    } else {
      mutate(watch());
    }
  };

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
            required
            label
            selectedSido={watch("payload.siDo")}
            selectedSiGunGu={watch("payload.siGunGu")}
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
            labelAltText={`파일 형식: jpg 또는 png / 제한 크기: 10MB`}
            thumbnailImage={watchedThumbnailImage?.[0]}
            thumbnailInputRegister={thumbnailInputRegister}
            error={Boolean(errors.payload?.thumbnail)}
            onRemoveThumbnailImage={() =>
              setValue("payload.thumbnail", null, { shouldDirty: true })
            }
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

          {/* Project Date Input */}
          <DatePickerInput
            labelText="시작 일자"
            dateInputRegister={startDateInputRegister}
            error={Boolean(errors.payload?.startDate)}
            ErrorMessage={
              <ErrorMessage
                errors={errors}
                name="payload.startDate"
                render={({ message }) =>
                  message ? (
                    <span className="block mt-2 text-danger">{message}</span>
                  ) : null
                }
              />
            }
          />
          <DatePickerInput
            labelText="종료 일자"
            dateInputRegister={endDateInputRegister}
            error={Boolean(errors.payload?.endDate)}
            dateMin={watchedStartDate}
            ErrorMessage={
              <ErrorMessage
                errors={errors}
                name="payload.endDate"
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
            toggleInputRegister={toggleRegister}
            checked={watch("payload.isOpen")}
          />

          <button
            disabled={!isDirty}
            className="mt-8 btn btn-primary w-fit"
            onClick={(e) => handleSubmit(e)}
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

export default ProjectInformationEditor;
