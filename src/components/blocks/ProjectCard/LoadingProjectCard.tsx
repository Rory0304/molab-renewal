import React from 'react';

const LaodingProjectCard: React.FC = () => {
  return (
    <div className="bg-white animate-pulse rounded-xl">
      <div className="relative pt-[70%]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl bg-slate-200 first-letter:rounded-xl" />
      </div>
      <div className="flex flex-col py-4">
        <div className="w-9/12 h-[28px] mb-2 bg-slate-200" />
        <div className="w-2/4 h-5 bg-slate-200" />
      </div>
    </div>
  );
};

export default LaodingProjectCard;
