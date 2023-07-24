import React from "react";
import { NoticeCard, NoticeCardProps } from "src/components/blocks";

interface ReacentNoticeListProps {
  noticeList: NoticeCardProps[];
}

const RecentNoticeList: React.FC<ReacentNoticeListProps> = ({ noticeList }) => {
  return (
    <div className="flex flex-col gap-4">
      {noticeList.map((notice, index) => (
        <NoticeCard key={index} {...notice} variant="horizontal" />
      ))}
    </div>
  );
};

export default RecentNoticeList;
