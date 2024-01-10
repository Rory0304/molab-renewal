'use client';

import React from 'react';

import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { useAuth } from 'src/context/AuthProvider';

const EmailConfirm: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const { userInfo } = useAuth();

  React.useEffect(() => {
    const checkUserInfo = setTimeout(() => {
      setLoading(true);
      if (!userInfo) {
        enqueueSnackbar('회원 정보를 확인할 수 없습니다.', {
          variant: 'error',
        });
      }
      setLoading(false);
      window.close();
    }, 3000);

    return () => clearTimeout(checkUserInfo);
  }, [userInfo]);

  return (
    <div className="flex flex-col w-fill h-[calc(100vh-var(--sticky-header-height))] justify-center items-center">
      <p className="mb-6 text-lg font-bold">
        {loading
          ? '회원 정보를 확인 중입니다.'
          : '회원 정보를 확인할 수 없습니다'}
      </p>
      {loading ? (
        <span className="loading loading-spinner loading-lg text-primary"></span>
      ) : (
        <Link href="/" className="btn btn-primary btn-md">
          홈으로 돌아가기
        </Link>
      )}
    </div>
  );
};

export default EmailConfirm;
