'use client';

import Image from 'next/image';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center py-20 content-layout">
          <Image
            src={'/not-found.svg'}
            alt="not found image"
            width={250}
            height={250}
          />
          <div className="flex flex-col items-center py-10">
            <h2 className="mb-2 text-3xl font-extrabold">
              죄송합니다, 예상하지 못한 오류가 발생하였습니다.
            </h2>
            <p className="mb-8 font-semibold text-center text-gray-400">
              mitty0304@naver.com 으로 문의바랍니다.
            </p>
            <button onClick={() => reset()}>다시 시도</button>
          </div>
        </div>
      </body>
    </html>
  );
}
