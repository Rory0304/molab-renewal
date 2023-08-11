"use client";

import React from "react";
import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Image
        src={"/not-found.svg"}
        alt="not found image"
        width={300}
        height={300}
      />
    </div>
  );
};

export default NotFoundPage;
