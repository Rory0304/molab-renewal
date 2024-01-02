'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const NO_FOOTER_PAGE_PATHNAME_REGEX_LIST = [
  /^\/project.*/,
  /^\/communication\/[a-zA-Z0-9_-]+\?preview=Y$/,
];

const GlobalFooter: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFooter = NO_FOOTER_PAGE_PATHNAME_REGEX_LIST.every(
    regex => !regex.test(`${pathname}?${searchParams}`)
  );

  if (!hasFooter) return null;
  return (
    <footer className="w-full h-48 px-6 py-10 bg-gray-200">
      <div className="flex items-start justify-between content-layout">
        <Link href="/">
          <span className="text-xl font-black text-gray-500">MOLAB</span>
        </Link>
        <div className="text-right">
          <p className="mb-2 text-gray-500">리빙랩 통합 플랫폼</p>
          <Link
            href="mailto:mitty0304@naver.com"
            className="font-semibold text-gray-500 text-end"
          >
            고객 문의
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
