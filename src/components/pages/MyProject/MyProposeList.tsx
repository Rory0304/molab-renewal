"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  SpinnerBox,
  DeferredLoading,
  Modal,
  ErrorBox,
} from "src/components/blocks";
import { useAuth } from "src/context/AuthProvider";
import Image from "next/image";
import Link from "next/link";

import type { Row } from "src/types/supabase";
import { EyeSlashIcon, EyeIcon } from "src/components/icons";
import { enqueueSnackbar } from "notistack";

import TrashIcon from "@heroicons/react/20/solid/TrashIcon";
import { isBrowser } from "src/utils/browser";
import { molabApi } from "src/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {Proposetype} from 'src/types/project';

const COUNT_PER_PROPOSE = 8;

interface MyProposeCardProps extends Proposetype {
  onModalOpen: () => void;
}

const MyProposeCard: React.FC<MyProposeCardProps> = ({
  uuid,
  title,
  thumbnail,
  isOpen,
  onModalOpen,
}) => {
  return (
    <div className="relative overflow-hidden bg-white group rounded-xl">
      <div>
        <button
          tabIndex={0}
          className="absolute z-10 hidden btn-sm btn btn-neutral top-4 right-4 group-hover:flex"
          onClick={onModalOpen}
        >
          <TrashIcon aria-hidden="true" width={16} height={16} />
          삭제
        </button>
        <div className="relative min-h-[225px]">
          {thumbnail ? (
            <Image
              fill
              src={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/propose_thumbnail/${thumbnail}`}
              alt={`${title} 의 썸네일`}
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <div className="flex justify-center items-center min-h-[225px] bg-gray-200">
              <span className="text-neutral-500">대표 이미지 등록 필요</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between p-4 h-[calc(100% - 225px)]">
          <div>
            <h4 className="order-2 mb-2 text-lg font-bold line-clamp-2">
              {title || "무제"}
            </h4>
            <p className="order-1 mb-6">
              {isOpen ? (
                <span className="flex items-center gap-2 text-sm text-neutral-500">
                  <EyeIcon />
                  공개
                </span>
              ) : (
                <span className="flex items-center gap-2 text-sm text-neutral-500">
                  <EyeSlashIcon />
                  비공개
                </span>
              )}
            </p>
          </div>
          <Link
            href={`/project/${uuid}/base`}
            className="btn-block btn btun-neutral"
          >
            수정하기
          </Link>
        </div>
      </div>
    </div>
  );
};

const MyProposeList: React.FC = () => {
  const supabaseClient = createClientComponentClient();
  const deleteModalRef = React.useRef<HTMLDialogElement>(null);
  const selectedProjectId = React.useRef<string>("");

  const { userInfo } = useAuth();

  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * COUNT_PER_PROPOSE;
  
  const { isError, data, refetch, isInitialLoading } = useQuery(
    ["fetch-my-propose-list", offset, userInfo],
    async () =>
      await molabApi.molabApiFetchMyProposeList(supabaseClient)(
        userInfo?.id ?? "",
        offset,
        COUNT_PER_PROPOSE
      ).then((res) => ({
        proposeList: res?.data,
        count: res?.count,
      })),
    {
      keepPreviousData: true,
    }
  );

  const proposeList = data?.proposeList ?? [];
  const total = data?.count ?? 0;

  React.useEffect(() => {
    if (isBrowser) window.scrollTo(0, 0);
  }, [page]);


  //
  //
  //
  const handleDeleteProject = async (uuid: string) => {
    try {
      await molabApi.molabApiDeleteProposeById(supabaseClient)(uuid);
      enqueueSnackbar("삭제되었습니다", { variant: "success" });

      if(proposeList.length === 1 && page > 1){
        setPage(page-1);
      }
      else{
        refetch();
      }
    } catch (err) {
      enqueueSnackbar("삭제에 실패했습니다", { variant: "error" });
    } finally {
      selectedProjectId.current = "";
      deleteModalRef?.current?.close();
    }
  };

  //
  //
  //
  const renderProposeList = () => {
    if (proposeList.length === 0) {
      return (
        <div className="w-full py-10 text-center">
          아직 생성된 제안이 없습니다.
        </div>
      );
    }
    return (
      <div className="grid w-full grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {proposeList.map((item, index) => (
          <MyProposeCard
            key={`propose-list=${index}`}
            {...item}
            onModalOpen={() => {
              deleteModalRef?.current?.showModal();
              selectedProjectId.current = item.uuid;
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-[500px] bg-gray-50 pt-10 pb-20">
      <div className="h-full content-layout">
        {/* PropsoeList */}
        {isError ? (
          <ErrorBox
            title="데이터를 가져오는데 실패했습니다."
            onRefetch={refetch}
          />
        ) : isInitialLoading ? (
          <DeferredLoading timedOut={200}>
            <SpinnerBox />
          </DeferredLoading>
        ) : (
          renderProposeList()
        )}
        {/* Pagination */}
        <Pagination
          page={page}
          total={total}
          count={COUNT_PER_PROPOSE}
          visiblePages={5}
          onPageChange={(value) => setPage(value)}
        />
      </div>
      <Modal
        ref={deleteModalRef}
        ModalBody={
          <div>
            <p>
              프로젝트를 삭제하시겠습니까?
              <br />
              프로젝트를 삭제하시면, 작성했던 모든 내용이 삭제됩니다.
            </p>
          </div>
        }
        ModalAction={
          <div>
            <button
              type="button"
              className="mr-1 btn btn-neutral"
              onClick={() => deleteModalRef?.current?.close()}
            >
              취소
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleDeleteProject(selectedProjectId.current);
              }}
            >
              확인
            </button>
          </div>
        }
      />
    </div>
  );
};

export default MyProposeList;
