import React from "react";
import Link from "next/link";

interface ReviewCardProps {
  title: string;
  content: string;
  link: string;
}

const MOCK_DATA: ReviewCardProps[] = [
  {
    title: "한강 쓰레기 수거 후기",
    content:
      "한강 쓰레기 수거 후기 한강 쓰레기 수거 후기 한강 쓰레기 수거 후기 한강 쓰레기 수거 후기 한강 쓰레기 수거 후기",
    link: "",
  },
  {
    title: "한강 쓰레기 수거 후기",
    content:
      "한강 쓰레기 수거 후기 한강 쓰레기 수거 후기 한강 쓰레기 수거 후기 한강 쓰레기 수거 후기 한강 쓰레기 수거 후기",
    link: "",
  },
  {
    title: "한강 쓰레기 수거 후기",
    content:
      "한강 쓰레기 수거 후기 한강 쓰레기 수거 후기 한강 쓰레기 수거 후기 한강 쓰레기 수거 후기 한강 쓰레기 수거 후기",
    link: "",
  },
];

const ReviewCard: React.FC<ReviewCardProps> = ({ title, content, link }) => {
  return (
    <Link href={link}>
      <div className="cursor-pointer">
        <strong className="pb-2 text-lg">{title}</strong>
        <p>{content}</p>
      </div>
    </Link>
  );
};

const ReviewList: React.FC = () => {
  return (
    <div className="px-8 py-8 mb-8 bg-white border-gray-500 shadow-lg rounded-xl">
      <h4 className="mb-3 text-sm font-medium text-gray-400 ">참여 후기</h4>
      <div className="w-full carousel">
        {MOCK_DATA.map((card, index) => (
          <div id={`review-${index}`} className="w-full carousel-item">
            <ReviewCard {...card} />
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full gap-2 pt-5">
        {MOCK_DATA.map((_, index) => (
          <Link href={`#review-${index}`} className="btn btn-xs">
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
