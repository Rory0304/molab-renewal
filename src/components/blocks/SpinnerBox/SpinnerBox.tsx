import React from "react";

interface SpinnerBoxProps {
  width?: string;
  height?: string;
  spinnerColor?: string;
}

const SpinnerBox: React.FC<SpinnerBoxProps> = ({
  width = "w-full",
  height = "h-full",
  spinnerColor,
}) => {
  return (
    <div className={`${width} ${height} flex justify-center items-center`}>
      <span className={`loading loading-spinner loading-lg ${spinnerColor}`} />
    </div>
  );
};

export default SpinnerBox;
