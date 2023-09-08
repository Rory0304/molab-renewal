"use client";

import React from "react";
import Image from "next/image";
import Modal from "src/components/blocks/Modal/Modal";
import { fetchReviewById } from "src/app/api/review";
import { useQuery } from "@tanstack/react-query";

interface CommunicationDetailReviewModalProps {
  uuid: string;
  modalRef: React.RefObject<HTMLDialogElement>;
}

const CommunicationDetailReviewModal: React.FC<
  CommunicationDetailReviewModalProps
> = ({ uuid, modalRef }) => {
  const { data } = useQuery(["review", uuid], async () => {
    if (uuid) return await fetchReviewById({ uuid });
    return null;
  });

  const thumbnail = data?.thumbnail ?? "";
  const content = data?.content ?? "";

  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const modalBody = (
    <article className="py-5">
      {!!thumbnail ? (
        <div className="relative w-full pt-[50%]">
          <Image
            fill
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/review_thumbnail/${thumbnail}`}
            alt="후기 썸네일"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      ) : null}
      <div className="pt-5">
        <p>{content}</p>
      </div>
    </article>
  );

  return (
    <Modal
      closeBtn
      ref={modalRef}
      ModalBody={modalBody}
      onClose={handleModalClose}
      modalBoxStyles="w-11/12 max-w-xl"
    />
  );
};

export default CommunicationDetailReviewModal;
