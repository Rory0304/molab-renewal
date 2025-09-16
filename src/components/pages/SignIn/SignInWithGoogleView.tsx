import React, { FC } from 'react';

import { useGoogleSignIn } from 'src/hooks/auth/useGoogleSignIn';

export const SignInWithGoogleView: FC = () => {
  const { handleSignInWithGoogle } = useGoogleSignIn();

  return (
    <div>
      <button
        onClick={handleSignInWithGoogle}
        type="button"
        className="w-full px-4 py-2 text-white bg-white border border-gray-300 rounded"
      >
        <span className="text-black">Google로 로그인</span>
      </button>
    </div>
  );
};
