"use client";

import React from "react";
import { AuthContext } from "src/context/AuthProvider";
import { useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import { enqueueSnackbar } from "notistack";
import { molabApi } from "src/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CommunicationBanner: React.FC = () => {
  const router = useRouter();
  const supabaeClient = createClientComponentClient();

  const { authorized, userInfo } = React.useContext(AuthContext);

  const [isLoading, setIsLoading] = React.useState(false);

  /**
   *
   */
  const handleProposeBtnClick = async () => {
    if (!authorized || !userInfo) {
      return router.push("/login");
    }

    try {
      setIsLoading(true);
      const id = uuidV4();
      await molabApi.molabApiCreatePropose(supabaeClient)(id, userInfo?.id).then((data) => {
        if (data) {
          router.push(`/project/${id}/base`);
          setIsLoading(false);
        }
      });
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar(
        "프로젝트 생성에 실패했습니다. 잠시후 다시 시도해주세요",
        { variant: "error" }
      );
    }
  };

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
        <button
          className="mt-8 min-w-[150px] rounded-3xl btn btn-active btn-primary"
          onClick={handleProposeBtnClick}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "제안하기"
          )}
        </button>
      </div>
    </div>
  );
};

export default CommunicationBanner;
