'use client';

import React from 'react';

import { useAuth } from 'src/context/AuthProvider';

const EmailConfirm: React.FC = () => {
  const { userInfo } = useAuth();

  React.useEffect(() => {
    if (userInfo) {
      window.close(); // close current tab which is routing from 'auth/callback'
    }
  }, [userInfo]);

  return (
    <div className="flex w-[100vh] h-[100vh] justify-center items-center">
      <p>Confirming email...</p>
      <span className="loading loading-spinner loading-md"></span>
    </div>
  );
};

export default EmailConfirm;
