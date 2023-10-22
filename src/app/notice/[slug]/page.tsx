import React from "react";
import { fetchNoticeById } from "src/app/api/notice";
import {
  NoticeDetailHeaderInfoSection,
  NoticeDetailInfoSection,
  NoticeDetailAsideSection,
} from "src/components/pages/Notice";
import { NoticeCategory } from "src/types/notice";

import type { NoticeDetailAsideSectionProps } from "src/components/pages/Notice/NoticeDetailAsideSection";

export const dynamic = "force-dynamic";

const NoticeDetailPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const noticeId = params.slug;

  const noticeData = await fetchNoticeById(noticeId).then((res) => res.data);

  return (
    <div className="py-16 content-layout">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="w-[950px] max-w-full md:pr-12">
          <NoticeDetailHeaderInfoSection
            title={noticeData.title}
            category={
              NoticeCategory[
                (noticeData.category as keyof typeof NoticeCategory) ?? "Etc"
              ]
            }
            area={noticeData.area}
          />
          <NoticeDetailInfoSection
            content={noticeData.content}
            attachmentFile={noticeData.attachmentFile}
          />
        </div>
        <NoticeDetailAsideSection
          thumbnailSrc={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/notice_thumbnail${noticeData.thumbnail}`}
          startDate={noticeData.startDate}
          endDate={noticeData.endDate}
          registration={noticeData.registration}
          contact={
            noticeData.contact as NoticeDetailAsideSectionProps["contact"]
          }
        />
      </div>
    </div>
  );
};

export default NoticeDetailPage;
