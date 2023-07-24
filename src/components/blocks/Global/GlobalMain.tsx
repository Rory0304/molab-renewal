import React from "react";

interface GlobalMainProps {
  children: React.ReactNode;
}

const GlobalMain: React.FC<GlobalMainProps> = ({ children }) => {
  return (
    <main className="flex flex-col items-center w-full min-h-screenflex">
      {children}
    </main>
  );
};

export default GlobalMain;
