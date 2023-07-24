import React from "react";
import Link from "next/link";

const AboutLivingLabBanner: React.FC = () => {
  return (
    <div className="w-auto rounded-xl">
      <Link
        href="/main"
        style={{
          overflow: "hidden",
          display: "block",
          paddingBottom: "56.72%",
          background:
            "url('/point.png') calc(100% - 25px) 100% / 120px 120px no-repeat #172945",
          borderRadius: "0.75rem",
          height: 0,
        }}
      >
        <div className="px-8 py-8">
          <strong className="pt-2 text-lg text-white">
            {'살아있는 실험실,\n"리빙랩"을 알아보세요'}
          </strong>
          <p className="text-slate-400">#시민 #도시문제해결</p>
        </div>
      </Link>
    </div>
  );
};

export default AboutLivingLabBanner;
