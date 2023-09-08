import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "src/utils/queryClient";
import { fetchReviewList } from "src/app/api/review";
import MainReviewList from "./MainReviewList";

const HydrateMainReviewList: React.FC = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["reviewList"],
    async () =>
      await fetchReviewList({
        select: "content",
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
