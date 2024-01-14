'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { enqueueSnackbar } from 'notistack';
import TextInput from 'src/components/blocks/FormInput/TextInput';
import { ApiStatus } from 'src/types/common';
import {
  SUPABASE_AUTH_ERROR_CODE,
  SUPABASE_AUTH_ERROR_MESSAGE,
} from 'src/types/supabaseErrorCode';

const EMAIL_VALID_REGEX: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface FindPasswordViewProps {}

const FindPasswordView: React.FC<FindPasswordViewProps> = ({}) => {
  const supabase = createClientComponentClient();

  const [apiStatus, setApiStatus] = React.useState<ApiStatus>('Idle');

  const {
    formState: { errors },
    register,
    watch,
    handleSubmit,
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

  const watchedEmail = watch('email');

  const handlePasswordFind = async (email: string) => {
    try {
      setApiStatus('Pending');

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${location.origin}/auth/callback/reset-password`,
      });

      if (error) {
        enqueueSnackbar(
          SUPABASE_AUTH_ERROR_MESSAGE[
            SUPABASE_AUTH_ERROR_CODE[error.message]
          ] ?? '비밀번호 재설정에 실패했습니다',
          {
            variant: 'error',
          }
        );
      }

      //
      //
      //
      if (data) {
        setApiStatus('Success');
      }
    } catch (error) {}
  };

  if (apiStatus === 'Success') {
    return (
      <div>
        <p className="text-center">
          비밀번호 변경 메일을 성공적으로 발송하였습니다.
          <br />
          <span className="text-center text-primary font-semibold">
            {watchedEmail}
          </span>{' '}
          <br />
          메일함을 확인하여 비밀번호를 재설정해주세요.
        </p>
      </div>
    );
  }
  return (
    <form
      className="w-full flex flex-col justify-center flex-1  gap-2"
      onSubmit={handleSubmit(() => handlePasswordFind(watchedEmail))}
    >
      <p className="font-medium text-center mb-2 text-neutral-700">
        기존에 가입하신 이메일을 입력하시면, <br />
        비밀번호 변경 메일을 발송해드립니다.
      </p>
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
          className="w-full px-4 py-2 text-white rounded bg-primary"
        >
          {apiStatus === 'Pending' ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            '비밀번호 변경 이메일 받기'
          )}
        </button>
      </div>
    </form>
  );
};

export default FindPasswordView;
