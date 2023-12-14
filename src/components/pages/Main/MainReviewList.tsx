"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import Carousel from "src/components/blocks/Carousel/Carousel";
import { useQuery } from "@tanstack/react-query";
import { fetchReviewList } from "src/app/api/review";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { molabApi } from "src/utils/supabase";

const DynamicCommunicationDetailReviewModal = dynamic(
  () =>
    import(
      `src/components/pages/CommunicationDetail/CommunicationDetailReviewModal`
    )
);

interface ReviewCardProps {
  content: string;
  thumbnail?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ content, thumbnail }) => {
  return (
    <div className="w-full">
      {thumbnail ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/review_thumbnail/${thumbnail}`}
          alt={`참여 인증-사진`}
          width={150}
          height={150}
          style={{
            objectFit: "cover",
          }}
        />
      ) : null}
      <p className="line-clamp-3">{content}</p>
    </div>
  );
};

const MainReviewList: React.FC = () => {
  const supabaeClient = createClientComponentClient();
  const reviewModalRef = React.useRef<HTMLDialogElement>(null);
  const [selectedReviewId, setSelectedReviewId] = React.useState("");

  // This useQuery could just as well happen in some deeper child to
  // the "HydratedPosts"-component, data will be available immediately either way
  const { data } = useQuery({
    queryKey: ["reviewList"],
    queryFn: async () =>
      await molabApi.molabApiFetchReviewList(supabaeClient)({
        select: `thumbnail, content, uuid`,
        offset: 0,
        pageCount: 3,
      }),
  });

  //
  //
  //
  const handleDetailReviewModalOpen = () => {
    if (reviewModalRef.current) {
      reviewModalRef.current.showModal();
    }
  };

  return (
    <div className="px-8 py-8 mb-8 bg-white border-gray-500 shadow-lg rounded-xl">
      <h4 className="mb-3 text-sm font-medium text-gray-400 ">참여 후기</h4>
      <Carousel>
        {data?.map((card, index) => (
          <li
            key={`review-${index}`}
            className="w-full cursor-pointer carousel-item"
          >
            <div
              className="w-full"
              onClick={() => {
                setSelectedReviewId(card?.uuid ?? "");
                handleDetailReviewModalOpen();
              }}
            >
              <ReviewCard content={card.content ?? ""} />
            </div>
          </li>
        ))}
      </Carousel>
      <React.Suspense>
        <DynamicCommunicationDetailReviewModal
          uuid={selectedReviewId}
          modalRef={reviewModalRef}
        />
      </React.Suspense>
    </div>
  );
};

export default MainReviewList;
