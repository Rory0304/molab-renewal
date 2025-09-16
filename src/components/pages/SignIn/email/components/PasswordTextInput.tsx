import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { TextInput } from 'src/components/blocks';

interface PasswordTextInputProps {}

export const PasswordTextInput: FC<PasswordTextInputProps> = ({}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    email: string;
    password: string;
  }>();

  const passwordInputRegister = register('password', {
    required: '비밀번호를 입력해주세요.',
    minLength: {
      value: 6,
      message: '비밀번호는 최소 6자리 이상이어야 합니다.',
    },
  });

  return (
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
            message ? <span className="mt-2 text-danger">{message}</span> : null
          }
        />
      }
    />
  );
};
