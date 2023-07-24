import React from "react";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { MyProposeList } from "src/components/pages/MyProject";

const MyProjectPage: React.FC = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }

  return (
    <div className="w-full">
      <div className="py-20 border-b border-b-gray-300">
        <div className="container max-w-screen-xl mx-auto ">
          <h2 className="text-3xl font-bold">제안한 리빙랩 프로젝트</h2>
        </div>
      </div>
      <MyProposeList />
    </div>
  );
};

export default MyProjectPage;
