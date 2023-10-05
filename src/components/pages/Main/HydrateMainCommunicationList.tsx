import React from "react";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import getQueryClient from "src/utils/queryClient";
import { fetchProposeList } from "src/app/api/propose";
import MainCommunicationList from "./MainCommunicationList";

const HydrateMainCommunicationList: React.FC = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["communicationList"],
    async () =>
      await fetchProposeList({
        offset: 0,
        pageCount: 3,
        siDo: "",
        siGunGu: "",
      }).then((res) => res.data)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MainCommunicationList />
    </Hydrate>
  );
};

export default HydrateMainCommunicationList;
