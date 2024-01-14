'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { AuthResponse } from '@supabase/supabase-js';
import TextInput from 'src/components/blocks/FormInput/TextInput';
import { useAuth } from 'src/context/AuthProvider';
import { ApiStatus } from 'src/types/common';

import type { AUTH_VIEW_TYPE } from '../LoginRequireModal';

const EMAIL_VALID_REGEX: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface SignUpViewProps {
  handleModalClose: () => void;
  handlecAuthViewChange: (view: AUTH_VIEW_TYPE) => void;
}

type SignUpViewType = 'check-email' | 'sign-up' | 'already-exist';

const SignUpView: React.FC<SignUpViewProps> = ({
  handleModalClose,
  handlecAuthViewChange,
}) => {
  const [view, setView] = React.useState<SignUpViewType>('sign-up');
  const supabase = createClientComponentClient();

  const { userInfo } = useAuth();

  const [apiStatus, setApiStatus] = React.useState<ApiStatus>('Idle');

  const {
    formState: { errors },
    register,
    watch,
    reset,
    handleSubmit,
  } = useForm<{
    email: string;
    password: string;
  }>({ mode: 'all' });

  const handleSignUp = async (email: string, password: string) => {
    if (email && password) {
      try {
        setApiStatus('Pending');

        await supabase.auth
          .signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${location.origin}/auth/callback/email-confirm`,
            },
          })
          .then((res: AuthResponse) => {
            if (res.error) {
              console.log(res.error);
              throw new Error('fail to signup');
            } else {
              setApiStatus('Success');
              setView('check-email');
            }
          });
      } catch (err) {
        setApiStatus('Fail');
      }
    }
  };

  const emailInputRegister = register('email', {
    required: '이메일을 입력해주세요.',
    validate: {
      validEmail: value =>
        EMAIL_VALID_REGEX.test(value) || '잘못된 이메일 형식입니다.',
    },
  });

  const passwordInputRegister = register('password', {
    required: '비밀번호를 입력해주세요.',
    minLength: {
      value: 6,
      message: '비밀번호는 최소 6자리 이상이어야 합니다.',
    },
  });

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const inputArea = (
    <>
      <TextInput
        {...emailInputRegister}
        type="text"
        label="이메일"
        name="email"
        placeholder="you@example.com"
        error={Boolean(errors.email)}
        ErrorMessage={
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) =>
              message ? (
                <span className="mt-2 text-danger">{message}</span>
              ) : null
            }
          />
        }
      />
      <TextInput
        {...passwordInputRegister}
        label="비밀번호"
        name="password"
        type="password"
        placeholder="••••••••"
        error={Boolean(errors.password)}
        ErrorMessage={
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) =>
              message ? (
                <span className="mt-2 text-danger">{message}</span>
              ) : null
            }
          />
        }
      />
    </>
  );

  const renderSignUpView = (view: SignUpViewType) => {
    switch (view) {
      case 'already-exist':
        return (
          <div>
            <p className="text-center text-neutral-400 mb-4">
              <span className="font-bold text-primary">
                이미 회원 정보가 존재합니다. 로그인을 진행해주세요
              </span>
            </p>
            <button
              type="button"
              className="w-full px-4 py-2  rounded btn-primary"
              onClick={() => handlecAuthViewChange('sign-in')}
            >
              로그인하기
            </button>
          </div>
        );
      case 'check-email':
        return (
          <div>
            <p className="text-center text-neutral-400 mb-4">
              <span className="font-bold text-primary">{watchedEmail}</span>을
              확인 후, <br />
              아래의 '계속하기' 버튼을 클릭해주세요
            </p>
            <button
              type="button"
              disabled={!Boolean(userInfo?.id)}
              className="w-full px-4 py-2 rounded btn-primary"
              onClick={handleModalClose}
            >
              계속하기
            </button>
          </div>
        );

      case 'sign-up':
        return (
          <form
            className="w-full flex flex-col justify-center flex-1  gap-2"
            onSubmit={handleSubmit(() =>
              handleSignUp(watchedEmail, watchedPassword)
            )}
          >
            {inputArea}
            {apiStatus === 'Fail' ? (
              <div className="pb-8">
                <p className="text-sm text-danger">
                  문제가 발생했습니다. 다시 시도해주세요
                </p>
              </div>
            ) : null}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 mb-6 text-white rounded bg-primary"
              >
                {apiStatus === 'Pending' ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  '회원가입'
                )}
              </button>
              <p className="text-sm text-center text-neutral-500">
                이미 계정이 있으신가요?
                <button
                  type="button"
                  className="ml-1 underline btn-link"
                  onClick={() => {
                    handlecAuthViewChange('sign-in');
                    setApiStatus('Idle');
                  }}
                >
                  로그인
                </button>
              </p>
            </div>
          </form>
        );
    }
  };

  return renderSignUpView(view);
};

export default SignUpView;
