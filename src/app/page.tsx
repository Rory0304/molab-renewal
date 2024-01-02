import {
  HydrateMainNoticeList,
  HydrateMainReviewList,
  MainAboutLivingLabBanner,
  MainBanner,
  MainCommunicationList,
} from 'src/components/pages';

const MainPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="content-layout py-12 flex flex-col justify-between lg:flex-row">
        <section className="w-full lg:w-[800px] lg:mb-0 mb-10 lg:mr-8 mr-0">
          <MainBanner />
          <HydrateMainNoticeList />
          <MainCommunicationList />
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
