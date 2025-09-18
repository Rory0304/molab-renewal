import React from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { AuthErrorCode } from 'src/constants/api/auth/AuthErrorCode';
import { AuthErrorCodeFactory } from 'src/factories/api/auth/AuthErrorCodeFactory';

type AUTH_STATUS = 'check-email' | 'already-exist' | 'not_found' | 'fail';

interface UseEmailSignInProps {
  onSuccessSignIn: () => void;
}

export const useEmailSignIn = ({ onSuccessSignIn }: UseEmailSignInProps) => {
  const supabase = createClientComponentClient();

  const [isLoading, setIsLoading] = React.useState(false);
  const [status, setStatus] = React.useState<AUTH_STATUS | null>(null);

  const resetStatus = () => {
    setStatus(null);
  };

  const handleAuthError = (error: AuthError) => {
    const code = AuthErrorCodeFactory.convertErrorCode(error.message);

    switch (code) {
      case AuthErrorCode.ErrorCodeEmailNotConfirmed:
        setStatus('check-email');
        break;
      case AuthErrorCode.ErrorCodeInvalidLoginCredentials:
        setStatus('not_found');
        break;
      default:
        setStatus('fail');
    }
  };

  const handleSuccessfulAuth = (user: any, type: 'sign-in' | 'sign-up') => {
    const isEmailVerified = user?.user_metadata?.email_verified !== false;
    const hasUserId = Boolean(user?.id);

    if (!isEmailVerified) {
      setStatus('check-email');
      return;
    }

    if (!hasUserId) {
      setStatus('fail');
      return;
    }

    if (type === 'sign-in') {
      onSuccessSignIn();
    } else {
      setStatus('already-exist');
    }
  };

  const handleAuthResponse = (
    res: AuthResponse,
    type: 'sign-in' | 'sign-up'
  ) => {
    if (res.error) {
      handleAuthError(res.error);
      return;
    }

    if (res.data?.user) {
      handleSuccessfulAuth(res.data.user, type);
    }
  };

  const handleEmailSignUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const res = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      handleAuthResponse(res, 'sign-up');
    } catch (err) {
      setStatus('fail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      handleAuthResponse(res, 'sign-in');
    } catch (error) {
      setStatus('fail');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    status,

    handleEmailSignIn,
    handleEmailSignUp,
    resetStatus,
  };
};
