"use client";

import React from "react";
import { Variants } from "framer-motion";

const MainBanner: React.FC = () => {
  const animatedText = ["우리 동네,", "우리 도시,", "우리 공동체"];

  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.12 * i,
      },
    }),
  };

  const textVariants: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="mb-8">
      <h3 className="text-3xl font-bold">
        함께 만들어가는,
        <div>
          {animatedText.map((text, index) => (
            <span key={index} className="mr-2">
              {text}
            </span>
          ))}
        </div>
        {/* <motion.div
          initial="hidden"
          animate="visible"
          variants={textContainerVariants}
        >
          {animatedText.map((text, index) => (
            <motion.span key={index} variants={textVariants} className="mr-2">
              {text}
            </motion.span>
          ))}
        </motion.div> */}
      </h3>
    </div>
  );
};

export default MainBanner;
