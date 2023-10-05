"use client";

import React from "react";
import { AnimatePresence, Variants, m } from "framer-motion";

const ANIMATED_TEXT = ["우리 동네 🏘️", "우리 도시 🏙️", "우리 공동체 👩‍👩‍👦‍👦"];

const MainBanner: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const loop = setTimeout(() => {
      const next = index === ANIMATED_TEXT.length - 1 ? 0 : index + 1;
      setIndex(next);
    }, 3000);

    return () => clearTimeout(loop);
  }, [index, setIndex]);

  const variants: Variants = {
    enter: (direction) => {
      return {
        y: 20,
        opacity: 0,
      };
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        opacity: 0,
      };
    },
  };

  return (
    <div className="pb-8">
      <h3 className="relative pb-10 text-3xl font-bold">
        함께 만들어가는,
        <br />
        <AnimatePresence>
          <m.span
            key={index}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 800, damping: 200 },
              opacity: { duration: 0.2 },
            }}
            className="absolute bottom-0 left-0 mr-3 not-italic"
          >
            {ANIMATED_TEXT[index]}
          </m.span>
        </AnimatePresence>
      </h3>
    </div>
  );
};

export default MainBanner;
