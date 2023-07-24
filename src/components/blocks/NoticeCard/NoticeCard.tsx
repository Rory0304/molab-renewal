"use client";

import React from "react";
import Image from "next/image";
import { Row } from "src/types/supabase";
import { getNoticeStatus } from "src/utils/notice";
import { NoticeStatus } from "src/types/notice";
import { calculateDaysLeft } from "src/utils/date";

type NoticeCardVaraintType = "horizontal" | "vertical";

export interface NoticeCardProps extends Row<"Notice"> {
  variant: NoticeCardVaraintType;
}

const NoticeCard: React.FC<NoticeCardProps> = ({
  variant,
  title,
  category,
  content,
  thumbnail,
  end_at,
}) => {
  const noticeStatus = getNoticeStatus(new Date(end_at as string));

  const renderNoticeStatusBadge = (date: Date, noticeStatus: NoticeStatus) => {
    switch (noticeStatus) {
      case NoticeStatus.ONGOING:
        const daysLeft = calculateDaysLeft(date);
        return (
          <span className="absolute z-10 font-semibold tracking-wide top-4 right-4 badge badge-outline badge-info badge-lg opacity-90">
            D-{daysLeft}
          </span>
        );

      case NoticeStatus.D_DAY:
        return (
          <span className="absolute z-10 font-semibold tracking-wide badge-error top-4 right-4 badge-ghost badge badge-lg opacity-90">
            D-Day
          </span>
        );

      case NoticeStatus.ENDED:
        return (
          <span className="absolute z-10 font-semibold tracking-wide top-4 right-4 badge-ghost badge badge-lg opacity-90">
            모집 완료
          </span>
        );

      default:
        return null;
    }
  };

  if (variant === "horizontal") {
    return (
      <div className="flex items-center bg-white shadow-lg cursor-pointer rounded-xl">
        <div className="w-[250px]">
          {thumbnail ? (
            <Image
              src={thumbnail}
              width={250}
              height={250}
              alt={`${title} 공고 썸네일`}
              style={{
                maxWidth: "250px",
                objectFit: "cover",
              }}
            />
          ) : null}
        </div>
        <div className="flex flex-col px-6 pl-6">
          <em className="text-sm not-italic color text-neutral-500">
            {category}
          </em>
          <strong className="pt-1 text-lg">{title}</strong>
          <p className="pt-1 text-neutral-600 line-clamp-3">{content}</p>
        </div>
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div
        className={`relative flex flex-col items-center overflow-hidden bg-white border border-gray-300 border-solid cursor-pointer rounded-xl ${
          noticeStatus === NoticeStatus.ENDED ? "after:card-overlay" : ""
        }`}
      >
        <div className="relative w-full h-56">
          {renderNoticeStatusBadge(new Date(end_at as string), noticeStatus)}
          {thumbnail ? (
            <Image
              fill
              src={thumbnail}
              alt={`${title} 공고 썸네일`}
              style={{ objectFit: "cover" }}
            />
          ) : null}
        </div>
        <div className="flex flex-col w-full px-5 py-6">
          <em className="text-sm not-italic color text-neutral-500">
            {category}
          </em>
          <strong className="pt-1 text-lg">{title}</strong>
        </div>
      </div>
    );
  }
};

export default NoticeCard;
