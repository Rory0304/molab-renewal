"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchProposeList } from "src/app/api/propose";
import { useQuery } from "@tanstack/react-query";
import Carousel from "src/components/blocks/Carousel/Carousel";
import type { ProjectContent } from "src/types/project";

interface MainCommunicationCardProps
  extends Pick<ProjectContent, "title" | "siDo" | "siGunGu"> {
  thumbnail: string;
  link: string;
}
const MainCommunicationCard: React.FC<MainCommunicationCardProps> = ({
  link,
  thumbnail,
  title,
  siDo,
  siGunGu,
}) => {
  return (
    <Link href={link} className="w-full">
      <div className="flex items-center w-full">
        <div className="relative pt-[30%]  w-[30%]">
          <Image
            fill
            src={thumbnail}
            alt={`${title} 열린 참여 썸네일`}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex flex-col  py-6 pl-6 pr-8 w-[70%]">
          <span className="pb-1 text-sm text-neutral-500">열린 참여</span>
          <strong className="pb-4 text-xl font-bold text-white">{title}</strong>
          <span className="px-2 text-sm border rounded-md w-fit border-primary text-primary">
            {siDo} {siGunGu}
          </span>
        </div>
      </div>
    </Link>
  );
};

const MainCommunicationList: React.FC = () => {
  const { data: communicationList } = useQuery({
    queryKey: ["communicationList"],
    queryFn: async () =>
      await fetchProposeList({
        offset: 0,
        pageCount: 3,
        siDo: "",
        siGunGu: "",
      }),
  });

  return (
    <div className="overflow-hidden bg-zinc-900 rounded-xl">
      <Carousel paginationVariant="slider">
        {communicationList?.map((item) => (
          <li className="w-full cursor-pointer carousel-item">
            <MainCommunicationCard
              link={`/communication/${item.uuid}`}
              title={item.title}
              thumbnail={
                `${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/propose_thumbnail/${item.thumbnail}` ??
                ""
              }
              siDo={item.siDo ?? ""}
              siGunGu={item.siGunGu ?? ""}
            />
          </li>
        ))}
      </Carousel>
    </div>
  );
};

export default MainCommunicationList;
