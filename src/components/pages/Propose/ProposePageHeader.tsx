"use client";

import React from "react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

const ProposePageHeader: React.FC = () => {
  const {
    formState: { defaultValues },
  } = useFormContext();
  const projectTitle = defaultValues?.["payload"]["title"];
  const projecStatus = defaultValues?.["payload"]["isOpen"];

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-sm">
      <nav className="container flex items-center justify-between py-6 mx-auto">
        <div className="flex lg:flex-1">
          <Link href="/">
            <span className="text-xl font-black">MOLAB</span>
          </Link>
        </div>
        <div className="flex lg:flex-1">
          <Link href="#" className="bold btn-link btn-neutral">
            내 프로젝트
          </Link>
          {/* [TODO] REFACTOR THIS WITH "AFTER" */}
          <span className="px-2">/</span>
          <strong>{projectTitle}</strong>
          <span className="ml-2 badge badge-primary">
            {projecStatus ? "공개" : "비공개"}
          </span>
        </div>
        <div className="flex lg:justify-end">
          <Link
            href={{
              pathname: "/project/preview",
            }}
            target="_blank"
            rel="noreferrer noopener"
            className="mr-2 no-animation btn btn-outline btn-primary"
          >
            미리보기
          </Link>
          <Link
            href={{
              pathname: "/",
            }}
            className="no-animation btn btn-ghost btn-primary"
          >
            나가기
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default ProposePageHeader;
