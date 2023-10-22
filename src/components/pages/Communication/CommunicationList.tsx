"use client";

import React from "react";
import { Proposetype } from "src/app/api/propose";
import { ProjectCard } from "src/components/blocks";

interface CommunicationListProps {
  communicationList: Proposetype[];
}

const CommunicationList: React.FC<CommunicationListProps> = ({
  communicationList,
}) => {
  return (
    <>
      {communicationList.map((data, index) => (
        <li key={`communication-list-${index}`}>
          <ProjectCard
            link={`/communication/${data.uuid}`}
            title={data.title || "무제"}
            thumbnail={
              `${process.env.NEXT_PUBLIC_SUPABASE_STORE_URL}/public/propose_thumbnail/${data.thumbnail}` ??
              ""
            }
            startDate={data.startDate ?? ""}
            endDate={data.endDate ?? ""}
            siDo={data.siDo ?? ""}
            siGunGu={data.siGunGu ?? ""}
          />
        </li>
      ))}
    </>
  );
};

export default CommunicationList;
