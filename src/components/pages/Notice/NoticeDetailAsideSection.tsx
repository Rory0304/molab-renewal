import React from "react";
import Image from "next/image";

export interface NoticeDetailAsideSectionProps {
  thumbnailSrc: string;
  startDate: string;
  endDate: string;
  registration?: string;
  contact: {
    email: string;
    phone: string;
  };
}

const NoticeDetailAsideSection: React.FC<NoticeDetailAsideSectionProps> = ({
  thumbnailSrc,
  startDate,
  registration,
  endDate,
  contact,
}) => {
  return (
    <aside className="w-full md:w-[380px]">
      {/* Poster Area */}
      <div className="relative mb-9 pt-[85%] w-full">
        <Image
          fill
          sizes="300/275"
          alt="poster"
          src={thumbnailSrc}
          style={{ objectFit: "cover" }}
        />
      </div>
      {/* Notice Date Area */}
      <div className="mb-9">
        <h3 className="mb-3 text-xl font-bold text-neutral-600">접수 기간</h3>
        <div>
          <p className="text-lg font-light">
            {startDate} ~ {endDate}
          </p>
        </div>
      </div>
      {/* Notice Registration Area*/}
      <div className="mb-9">
        <h3 className="mb-3 text-xl font-bold text-neutral-600">접수 방법</h3>
        <div className="text-lg font-light">
          <p>{registration || "--"}</p>
        </div>
      </div>
      {/* Contact Area */}
      <div>
        <h3 className="mb-3 text-xl font-bold text-neutral-600">
          주최자 연락처
        </h3>
        <div className="p-5 text-lg font-light bg-gray-100">
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
        </div>
      </div>
    </aside>
  );
};

export default NoticeDetailAsideSection;
