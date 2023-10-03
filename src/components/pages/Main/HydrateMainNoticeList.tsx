import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "src/utils/queryClient";
import { fetchAllNotice } from "src/app/api/notice";
import MainNoticeList from "./MainNoticeList";

const HydrateMainReviewList: React.FC = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["noticeList"],
    async () =>
      await fetchAllNotice({
        keyword: "",
        category: "",
        ascending: true,
        offset: 0,
        pageCount: 4,
      }).then((res) => res.data)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MainNoticeList />
    </Hydrate>
  );
};

export default HydrateMainReviewList;
