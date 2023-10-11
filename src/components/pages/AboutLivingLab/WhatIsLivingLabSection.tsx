"use client";

import React from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

const LIVING_LAB_SECTION_CARDS = [
  {
    imageUrl: "/research.png",
    description:
      "리빙랩은 사용자의 관점에서 삶에 실질적인 도움이 되는 연구를 말합니다.\n 다시 말해, 시민의 의견을 수용한 서비스 구현 방법론이 리빙랩이죠.",
  },
  {
    imageUrl: "/develop.svg",
    description:
      "도시문제를 해결하기 위해서는 도시의 실 사용자인 시민이 주체가 되어\n시민이 체감할 수 있는 서비스를 발굴함으로써,",
  },
  {
    imageUrl: "/better-life.svg",
    description:
      "시민들의 행복과 삶의 질을 향상하는 방향으로 초점을 맞춰야 합니다.",
  },
] as const;

const WhatIsLivingLabSection: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const sectionWrapperRef = React.useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = React.useState(0);
  const [viewportW, setViewportW] = React.useState(0);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    scrollRef.current && setScrollRange(scrollRef.current.scrollWidth);
  }, [scrollRef]);

  React.useEffect(() => {
    const handleWindowResize = () => {
      if (sectionWrapperRef.current) {
        setViewportW(sectionWrapperRef.current.clientWidth);
      }
    };

    window.addEventListener("scroll", handleWindowResize);

    return () => {
      window.removeEventListener("scroll", handleWindowResize);
    };
  }, []);

  // Ref: https://www.framer.com/motion/use-transform/##mapping
  // when motionValue triggers, Map 'x' into 'y' values
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [viewportW / 2, -scrollRange - viewportW * 3]
  );

  // Ref: https://www.framer.com/motion/transition
  // - damping: If set to 0, spring will oscillate indefinitely
  // - mass: Higher values will result in more lethargic movement
  // - stiffness: Higher values will create more sudden movement
  const physics = { damping: 10, mass: 0.25, stiffness: 30 };
  const spring = useSpring(transform, physics);

  return (
    <section className="w-full bg-primary" ref={sectionWrapperRef}>
      <div className="px-20 py-32">
        <div className="max-w-screen-xl m-auto">
          <h2 className="mb-5 text-6xl font-bold text-white">
            What is Living Lab?
          </h2>
          <p className="text-2xl font-semibold">
            "살아 있는 실험실"에 대하여 알아봅시다.
          </p>
        </div>
      </div>

      {/* container */}
      <div className="relative h-[calc((100vh-var(--sticky-header-height))*4)]">
        {/* sticky */}
        <div className="sticky top-[var(--sticky-header-height)] left-0 overflow-hidden after:half-wallpaper after:h-[40vh]">
          <motion.div
            ref={scrollRef}
            initial="partial"
            style={{ display: "flex", alignItems: "center", x: spring }}
          >
            {LIVING_LAB_SECTION_CARDS.map((card, index) => (
              <div
                key={index}
                className="card"
                style={{
                  position: "relative",
                  width: "100vw",
                  height: "calc(100vh-var(--sticky-header-height))",
                  padding: "30px",
                  flex: "1 0 100vw",
                  alignItems: "center",
                }}
              >
                <div className="h-[100vh] w-[30vw] relative">
                  <Image
                    src={card.imageUrl}
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="p-5 w-[50vmin] absolute top-[5vmin] left-[55vw] bg-white border-[3px] border-black shadow-[3px_5px_black]">
                  <p className="font-semibold whitespace-pre-wrap text-md md:text-2xl">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLivingLabSection;
