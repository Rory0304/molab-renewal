"use client";

import React from "react";
import { Modal } from "src/components/blocks";
import Link from "next/link";
import useUnsaveModal from "src/hooks/useUnsaveModal";
import { useFormContext } from "react-hook-form";
import type { ProjectFormValues } from "src/types/project";
import { useSnackbar } from "notistack";
import useUpdateProject from "src/hooks/useUpdateProject";
import { useRouter } from "next/navigation";

const ProposeUnsaveModal: React.FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { modalState, handleModalClose } = useUnsaveModal();
  const {
    trigger,
    getValues,
    watch,
    formState: { isValid },
  } = useFormContext<ProjectFormValues>();

  const projectId = getValues("payload.uuid");
  const refetch = watch("refetch");

  const { isLoading, mutate } = useUpdateProject({
    projectId,
    refetch,
  });

  //
  //
  //
  const handleFormSave = async (link: string) => {
    if (!isValid) {
      trigger();
      handleModalClose();
      enqueueSnackbar("필수 입력 항목을 다시 확인해주세요.", {
        variant: "error",
      });
    } else {
      mutate(watch());
      router.push(link);
    }
  };

  //
  //
  //
  const modalHeader = (
    <div>
      <strong className="text-xl font-bold">변경 사항을 저장할까요?</strong>
    </div>
  );

  const modalBody = (
    <div className="py-4">
      <p className="text-lg whitespace-pre-wrap">
        작성 중인 내용이 있습니다. 저장하지 않고 이동할 경우, 작성 중인 내용이
        모두 삭제됩니다.
      </p>
    </div>
  );

  const modalAction = (
    <div>
      <Link href={modalState.link} className="mr-3 btn btn-netural btn-outline">
        바로 이동하기
      </Link>
      <button
        className={`btn btn-primary`}
        onClick={() => handleFormSave(modalState.link)}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <span> 저장 후 이동하기</span>
        )}
      </button>
    </div>
  );

  //
  //
  //
  return (
    <Modal
      closeBtn
      id={"project-unsave-modal"}
      open={modalState.isOpen}
      ModalHeader={modalHeader}
      ModalBody={modalBody}
      ModalAction={modalAction}
      onClose={handleModalClose}
    />
  );
};

export default ProposeUnsaveModal;
