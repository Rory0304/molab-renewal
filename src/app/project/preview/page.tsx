import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useSearchParams } from "next/navigation";
import { redirect, useParams } from "next/navigation";
import { fetchProposeById } from "src/app/api/propose";

import {
  CommunicationDetailInformationBox,
  CommunicationDetailHowToParticipationBox,
  CommunicationDetailProjectStepsBox,
  CommunicationDetailSpeachBox,
} from "src/components/pages";
import { ProjectContent } from "src/types";

const ProjectPreview: React.FC = async () => {
  const supabase = createServerComponentClient({ cookies });
  const searchParams = useSearchParams();

  const params = useParams();
  const projecetId = params.id ?? "";

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }

  if (!projecetId) {
    redirect("/myproject");
  }

  const projectData = await fetchProposeById(projecetId, user.id).then(
    (res) => res.data
  );

  return (
    <div className="relative w-full">
      <div className="sticky top-0 left-0 flex justify-center w-full p-5 text-center text-red-400 bg-red-100 border border-red-400">
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
        <strong className="pl-2">미리보기 모드입니다</strong>
      </div>
      <div className="container max-w-screen-xl mx-auto">
        <div className="flex justify-between w-full pt-10">
          <div className="w-[830px]">
            <CommunicationDetailInformationBox
              title={projectData.title}
              thumbnail={projectData.thumbnail}
              siDo={projectData.siDo}
              siGunGu={projectData.siGunGu}
              projectStatus={projectData.projectStatus}
            />
            <CommunicationDetailHowToParticipationBox
              content={
                (JSON.parse(projectData.howTo as string).content ??
                  "") as ProjectContent["howTo"]["content"]
              }
            />
            <CommunicationDetailProjectStepsBox
              contents={
                JSON.parse(
                  projectData.stepDetail as string
                ) as ProjectContent["stepDetail"]
              }
            />
          </div>
          <div className="w-96">
            <CommunicationDetailSpeachBox preview={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
