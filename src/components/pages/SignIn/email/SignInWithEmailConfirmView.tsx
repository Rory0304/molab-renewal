import React, { FC } from 'react';

import { useAuth } from 'src/context/AuthProvider';

import { SubmitButton } from './components/SubmitButton';

interface SignInWithEmailConfirmViewProps {
  email: string;
  onCloseModal: () => void;
}

export const SignInWithEmailConfirmView: FC<
  SignInWithEmailConfirmViewProps
> = ({ email, onCloseModal }) => {
  const { userInfo } = useAuth();

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-4">
        <p className="font-bold text-center text-primary">
          {email}
          <span>을 확인 후,</span>
        </p>
        <p> 아래의 '계속하기' 버튼을 클릭해주세요</p>
      </div>
      <SubmitButton
        label="계속하기"
        disabled={!Boolean(userInfo?.id)}
        onClick={onCloseModal}
      />
    </div>
  );
};
