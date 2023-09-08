"use client";

import React from "react";
import Link from "next/link";
import { NoticeCard } from "src/components/blocks";
import { NoticeType } from "src/types/notice";

interface NoticeListProps {
  noticeList: NoticeType[];
}

const NoticeList: React.FC<NoticeListProps> = ({ noticeList }) => {
  return noticeList.map((card, index) => (
    <li key={index}>
      <Link href={`/notice/${card.id}`}>
        <NoticeCard {...card} variant="vertical" />
      </Link>
    </li>
  ));
};

export default NoticeList;
