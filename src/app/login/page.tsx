'use client';

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import TextInput from 'src/components/blocks/FormInput/TextInput';
import { ApiStatus } from 'src/types/common';

type AUTH_VIEW_TYPE = 'check-email' | 'sign-in' | 'sign-up';

const EMAIL_VALID_REGEX: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LoginPage: React.FC = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [view, setView] = useState<AUTH_VIEW_TYPE>('sign-in');
  const [status, setStatus] = React.useState<ApiStatus>('Idle');

  const {
    formState: { errors },
    register,
    trigger,
    watch,
    reset,
  } = useForm<{
    email: string;
    password: string;
  }>({ mode: 'onChange' });

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

  /**
   * 회원 가입
   */
  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    trigger();

    if (email && password) {
      try {
        await supabase.auth
          .signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${location.origin}/auth/callback/email-confirm`,
            },
          })
          .then(res => {
            if (!!res.error) {
              throw new Error('fail to signup');
            }
          });
      } catch (err) {
        setStatus('Fail');
      }
    }
  };

  /**
   * 로그인
   */
  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    trigger();

    if (email && password) {
      try {
        setStatus('Pending');

        await supabase.auth
          .signInWithPassword({
            email,
            password,
          })
          .then(res => {
            if (res.data.session) {
              router.refresh();
              router.push('/');
              setStatus('Success');
              return;
            }
            if (!!res.error?.name) {
              throw new Error('fail to login');
            }
          });
      } catch (err) {
        setStatus('Fail');
      }
    }
  };

  const renderAuthAction = (view: AUTH_VIEW_TYPE, isLoading: boolean) => {
    switch (view) {
      case 'sign-in':
        return (
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-6 text-white rounded bg-primary"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                '로그인'
              )}
            </button>
            <p className="text-sm text-center text-neutral-500">
              계정이 없으신가요?
              <button
                type="button"
                className="ml-1 underline btn-link"
                onClick={() => {
                  reset();
                  setView('sign-up');
                  setStatus('Idle');
                }}
              >
                회원가입
              </button>
            </p>
          </div>
        );

      case 'sign-up':
        return (
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-6 text-white rounded bg-primary"
            >
              {isLoading ? (
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
                  reset();
                  setView('sign-in');
                  setStatus('Idle');
                }}
              >
                로그인
              </button>
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-lg gap-2 py-16 content-layout">
      {view === 'check-email' ? (
        <div>
          <p className="text-center text-neutral-400">
            <span className="font-bold text-primary">{watchedEmail}</span> 을
            확인하여 회원가입을 진행해주세요.
          </p>
        </div>
      ) : (
        <section>
          <h2 className="mb-8 text-4xl font-extrabold">
            {view === 'sign-in' ? '로그인' : '회원가입'}
          </h2>
          <form
            className="flex flex-col justify-center flex-1 w-full max-w-sm gap-2"
            onSubmit={e =>
              view === 'sign-in'
                ? handleSignIn(e, watchedEmail, watchedPassword)
                : handleSignUp(e, watchedEmail, watchedPassword)
            }
          >
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
            {status === 'Fail' ? (
              <div className="pb-8">
                <p className="text-sm text-danger">
                  아이디 또는 비밀번호를 잘못 입력했습니다.
                  <br />
                  입력하신 내용을 다시 확인해주세요.
                </p>
              </div>
            ) : null}
            {renderAuthAction(view, status === 'Pending')}
          </form>
        </section>
      )}
    </div>
  );
};

export default LoginPage;
