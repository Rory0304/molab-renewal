import React from "react";
import Link from "next/link";

const Banner: React.FC = () => {
  return (
    <div
      className="flex flex-col justify-center w-full h-72"
      style={{
        background:
          "url('/idea-1.svg') 85% 50% / 300px 200px no-repeat, url('/idea-2.svg') 20% 50% / 200px 200px no-repeat rgb(241 245 249 / 1)",
      }}
    >
      <div className="text-center">
        <h3 className="pb-2 text-3xl font-bold ">열린 참여</h3>
        <p className="whitespace-pre-wrap">
          {
            "자신이 살고 있는 도시를 더 발전시키고 싶나요?\n당신의 아이디어를 지역 사회에 공유해보세요"
          }
        </p>
        <Link
          href="/project/base"
          className="mt-8 min-w-[150px] rounded-3xl btn btn-active btn-primary"
        >
          제안하기
        </Link>
      </div>
    </div>
  );
};

export default Banner;
