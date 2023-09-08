"use client";

import React from "react";
import { useIntersection, useUpdateEffect } from "react-use";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AreaSelectInput, ErrorBox } from "src/components/blocks";
import { fetchProposeList } from "src/app/api/propose";
import { DeferredLoading } from "src/components/blocks";

const LaodingProjectCard = React.lazy(
  () => import("src/components/blocks/ProjectCard/LoadingProjectCard")
);
const CommunicationList = React.lazy(() => import("./CommunicationList"));

//
//
//
const COUNT_PER_COMMUNCATION = 6;

//
//
//
const CommunicationSearchArea: React.FC = () => {
  const communicationListRef = React.useRef<HTMLDivElement>(null);

  const [selectedSido, setSelectedSido] = React.useState("");
  const [selectedSiGunGu, setSelectedSiGunGu] = React.useState("");

  //
  // Check if communication list fully intersected
  //
  const communicationListObserver = useIntersection(communicationListRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  });

  const isIntersecting = Boolean(communicationListObserver?.isIntersecting);

  //
  //
  //
  const {
    data,
    isError,
    hasNextPage,
    isSuccess,
    isFetching,
    refetch,
    fetchNextPage,
  } = useInfiniteQuery(
    ["fetch-propose-list", selectedSiGunGu, selectedSido],
    async ({ pageParam = 0 }) =>
      await fetchProposeList({
        offset: pageParam,
        pageCount: COUNT_PER_COMMUNCATION,
        siDo: selectedSido,
        siGunGu: selectedSiGunGu,
      }),
    {
      retry: 3,
      keepPreviousData: true,
      getNextPageParam: (lastPage, list) => {
        const offset = list.length + 1;
        return lastPage.data.length === 0 ? undefined : offset;
      },
      select: (data) => ({
        pages: data?.pages.flatMap((page) => page.data),
        pageParams: data.pageParams,
      }),
    }
  );

  const communicationList = data?.pages ?? [];

  useUpdateEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return (
    <div className="py-16 content-layout">
      <div className="pb-8">
        <h2 className="mb-5 text-2xl font-bold">
          🔍 주변 지역의 리빙랩 프로젝트를 찾아보세요.
        </h2>
        {/* Area Select */}
        <AreaSelectInput
          selectedSido={selectedSido}
          selectedSiGunGu={selectedSiGunGu}
          onSidoChange={setSelectedSido}
          onSiGunGuChange={setSelectedSiGunGu}
        />
      </div>
      {/* Communication List */}
      <div>
        {isError ? (
          <ErrorBox
            title="데이터를 가져오는데 실패했습니다."
            description="잠시후 다시 시도하거나, mitty0304@naver.com 으로 오류 보고를 해주세요."
            onRefetch={refetch}
          />
        ) : null}
        <div ref={communicationListRef}>
          {isSuccess && communicationList.length === 0 ? (
            <div className="w-full text-center">
              <strong>검색 결과가 없습니다.</strong>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {isSuccess ? (
                <CommunicationList communicationList={communicationList} />
              ) : null}
              {isFetching ? (
                <DeferredLoading timedOut={200}>
                  {[...Array(COUNT_PER_COMMUNCATION)].map((_, index) => (
                    <LaodingProjectCard key={index} />
                  ))}
                </DeferredLoading>
              ) : null}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationSearchArea;
