import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "src/utils/queryClient";
import { fetchReviewList } from "src/app/api/review";
import MainReviewList from "./MainReviewList";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { molabApi } from "src/utils/supabase";

const HydrateMainReviewList: React.FC = async () => {
  const supabaseClient = createClientComponentClient();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["reviewList"],
    async () =>
      await molabApi.molabApiFetchReviewList(supabaseClient)({
        select: `thumbnail, content, uuid`,
        offset: 0,
        pageCount: 3,
      })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MainReviewList />
    </Hydrate>
  );
};

export default HydrateMainReviewList;
