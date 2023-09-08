import React from "react";

interface OverlayLoadingProps {
  title?: string;
  description?: string;
}

const OverlayLoading: React.FC<OverlayLoadingProps> = ({
  title,
  description,
}) => {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-gray-200 opacity-80">
      <span className="loading loading-dots loading-lg text-primary"></span>
      {title ? (
        <h2 className="text-xl font-semibold text-center">{title}</h2>
      ) : null}
      {description ? <p className="w-1/3 text-center ">{description}</p> : null}
    </div>
  );
};

export default OverlayLoading;
