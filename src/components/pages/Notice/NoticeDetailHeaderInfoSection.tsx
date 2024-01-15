'use client';

import React from 'react';
import { useIntersection } from 'react-use';

interface NoticeDetailHeaderInfoSectionProps {
  title: string;
  area: string;
  category: string;
}

const HEADER_INFO_SECTION_STYLES = {
  shown: 'pb-6 border-b-2 border-gray-500',
  hide: 'bg-white w-full py-5 fixed top-0 shadow-lg z-[60] min-h-[var(--sticky-header-height)] left-0',
};

const HEADER_INFO_SECTION_CONTENT_STYLES = {
  shown: '',
  hide: 'content-layout flex lg:flex-row flex-col justify-between lg:items-center mx-auto h-full',
};

const NoticeDetailHeaderInfoSection: React.FC<
  NoticeDetailHeaderInfoSectionProps
> = ({ title, area, category }) => {
  const headerInfoSectionRef = React.useRef<HTMLDivElement>(null);

  const intersection = useIntersection(headerInfoSectionRef, {
    root: null,
    threshold: 0.5,
  });

  const isIntersecting = Boolean(intersection?.isIntersecting);

  return (
    <section ref={headerInfoSectionRef}>
      <div className={`${isIntersecting ? 'hidden' : 'block'} h-[94px]`} />
      <div
        className={
          isIntersecting
            ? HEADER_INFO_SECTION_STYLES.shown
            : HEADER_INFO_SECTION_STYLES.hide
        }
      >
        <div
          className={
            isIntersecting
              ? HEADER_INFO_SECTION_CONTENT_STYLES.shown
              : HEADER_INFO_SECTION_CONTENT_STYLES.hide
          }
        >
          <h2
            className={`${
              isIntersecting ? 'md:pr-2' : 'mb-2 ctext-ellipsis line-clamp-2'
            } text-sm md:text-2xl font-bold`}
          >
            {title}
          </h2>
          <p className=" text-sm md:text-base flex-auto flex-grow-0 flex-shrink-0 text-neutral-500">
            <span>{area}</span> | <span>{category}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NoticeDetailHeaderInfoSection;
