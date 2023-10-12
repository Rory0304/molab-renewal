import React from "react";
import {
  CommunicationDetailInformationBox,
  CommunicationDetailHowToParticipationBox,
  CommunicationDetailProjectStepsBox,
  CommunicationDetailReviewBox,
} from "src/components/pages";

import { ProjectContent } from "src/types";
import { fetchProposeById } from "src/app/api/propose";

export const dynamic = "force-dynamic";

const CommunicationDetailPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const projectId = params.slug;
  const isPreview = searchParams?.["preview"] === "Y" ? true : false;

  const projectData = await fetchProposeById(projectId).then((res) => res.data);

  return (
    <div className="relative w-full pb-16">
      {isPreview ? (
        <div className="sticky top-0 left-0 z-50 flex justify-center w-full p-5 text-center text-red-400 bg-red-100 border border-red-400">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
              />
            </svg>
          </span>
          <p className="pl-2">미리보기 모드입니다</p>
        </div>
      ) : null}
      <div className="content-layout">
        <div className="flex flex-col justify-between w-full pt-10 md:flex-row">
          <div className="w-full md:w-[70%] mr-8">
            <CommunicationDetailInformationBox
              title={projectData.title}
              thumbnail={`${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/propose_thumbnail/${projectData.thumbnail}`}
              siDo={projectData.siDo}
              siGunGu={projectData.siGunGu}
              startDate={projectData.startDate}
              endDate={projectData.endDate}
            />
            <CommunicationDetailHowToParticipationBox
              content={
                (projectData.howTo as ProjectContent["howTo"])?.content ?? ""
              }
            />
            <CommunicationDetailProjectStepsBox
              content={projectData.stepDetail as ProjectContent["stepDetail"]}
            />
          </div>
          <div className="w-full md:w-[30%]">
            <CommunicationDetailReviewBox
              endDate={projectData.endDate ?? ""}
              projectId={projectData.uuid}
              preview={isPreview}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationDetailPage;
