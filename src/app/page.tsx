import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  MainBanner,
  MainRecentNoticeList,
  MainAboutLivingLabBanner,
  MainReviewList,
} from "src/components/pages";

import { supabase } from "src/utils/supabase";

export default async function Index() {
  // const supabase = createServerComponentClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  let { data: noticeList, error } = await supabase
    .from("Notice")
    .select("*")
    .range(0, 9);

  return (
    <div className="container flex flex-col justify-between w-full max-w-screen-xl">
      <section>
        <MainBanner />
      </section>
      <div className="flex flex-row justify-between my-8">
        <section className="w-[850px]">
          {noticeList ? <MainRecentNoticeList noticeList={noticeList} /> : null}
        </section>
        <section className="w-[370px]">
          <MainReviewList />
          <MainAboutLivingLabBanner />
        </section>
      </div>
    </div>
  );
}
