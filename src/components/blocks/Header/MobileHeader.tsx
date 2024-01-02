'use client';

import React from 'react';

import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthContext } from 'src/context/AuthProvider';

interface MobileHeaderProps {
  headerItem: { title: string; href: string }[];
  isLoading: boolean;
  onProposeBtnClick: () => void;
}

const GlobalHeader: React.FC<MobileHeaderProps> = ({
  headerItem,
  isLoading,
  onProposeBtnClick,
}) => {
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const { authorized, signOut, userInfo } = React.useContext(AuthContext);

  React.useEffect(() => {
    // reset drawer
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="flex items-center justify-between py-5 md:hidden content-layout">
      <div className="flex lg:flex-1">
        <Link href="/">
          <span className="text-xl font-black">MOLAB</span>
        </Link>
      </div>
      <div className="w-auto drawer drawer-end">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          onChange={() => setIsDrawerOpen(current => !current)}
        />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="px-1 py-1 cursor-pointer drawer-button btn btn-ghost btn-square w-fit h-fit"
          >
            <Bars3Icon width={32} height={32} />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <div className="h-full p-0 bg-white menu w-80 bg-base-200 text-base-content">
            <button
              aria-label="close drawer"
              className="m-4 text-gray-700 btn-ghost btn-circle w-fit h-fit"
              onClick={() => setIsDrawerOpen(false)}
            >
              <XMarkIcon width={24} height={24} />
            </button>
            {authorized ? (
              <div className="flex items-center w-full p-4 bg-gray-100 avatar">
                <div className="relative w-8 h-8 p-4 mr-3 border rounded-full border-neutral-400">
                  <Image
                    fill
                    alt="profile image"
                    src="/default-profile-image.png"
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <Link
                  aria-label="myproject"
                  href="/myproject"
                  className="block w-full"
                >
                  <span className="flex items-center justify-between w-full font-semibold text-gray-700">
                    {userInfo?.email}
                    <ChevronRightIcon
                      width={20}
                      height={20}
                      aria-label="go-to-mypage"
                    />
                  </span>
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <span className="font-semibold text-gray-700">로그인</span>
              </Link>
            )}
            <nav>
              <ul className="p-4 menu bg-base-200">
                {headerItem.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-lg font-semibold leading-6"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-gray-500">
              <button
                className="px-4 py-1 mb-2 text-sm font-semibold btn btn-primary btn-sm btn-block rounded-3xl"
                onClick={onProposeBtnClick}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  '제안하기'
                )}
              </button>
              {authorized ? (
                <button
                  type="button"
                  className="px-4 py-1 text-sm font-semibold border-2 border-gray-300 border-solid btn-block rounded-3xl"
                  onClick={signOut}
                >
                  로그아웃
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalHeader;
