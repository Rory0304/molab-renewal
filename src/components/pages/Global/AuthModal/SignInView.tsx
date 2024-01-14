'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import TextInput from 'src/components/blocks/FormInput/TextInput';
import { ApiStatus } from 'src/types/common';

import type { AUTH_VIEW_TYPE } from '../LoginRequireModal';

const EMAIL_VALID_REGEX: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface SignInViewProps {
  handleModalClose: () => void;
  handlecAuthViewChange: (view: AUTH_VIEW_TYPE) => void;
}

const SignInView: React.FC<SignInViewProps> = ({
  handleModalClose,
  handlecAuthViewChange,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [apiStatus, setApiStatus] = React.useState<ApiStatus>('Idle');

  const {
    formState: { errors },
    register,
    watch,
    handleSubmit,
    reset,
  } = useForm<{
    email: string;
    password: string;
  }>({ mode: 'all' });

  const emailInputRegister = register('email', {
    required: '이메일을 입력해주세요.',
    validate: {
      validEmail: value =>
        EMAIL_VALID_REGEX.test(value) || '잘못된 이메일 형식입니다.',
    },
  });

  const passwordInputRegister = register('password', {
    required: '비밀번호를 입력해주세요.',
  });

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const handleSignIn = async (email: string, password: string) => {
    if (email && password) {
      try {
        setApiStatus('Pending');

        await supabase.auth
          .signInWithPassword({
            email,
            password,
          })
          .then(res => {
            if (res.data.session) {
              router.refresh();
              setApiStatus('Success');
              handleModalClose();
              return;
            }
            if (res.error?.name) {
              throw new Error('fail to login');
            }
          });
      } catch (err) {
        setApiStatus('Fail');
      }
    }
  };

  return (
    <form
      className="w-full flex flex-col justify-center flex-1  gap-2"
      onSubmit={handleSubmit(() => handleSignIn(watchedEmail, watchedPassword))}
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
        padding={false}
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
      <button
        type="button"
        className="ml-1 underline btn-link text-sm text-neutral-500 text-right"
        onClick={() => handlecAuthViewChange('find-password')}
      >
        비밀번호 찾기
      </button>
      {apiStatus === 'Fail' ? (
        <div className="pb-8">
          <p className="text-sm text-danger">
            회원 정보가 존재하지 않습니다.
            <br />
            입력하신 내용을 다시 확인해주세요.
          </p>
        </div>
      ) : null}
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 my-4 text-white rounded bg-primary"
        >
          {apiStatus === 'Pending' ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            '로그인'
          )}
        </button>
        <div className="flex items-center justify-center">
          <p className="text-sm text-center text-neutral-500">
            계정이 없으신가요?
          </p>
          <button
            type="button"
            className="ml-1 underline btn-link text-sm"
            onClick={() => {
              handlecAuthViewChange('sign-up');
              setApiStatus('Idle');
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignInView;
