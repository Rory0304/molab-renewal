"use client";

import React from "react";
import Image from "next/image";
import { fetchAllNotice } from "src/app/api/notice";
import { useQuery } from "@tanstack/react-query";
import { Row } from "src/types/supabase";
import { NoticeCategory } from "src/types/notice";
import Link from "next/link";

interface NoticeCardProps extends Row<"Notice"> {}

//
// If larger than `md`, then show `vertical` card, else show `horizontal`
//
const NoticeCard: React.FC<NoticeCardProps> = ({
  id,
  thumbnail,
  title,
  category,
  content,
}) => {
  return (
    <Link href={`/notice/${id}`}>
      <div className="flex flex-col items-center overflow-hidden bg-white shadow-lg cursor-pointer md:flex-row rounded-xl">
        <div className="relative pt-[50%] md:pt-[30%] w-full md:w-[30%]">
          {thumbnail ? (
            <Image
              fill
              src={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/notice_thumbnail${thumbnail}`}
              alt={`${title} 공고 썸네일`}
              style={{
                objectFit: "cover",
              }}
            />
          ) : null}
        </div>
        <div className="flex flex-col py-6 pl-6 pr-8 w-full md:w-[70%]">
          <em className="text-sm not-italic color text-neutral-500">
            {NoticeCategory[category ?? "Etc"]}
          </em>
          <strong className="pt-1 text-lg">{title}</strong>
          <p className="pt-1 text-neutral-600 line-clamp-3">{content}</p>
        </div>
      </div>
    </Link>
  );
};

const MainNoticeList: React.FC = () => {
  const { data: noticeList } = useQuery({
    queryKey: ["noticeList"],
    queryFn: async () =>
      await fetchAllNotice({
        keyword: "",
        category: "",
        ascending: true,
        offset: 0,
        pageCount: 8,
      }).then((res) => res.data),
  });

  return (
    <div className="flex flex-col gap-8">
      {noticeList?.map((notice, index) => (
        <NoticeCard key={index} {...notice} />
      ))}
    </div>
  );
};

export default MainNoticeList;
