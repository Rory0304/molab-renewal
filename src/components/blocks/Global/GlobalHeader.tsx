'use client';

import React from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { AuthContext } from 'src/context/AuthProvider';
import { molabApi } from 'src/utils/supabase';
import { v4 as uuidV4 } from 'uuid';

import { DesktopHeader, MobileHeader } from '../Header';

const DynamicLoginRequiredModal = dynamic(
  () => import(`src/components/pages/Global/LoginRequireModal`)
);

const NO_HEADER_PAGE_PATHNAME_REGEX_LIST = [
  /^\/project.*/,
  /^\/communication\/[a-zA-Z0-9_-]+\?preview=Y$/,
];

const HEADER_ITEMS = [
  {
    title: '리빙랩 공고',
    href: '/notice',
  },
  {
    title: '열린 참여',
    href: '/communication',
  },
  {
    title: '리빙랩이란?',
    href: '/about-livinglab',
  },
];

const GlobalHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const supabaseClient = createClientComponentClient();

  const loginRequiredModalRef = React.useRef<HTMLDialogElement>(null);

  const hasHeader = NO_HEADER_PAGE_PATHNAME_REGEX_LIST.every(
    regex => !regex.test(`${pathname}?${searchParams}`)
  );

  const [isLoading, setIsLoading] = React.useState(false);
  const { authorized, userInfo } = React.useContext(AuthContext);

  /**
   *
   */
  const handleProposeBtnClick = async () => {
    if (!authorized || !userInfo) {
      return router.push('/login');
    }

    try {
      setIsLoading(true);
      const id = uuidV4();
      await molabApi
        .molabApiCreatePropose(supabaseClient)(id, userInfo?.id)
        .then(data => {
          if (data) {
            router.push(`/project/${id}/base`);
            setIsLoading(false);
          }
        });
    } catch (err) {
      setIsLoading(false);
      enqueueSnackbar(
        '프로젝트 생성에 실패했습니다. 잠시후 다시 시도해주세요',
        { variant: 'error' }
      );
    }
  };

  /**
   *
   */
  const handleLoginRequireModalOpen = () => {
    return loginRequiredModalRef.current?.showModal();
  };

  if (!hasHeader) return null;

  return (
    <header className="sticky top-0 left-0 z-50 w-full bg-white shadow-sm max-h-[var(--sticky-header-height)]">
      <MobileHeader
        headerItem={HEADER_ITEMS}
        isLoading={isLoading}
        onProposeBtnClick={handleProposeBtnClick}
        onLoginRequireModalOpen={handleLoginRequireModalOpen}
      />
      <DesktopHeader
        headerItem={HEADER_ITEMS}
        isLoading={isLoading}
        onProposeBtnClick={handleProposeBtnClick}
        onLoginRequireModalOpen={handleLoginRequireModalOpen}
      />
      <DynamicLoginRequiredModal modalRef={loginRequiredModalRef} />
    </header>
  );
};

export default GlobalHeader;
