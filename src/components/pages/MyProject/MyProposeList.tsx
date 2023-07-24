"use client";

import React from "react";
import { fetchMyProposeList } from "src/app/api/propose";
import Pagination from "src/components/blocks/Pagination/Pagination";
import { useAuth } from "src/context/auth-context";
import Image from "next/image";
import Link from "next/link";

import type { Row } from "src/types/supabase";
import { EyeSlashIcon, EyeIcon } from "src/components/icons";

const COUNT_PER_PROPOSE = 8;

interface MyProposeCardProps extends Row<"Propose"> {}

const MyProposeCard: React.FC<MyProposeCardProps> = ({
  uuid,
  title,
  thumbnail,
  isOpen,
}) => {
  return (
    <div className="overflow-hidden bg-white rounded-xl">
      <div className="relative min-h-[225px]">
        {thumbnail ? (
          <Image
            fill
            src={`https://xmkqclhjjvshhgohnwrg.supabase.co/storage/v1/object/public/propose_thumbnail/${thumbnail}`}
            alt={title}
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
          <h4 className="order-2 mb-2 text-lg font-bold">{title || "무제"}</h4>
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
  );
};

const MyProposeList: React.FC = () => {
  const { userInfo } = useAuth();

  const [page, setPage] = React.useState(0);
  const [proposeListTotal, setProposeListTotal] = React.useState(0);
  const [proposeList, setProposeList] = React.useState<MyProposeCardProps[]>(
    []
  );

  const offset = (page - 1) * COUNT_PER_PROPOSE + 1;

  React.useEffect(() => {
    (async () => {
      try {
        if (userInfo) {
          const { data, count } = await fetchMyProposeList(
            userInfo.id,
            offset,
            COUNT_PER_PROPOSE
          );
          console.log(data);
          setProposeList(data ?? []);
          setProposeListTotal(count ?? 0);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page]);

  const renderProposeList = () => {
    if (proposeList.length === 0) {
      return (
        <div className="text-center pt-28">아직 생성된 제안이 없습니다.</div>
      );
    }
    return (
      <div className="grid grid-cols-4 gap-x-6">
        {proposeList.map((item, index) => (
          <MyProposeCard key={`propose-list=${index}`} {...item} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full pt-10 pb-40 bg-gray-50">
      <div className="container max-w-screen-xl mx-auto">
        {/* PropsoeList */}
        {renderProposeList()}
        {/* Pagination */}
        {proposeList.length > 0 ? (
          <Pagination
            page={page}
            total={proposeListTotal}
            count={COUNT_PER_PROPOSE}
            onPageChange={(page: number) => setPage(page)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MyProposeList;
