import React from "react";

interface GlobalMainProps {
  children: React.ReactNode;
}

const GlobalMain: React.FC<GlobalMainProps> = ({ children }) => {
  return <main className="w-full min-h-[80vh]">{children}</main>;
};

export default GlobalMain;
