import {
  MainBanner,
  MainAboutLivingLabBanner,
  HydrateMainReviewList,
  HydrateMainNoticeList,
  HydrateMainCommunicationList,
} from "src/components/pages";

const MainPage: React.FC = () => {
  return (
    <div className="content-layout">
      <div className="flex flex-col justify-between my-12 lg:flex-row">
        <section className="w-full lg:w-[800px] lg:mb-0 mb-10 lg:mr-8 mr-0">
          <MainBanner />
          <HydrateMainNoticeList />
          <HydrateMainCommunicationList />
        </section>
        <section className="w-full lg:w-[370px]">
          <HydrateMainReviewList />
          <MainAboutLivingLabBanner />
        </section>
      </div>
    </div>
  );
};

export default MainPage;
