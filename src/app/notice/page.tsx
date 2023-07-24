import React from "react";
import { NoticeCard } from "src/components/blocks";
import { NoticeBanner } from "src/components/pages/Notice";
import { supabase } from "src/utils/supabase";

type CategoryType = {
  title: string;
  key: "all" | "environment" | "traffic" | "energy" | "welfare";
};

const LIVING_LAB_CATEGORY: CategoryType[] = [
  {
    title: "전체",
    key: "all",
  },
  { title: "환경", key: "environment" },
  { title: "교통", key: "traffic" },
  { title: "에너지", key: "energy" },
  { title: "복지", key: "welfare" },
];

const NoticePage: React.FC = async () => {
  let { data: noticeList, error } = await supabase
    .from("Notice")
    .select("*")
    .range(0, 9);

  return (
    <div className="w-full">
      <NoticeBanner />
      <div className="container max-w-screen-xl py-8 mx-auto">
        {/* NOTICE CATEGORY LIST */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="pb-6 min-w-[50%]">
            <input
              type="text"
              placeholder="제목 혹은 주변 지역을 검색해보세요"
              className="w-full input input-bordered input-primary"
            />
          </div>
          <div>
            <ul className="join gap-x-3">
              {LIVING_LAB_CATEGORY.map((category) => (
                <li key={category.key}>
                  <button
                    type="button"
                    //before:bg-${category.key}Icon
                    className={`btn btn-outline btn-neutral rounded-[30px] before:bg-100% before:bg-no-repeat	before:inline-block before:w-6 before:h-6 `}
                  >
                    <span>{category.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* NOTICE FILTER OPTIONS */}
        <div className="py-8">
          <ul className="justify-end w-full join gap-x-4">
            <li>
              <button className="pl-4 relative before:bg-black before:absolute before:top-[8px] before:left-0 before:inline-block before:w-2 before:h-2 before:rounded-[1.5rem]">
                추천순
              </button>
            </li>
            <li>
              <button>최신순</button>
            </li>
            <li>
              <button>모집완료</button>
            </li>
          </ul>
        </div>
        {/* NOTICE LIST */}
        <div>
          <ul className="grid grid-cols-3 gap-6">
            {noticeList?.map((card) => (
              <li>
                <NoticeCard {...card} variant="vertical" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
