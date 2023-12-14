"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { ReviewType } from "src/app/api/review";
import InformationCircleIcon from "@heroicons/react/24/solid/InformationCircleIcon";
import SpinnerBox from "src/components/blocks/SpinnerBox/SpinnerBox";
import { ErrorBox } from "src/components/blocks";
import { checkIsDatePast } from "src/utils/date";
import { molabApi } from "src/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const DynamicCommunicationDetailReviewSubmitModal = dynamic(
  () =>
    import(
      "src/components/pages/CommunicationDetail/CommunicationDetailReviewSubmitModal"
    )
);

const DynamicCommunicationDetailReviewModal = dynamic(
  () =>
    import(
      `src/components/pages/CommunicationDetail/CommunicationDetailReviewModal`
    )
);

interface ReviewBoxProps {
  projectId: string;
  endDate: string;
  preview?: boolean;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({
  projectId,
  endDate,
  preview = false,
}) => {
  const supabaseClient = createClientComponentClient();
  const isProjectEnded = checkIsDatePast(new Date(endDate));

  const reviewModalRef = React.useRef<HTMLDialogElement>(null);
  const reviewSubmitModal = React.useRef<HTMLDialogElement>(null);

  const [selectedReviewId, setSelectedReviewId] = React.useState("");

  //
  //
  //
  const { data, isSuccess, isError, isFetching, refetch } = useQuery(
    ["review", projectId],
    async () =>
      await  molabApi.molabApiFetchReviewList(supabaseClient)({
        select: `thumbnail, uuid`,
        offset: 0,
        pageCount: 16,
        projectId: projectId,
      })
  );

  const reviewList = data ?? [];

  //
  //
  //
  const handleDetailReviewModalOpen = () => {
    if (reviewModalRef.current) {
      reviewModalRef.current.showModal();
    }
  };

  const handleReviewSubmitModalOpen = () => {
    if (reviewSubmitModal.current) {
      reviewSubmitModal.current.showModal();
    }
  };

  //
  //
  //
  const renderReviewList = (
    preview: boolean,
    reviewList: Partial<ReviewType>[],
    handleDetailReviewModalOpen: () => void
  ) => {
    if (preview)
      return (
        <p className="text-center">
          <InformationCircleIcon
            width={20}
            height={20}
            aria-hidden="true"
            className="m-auto"
          />
          미리보기에서는 참여 인증을 볼 수 없습니다.
        </p>
      );
    
    return reviewList && reviewList?.length > 0 ? (
      <div className="grid w-full grid-cols-4">
        {reviewList.map((item) =>
          item.thumbnail ? (
            <div
              key={item.uuid}
              className="relative cursor-pointer pt-[100%] bg-gray-200"
              onClick={() => {
                setSelectedReviewId(item?.uuid ?? "");
                handleDetailReviewModalOpen();
              }}
            >
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/review_thumbnail/${item.thumbnail}`}
                alt={`참여 인증-사진`}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ) : null
        )}
      </div>
    ) : (
      <p className="text-center text-gray-500">
        <InformationCircleIcon
          width={20}
          height={20}
          aria-hidden="true"
          className="m-auto"
        />
        아직 참여한 유저가 없습니다
      </p>
    );
  };

  return (
    <section>
      <h4 className="mb-4 text-2xl font-semibold text-neutral-600">
        참여 인증
      </h4>
      <div className="flex flex-col items-center justify-between p-4 border rounded-lg border-neutral-300">
        <div className="w-full max-h-40">
          {isError ? (
            <ErrorBox
              title="데이터를 가져오는데 실패했습니다."
              onRefetch={refetch}
            />
          ) : null}
          {isSuccess ? (
            <>
              {renderReviewList(
                preview,
                reviewList,
                handleDetailReviewModalOpen
              )}
              <button
                type="button"
                disabled={isProjectEnded || preview}
                className="mt-4 btn btn-block btn-primary"
                onClick={handleReviewSubmitModalOpen}
              >
                인증하기
              </button>
            </>
          ) : null}
          {isFetching ? <SpinnerBox spinnerColor="text-primary" /> : null}
        </div>
      </div>
      {/* MODAL */}
      <DynamicCommunicationDetailReviewSubmitModal
        projectId={projectId}
        modalRef={reviewSubmitModal}
        submitCallback={refetch}
      />
      <React.Suspense>
        <DynamicCommunicationDetailReviewModal
          uuid={selectedReviewId}
          modalRef={reviewModalRef}
        />
      </React.Suspense>
    </section>
  );
};

export default ReviewBox;
