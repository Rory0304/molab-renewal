'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import TextInput from 'src/components/blocks/FormInput/TextInput';
import {
  SUPABASE_AUTH_ERROR_CODE,
  SUPABASE_AUTH_ERROR_MESSAGE,
} from 'src/constants/supabaseError';
import { ApiStatus } from 'src/types';

const ResetPassword: React.FC = () => {
  const router = useRouter();

  const supabase = createClientComponentClient();

  const [apiStatus, setApiStatus] = React.useState<ApiStatus>('Idle');

  const {
    formState: { errors },
    register,
    watch,
    handleSubmit,
  } = useForm<{
    password: string;
  }>({ mode: 'all' });

  const passwordInputRegister = register('password', {
    required: '비밀번호를 입력해주세요.',
    minLength: {
      value: 6,
      message: '비밀번호는 최소 6자리 이상이어야 합니다.',
    },
  });

  const resetPassword = async (newPassword: string) => {
    try {
      setApiStatus('Pending');

      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setApiStatus('Success');
        alert('비밀번호가 성공적으로 변경되었습니다!');
        router.push('/');
      }
    } catch (error: any) {
      enqueueSnackbar(
        SUPABASE_AUTH_ERROR_MESSAGE[SUPABASE_AUTH_ERROR_CODE[error.message]] ??
          '비밀번호 재설정에 실패했습니다',
        {
          variant: 'error',
        }
      );

      setApiStatus('Fail');
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-lg gap-2 py-16 content-layout">
      <section>
        <h2 className="mb-8 text-4xl font-extrabold">비밀번호 재설정</h2>
        <form
          className="flex flex-col justify-center flex-1 w-full max-w-sm gap-2"
          onSubmit={handleSubmit(() => resetPassword(watch('password')))}
        >
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
          <button
            type="submit"
            className="w-full px-4 py-2 mb-6 text-white rounded bg-primary"
          >
            {apiStatus === 'Pending' ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              '비밀번호 변경'
            )}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ResetPassword;
