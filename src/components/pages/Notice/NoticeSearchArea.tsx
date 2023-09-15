"use client";

import React from "react";
import { useIntersection, useUpdateEffect } from "react-use";

import { useInfiniteQuery } from "@tanstack/react-query";
import { NoticeCategory, NoticeSort, SortOptionType } from "src/types/notice";
import {
  DeferredLoading,
  LoadingNoticeCard,
  ErrorBox,
} from "src/components/blocks";
import { useDebounce } from "react-use";
import { fetchAllNotice } from "src/app/api/notice";
import NoticeList from "./NoticeList";

import TruckIcon from "@heroicons/react/20/solid/TruckIcon";
import BoltIcon from "@heroicons/react/20/solid/BoltIcon";
import UserGroupIcon from "@heroicons/react/20/solid/UserGroupIcon";
import GlobeAsiaAustraliaIcon from "@heroicons/react/20/solid/GlobeAsiaAustraliaIcon";

const COUNT_PER_NOTICE = 8;

const NOTICE_CATEGORY_ICON: Record<
  keyof typeof NoticeCategory,
  React.ReactElement
> = {
  Environmnet: <GlobeAsiaAustraliaIcon width={20} height={20} />,
  Traffic: <TruckIcon width={20} height={20} />,
  Welfare: <UserGroupIcon width={20} height={20} />,
  Energy: <BoltIcon width={20} height={20} />,
};

const NoticeSearchArea: React.FC = () => {
  const lastNoticeItemRef = React.useRef<HTMLDivElement>(null);

  // Search State (keyword, category, sort)
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedSortOption, setSelectedSortOption] =
    React.useState<SortOptionType>("desc");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] =
    React.useState("");

  //
  // Check if communication list fully intersected
  //
  const lastNoticeItemObserver = useIntersection(lastNoticeItemRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  });

  const isIntersecting = Boolean(lastNoticeItemObserver?.isIntersecting);

  //
  // Debounced keyword search
  //
  useDebounce(() => setDebouncedSearchKeyword(searchKeyword), 200, [
    searchKeyword,
  ]);

  const {
    data,
    hasNextPage,
    isError,
    isSuccess,
    isFetching,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery(
    [
      "fetch-notice-list",
      debouncedSearchKeyword,
      selectedCategory,
      selectedSortOption,
    ],
    async ({ pageParam = 0 }) =>
      await fetchAllNotice({
        keyword: debouncedSearchKeyword,
        category: selectedCategory === "All" ? "" : selectedCategory,
        ascending: selectedSortOption === "asc",
        offset: pageParam,
        pageCount: COUNT_PER_NOTICE,
      }),
    {
      retry: 3,
      getNextPageParam: (lastPage, list) => {
        const offset = list.length * COUNT_PER_NOTICE;
        return lastPage.data.length === 0 ? undefined : offset;
      },
      select: (data) => ({
        pages: data?.pages.flatMap((page) => page.data),
        pageParams: data.pageParams,
      }),
    }
  );

  const noticeList = data?.pages ?? [];

  useUpdateEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  return (
    <div className="py-8 content-layout">
      {/* NOTICE CATEGORY AND SEARCH INPUT */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="pb-6 w-full md:w-[620px]">
          <input
            type="text"
            placeholder="주변 지역을 검색해보세요"
            className="w-full input input-bordered"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className="flex justify-center w-full">
          <ul className="overflow-scroll join gap-x-3 scrollbar-hide">
            {Object.keys(NoticeCategory).map((category) => (
              <li key={category} className="grow-0 shrink-0">
                <button
                  type="button"
                  className={`btn btn-outline ${
                    category === selectedCategory ? "btn-active" : "btn-neutral"
                  } rounded-[30px] min-w-[85px] flex`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {NOTICE_CATEGORY_ICON[category] ? (
                    <span>{NOTICE_CATEGORY_ICON[category]}</span>
                  ) : null}
                  {NoticeCategory[category]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* NOTICE FILTER OPTIONS */}
      <div className="py-8">
        <ul className="justify-end w-full join gap-x-4">
          {Object.keys(NoticeSort).map((sort) => (
            <li key={sort}>
              <button
                className={`before:small-circle before:mt-[0.52em] before:mr-[0.62em] before:w-2 before:h-2 ${
                  selectedSortOption === sort
                    ? "text-primary before:bg-primary"
                    : "text-gray-800 before:bg-gray-800"
                }`}
                onClick={() => setSelectedSortOption(sort as SortOptionType)}
              >
                {NoticeSort[sort as SortOptionType]}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* NOTICE LIST */}
      <div>
        {isError ? (
          <ErrorBox
            title="데이터를 가져오는데 실패했습니다."
            description="잠시후 다시 시도하거나, mitty0304@naver.com 으로 오류 보고를 해주세요."
            onRefetch={refetch}
          />
        ) : null}
        {isSuccess && noticeList.length === 0 ? (
          <div className="w-full py-12 text-center">
            <strong>검색 결과가 없습니다.</strong>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              <NoticeList noticeList={noticeList} />
              {isFetching ? (
                <DeferredLoading timedOut={200}>
                  {[...Array(COUNT_PER_NOTICE)].map((_, index) => (
                    <LoadingNoticeCard key={`loading-notice-card-${index}`} />
                  ))}
                </DeferredLoading>
              ) : null}
            </ul>
            <div ref={lastNoticeItemRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default NoticeSearchArea;
