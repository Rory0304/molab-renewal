import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { TextInput } from 'src/components/blocks';

interface EmailTextInputProps {}

const EMAIL_VALID_REGEX: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const EmailTextInput: FC<EmailTextInputProps> = ({}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<{
    email: string;
    password: string;
  }>();

  const emailInputRegister = register('email', {
    required: '이메일을 입력해주세요.',
    validate: {
      validEmail: value =>
        EMAIL_VALID_REGEX.test(value) || '잘못된 이메일 형식입니다.',
    },
  });

  return (
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
            message ? <span className="mt-2 text-danger">{message}</span> : null
          }
        />
      }
    />
  );
};
