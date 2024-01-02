'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 content-layout">
      <Image
        src={'/not-found.svg'}
        alt="not found image"
        width={250}
        height={250}
      />
      <div className="flex flex-col items-center py-10">
        <h2 className="mb-2 text-3xl font-extrabold">
          죄송합니다, 페이지를 찾을 수 없습니다.
        </h2>
        <p className="mb-8 font-semibold text-center text-gray-400">
          404 Page not found
        </p>
        <Link href="/" className="btn btn-primary btn-md">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
