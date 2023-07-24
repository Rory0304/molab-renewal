"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AuthContext } from "src/context/auth-context";
import { v4 as uuidV4 } from "uuid";
import { createPropose } from "src/app/api/propose";
import { useRouter } from "next/navigation";

const NO_HEADER_PAGE_PATHNAME_REGEX_LIST = [/^\/project.*/];

const GlobalHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const hasHeader = NO_HEADER_PAGE_PATHNAME_REGEX_LIST.every(
    (regex) => !regex.test(pathname)
  );

  const { authorized, userInfo, signOut } = React.useContext(AuthContext);
  const [openProfileDropdown, setOpenProfileDropdown] = React.useState(false);

  const headerItems = [
    {
      title: "리빙랩 공고",
      href: "/notice",
    },
    {
      title: "열린 참여",
      href: "/communication",
    },
    {
      title: "리빙랩이란?",
      href: "/notice",
    },
  ] as const;

  const handleClickProposeBtn = async () => {
    if (!authorized || !userInfo) {
      return router.push("/login");
    }

    const id = uuidV4();
    await createPropose(id, userInfo?.id)
      .then((data) => {
        console.log(data);
        router.push(`/project/${id}/base`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!hasHeader) return null;

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-sm">
      <nav className="container flex items-center justify-between max-w-screen-xl py-5 mx-auto">
        <div className="flex lg:flex-1">
          <Link href="/">
            <span className="text-xl font-black">MOLAB</span>
          </Link>
        </div>
        <div className="flex">
          {headerItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-6 text-lg font-semibold leading-6"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <button
            className="px-4 py-1 mr-4 text-sm font-semibold leading-6 border-2 border-gray-300 border-solid rounded-3xl"
            onClick={handleClickProposeBtn}
          >
            제안하기
          </button>
          {authorized ? (
            <div className="relative">
              <div
                className="cursor-pointer avatar"
                tabIndex={0}
                onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
              >
                <div className="relative w-8 h-8 border rounded-full border-neutral-400">
                  <Image
                    fill
                    alt="profile image"
                    src="/default-profile-image.png"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              {openProfileDropdown ? (
                <div className="absolute top-[58px] right-[-20px]">
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-3 bg-gray-50 rounded-box"
                  >
                    <li>
                      <Link href="/myproject" className="text-gray-700">
                        마이 페이지
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="text-gray-700"
                        onClick={signOut}
                      >
                        로그아웃
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1 mr-4 text-sm font-semibold leading-6 border-2 border-gray-300 border-solid rounded-3xl"
            >
              <span>로그인</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default GlobalHeader;
