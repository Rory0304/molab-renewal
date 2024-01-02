'use client';

import React from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { DeferredLoading, Modal, SpinnerBox } from 'src/components/blocks';
import { molabApi } from 'src/utils/supabase';

interface CommunicationDetailReviewModalProps {
  uuid: string;
  modalRef: React.RefObject<HTMLDialogElement>;
}

const CommunicationDetailReviewModal: React.FC<
  CommunicationDetailReviewModalProps
> = ({ uuid, modalRef }) => {
  const supabaseClient = createClientComponentClient();

  const { data, isFetching } = useQuery(['review', uuid], async () => {
    if (uuid)
      return await molabApi.molabApiFetchReviewById(supabaseClient)({ uuid });
    return null;
  });

  const thumbnail = data?.thumbnail ?? '';
  const content = data?.content ?? '';

  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const modalBody = (
    <article className="py-5">
      {isFetching ? (
        <DeferredLoading timedOut={200}>
          <SpinnerBox />
        </DeferredLoading>
      ) : null}
      {!!thumbnail ? (
        <div className="relative w-full pt-[50%]">
          <Image
            fill
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/review_thumbnail/${thumbnail}`}
            alt="후기 썸네일"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      ) : null}
      {!!content ? (
        <div className="pt-5">
          <p>{content}</p>
        </div>
      ) : null}
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
