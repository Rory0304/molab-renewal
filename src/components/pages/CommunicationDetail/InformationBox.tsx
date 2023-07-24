"use client";

import React from "react";
import Image from "next/image";
import { Row } from "src/types/supabase";

interface InformationBoxProps
  extends Pick<
    Row<"Propose">,
    "title" | "thumbnail" | "siDo" | "siGunGu" | "projectStatus"
  > {}

const InformationBox: React.FC<InformationBoxProps> = ({
  title,
  thumbnail,
  projectStatus,
  siDo,
  siGunGu,
}) => {
  return (
    <section className="flex flex-col">
      <div>
        <h3 className="order-2 text-3xl font-bold text-neutral-600">{title}</h3>
        <div>
          <div className="flex order-1 pb-4">
            <div className="mr-1 badge badge-primary badge-lg">
              {projectStatus}
            </div>
            <div className="badge badge-neutral badge-outline badge-lg">
              {siDo + " " + siGunGu}
            </div>
          </div>
          <div>
            {/* project image */}
            {/* <p>{author.name}</p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InformationBox;
