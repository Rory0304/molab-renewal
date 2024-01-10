'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthContext } from 'src/context/AuthProvider';

interface DesktopHeaderProps {
  headerItem: { title: string; href: string }[];
  isLoading: boolean;
  onProposeBtnClick: () => void;
  onLoginRequireModalOpen: () => void;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  headerItem,
  isLoading,
  onProposeBtnClick,
  onLoginRequireModalOpen,
}) => {
  const pathname = usePathname();

  const { authorized, signOut } = React.useContext(AuthContext);

  const [openProfileDropdown, setOpenProfileDropdown] = React.useState(false);

  React.useEffect(() => {
    // reset dropdown
    setOpenProfileDropdown(false);
  }, [pathname]);

  return (
    <div className="items-center justify-between hidden py-5 md:flex content-layout">
      <div>
        <Link href="/">
          <span className="text-xl font-black">MOLAB</span>
        </Link>
      </div>
      <nav>
        <ul className="flex">
          {headerItem.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-6 text-lg font-semibold leading-6"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center">
        <button
          className="px-4 py-1 mr-4 text-sm font-semibold leading-6 border-2 border-gray-300 border-solid rounded-3xl"
          onClick={onProposeBtnClick}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            '제안하기'
          )}
        </button>
        {authorized ? (
          <div className="relative h-8">
            <button
              tabIndex={0}
              aria-label="my profile dropdown"
              className="cursor-pointer dropdown avatar"
              onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
              onBlur={e => {
                if (!e.relatedTarget) {
                  setOpenProfileDropdown(false);
                }
              }}
            >
              <div className="relative w-8 h-8 border rounded-full border-neutral-400">
                <Image
                  fill
                  alt="profile image"
                  src="/default-profile-image.png"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              </div>
            </button>
            {openProfileDropdown ? (
              <div className="absolute top-[40px] right-[-20px] w-32">
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-3 bg-gray-50 rounded-box shadow-sm"
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
                      onClick={() => {
                        console.log('sign out');
                        signOut();
                      }}
                    >
                      로그아웃
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <button
            className="px-4 py-1 mr-4 text-sm font-semibold leading-6 border-2 border-gray-300 border-solid rounded-3xl"
            onClick={onLoginRequireModalOpen}
          >
            <span>로그인</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DesktopHeader;
