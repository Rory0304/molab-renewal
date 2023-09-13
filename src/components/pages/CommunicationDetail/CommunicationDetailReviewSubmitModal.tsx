"use client";

import React from "react";
import Image from "next/image";
import { ErrorMessage } from "@hookform/error-message";

import Modal from "src/components/blocks/Modal/Modal";
import TextAreaInput from "src/components/blocks/FormInput/TextAreaInput";
import { useForm } from "react-hook-form";
import CameraIcon from "@heroicons/react/20/solid/CameraIcon";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import { uploadReview } from "src/app/api/review";
import { v4 as uuidV4 } from "uuid";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "src/context/AuthProvider";

interface CommunicationDetailReviewSubmitModalProps {
  projectId: string;
  modalRef?: React.RefObject<HTMLDialogElement>;
  submitCallback?: () => void;
}

interface ReviewFormProps {
  reviewImage?: FileList | null;
  reviewContent: string;
}

const CommunicationDetailReviewSubmitModal: React.FC<
  CommunicationDetailReviewSubmitModalProps
> = ({ projectId, modalRef, submitCallback }) => {
  const { userInfo } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    watch,
    reset,
    setValue,
    trigger,
    formState: { errors, isValid, isDirty },
  } = useForm<ReviewFormProps>({
    defaultValues: {
      reviewImage: null,
      reviewContent: "",
    },
  });

  const watchedReviewContent = watch("reviewContent");
  const watchedReviewImage = watch("reviewImage");

  const handleModalClose = () => {
    if (modalRef?.current) {
      modalRef.current.close();
      reset({
        reviewImage: null,
        reviewContent: "",
      });
    }
  };

  //
  //
  //
  const reviewImageRegister = register("reviewImage", {
    validate: {
      lessThan10MB: (file) =>
        (file?.[0] && file[0].size < 10000000) ||
        !file ||
        "10MB 이하 파일만 업로드 가능합니다.",
    },
  });

  const reviewContentRegister = register("reviewContent", {
    required: "필수 입력 항목입니다.",
    maxLength: {
      value: 500,
      message: "500자 이하로 작성해주세요.",
    },
  });

  //
  //
  //
  const handleReviewUpload = async () => {
    try {
      setIsLoading(true);
      if (!isValid) {
        trigger();
      } else {
        if (!userInfo?.id) throw Error("fail to get user id");

        await uploadReview({
          projectId,
          userId: userInfo?.id,
          uuid: uuidV4(),
          content: watchedReviewContent,
          imageFile: watchedReviewImage?.[0],
        }).then((res) => {
          if (typeof submitCallback === "function") {
            submitCallback();
          }
          enqueueSnackbar("성공적으로 업로드 하였습니다.", {
            variant: "success",
          });
          modalRef?.current?.close();
        });
      }
    } catch (err) {
      enqueueSnackbar("업로드에 실했습니다. 잠시후 다시 시도해주세요", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const modalHeader = (
    <div>
      <strong className="text-xl">참여 인증</strong>
    </div>
  );

  const modalBody = (
    <div className="py-4">
      <div className="relative w-full mb-4">
        {watchedReviewImage?.[0] ? (
          <div className="flex items-start">
            <Image
              src={URL.createObjectURL(watchedReviewImage[0])}
              alt="preview-image"
              width={100}
              height={100}
              style={{
                objectFit: "cover",
              }}
            />
            <button
              aria-label="remove thumbnail input"
              className="w-4 h-4 ml-2 min-h-fit btn btn-sm btn-circle btn-ghost"
              onClick={() => setValue("reviewImage", null)}
            >
              <XMarkIcon />
            </button>
          </div>
        ) : (
          <>
            <button className="w-full h-full btn btn-outline">
              <i className="mr-1">
                <CameraIcon />
              </i>
              사진 첨부
            </button>
            <input
              type="file"
              className="absolute top-0 left-0 block w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              {...reviewImageRegister}
            />
            <ErrorMessage
              errors={errors}
              name="reviewImage"
              render={({ message }) =>
                message ? (
                  <span className="block mt-2 text-danger">{message}</span>
                ) : null
              }
            />
          </>
        )}
      </div>
      <TextAreaInput
        required
        {...reviewContentRegister}
        label="후기"
        labelTextAlt={`${watchedReviewContent?.length ?? 0}/${500}자`}
        placeholder="최대 500자까지 후기를 작성해주세요"
        maxLength={500}
      />
      <div className="text-sm text-gray-400">
        <p className="relative before:small-circle before:mr-[0.62em] before:mt-[0.62em]">
          사진은 10MB 이내로 첨부가능합니다.
        </p>
        <p className="relative before:small-circle before:mr-[0.62em] before:mt-[0.62em]">
          적절하지 않은 게시물은 삭제됩니다.
        </p>
      </div>
    </div>
  );

  const modalAction = (
    <button
      type="button"
      form="review-form"
      className="btn btn-primary"
      disabled={!isDirty}
      onClick={handleReviewUpload}
    >
      {isLoading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <span>저장</span>
      )}
    </button>
  );

  return (
    <Modal
      closeBtn
      ref={modalRef}
      formId={"review-form"}
      ModalHeader={modalHeader}
      ModalBody={modalBody}
      ModalAction={modalAction}
      onClose={handleModalClose}
    />
  );
};

export default CommunicationDetailReviewSubmitModal;
