import React from "react";
import Image from "next/image";

interface SpeachItemBoxProps {
  title: string;
  content: string;
  thumbnailSrc?: string;
}

interface SpeachBoxProps {
  items?: SpeachItemBoxProps[];
  preview?: boolean;
}

const SpeachItemBox: React.FC<SpeachItemBoxProps> = ({
  title,
  content,
  thumbnailSrc,
}) => {
  return (
    <div className="flex justify-between gap-4 p-2 border border-gray-200">
      <div>
        <strong>{title}</strong>
        <p className="line-clamp-2">{content}</p>
      </div>
      {thumbnailSrc ? (
        <div>
          <Image
            src={thumbnailSrc}
            alt={`참여 인증-${title}`}
            width={150}
            height={150}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

const SpeachBox: React.FC<SpeachBoxProps> = ({ items, preview = false }) => {
  const renderSpeachBoxContent = (
    preview: boolean,
    items?: SpeachItemBoxProps[]
  ) => {
    if (preview)
      return (
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          미리보기에서는 참여 인증을 볼 수 없습니다.
        </p>
      );

    return items?.length === 0 ? (
      <p>아직 참여한 유저가 없습니다.</p>
    ) : (
      items?.map((item, index) => (
        <SpeachItemBox key={`speach-item-${index}`} {...item} />
      ))
    );
  };

  return (
    <section>
      <h4 className="mb-4 text-2xl font-semibold text-neutral-600">
        참여 인증
      </h4>
      <div className="flex items-center justify-center h-40 p-4 border rounded-lg border-neutral-300">
        {renderSpeachBoxContent(preview, items)}
      </div>
    </section>
  );
};

export default SpeachBox;
