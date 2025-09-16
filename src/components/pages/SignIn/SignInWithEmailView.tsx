import React, { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useEmailSignIn } from 'src/hooks/auth/useEmailSignIn';

import { SignInWithEmailConfirmView } from './email/SignInWithEmailConfirmView';
import { EmailTextInput } from './email/components/EmailTextInput';
import { PasswordTextInput } from './email/components/PasswordTextInput';
import { SubmitButton } from './email/components/SubmitButton';

type AUTH_VIEW_TYPE = 'sign-in' | 'sign-up';

interface SignInWithEmailViewProps {
  onCloseModal: () => void;
}

export const SignInWithEmailView: FC<SignInWithEmailViewProps> = ({
  onCloseModal,
}) => {
  const [view, setView] = React.useState<AUTH_VIEW_TYPE>('sign-in');

  const router = useRouter();

  const {
    handleSubmit,
    reset: resetForm,
    watch,
  } = useFormContext<{
    email: string;
    password: string;
  }>();

  const {
    handleEmailSignIn,
    handleEmailSignUp,
    resetStatus,
    isLoading,
    status,
  } = useEmailSignIn({
    onSuccessSignIn: () => {
      resetForm();
      onCloseModal();
      router.refresh();
    },
  });

  useEffect(() => {
    // clean up when modal is closed
    return () => {
      resetForm();
      resetStatus();
      setView('sign-in');
    };
  }, []);

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const onClickSubmit = () => {
    if (view === 'sign-in') {
      handleEmailSignIn(watchedEmail, watchedPassword);
    } else {
      handleEmailSignUp(watchedEmail, watchedPassword);
    }
  };

  const onChangeView = (view: AUTH_VIEW_TYPE) => {
    resetForm();
    resetStatus();
    setView(view);
  };

  const renderFailMessage = () => {
    switch (status) {
      case 'not_found':
        return (
          <div className="pb-8">
            <p className="text-sm text-danger">
              일치하는 회원 정보가 존재하지 않습니다.
              <br />
              입력하신 내용을 다시 확인해주세요.
            </p>
          </div>
        );

      case 'fail':
        return (
          <div className="pb-8">
            <p className="text-sm text-danger">
              문제가 발생했습니다. 다시 시도해주세요
            </p>
          </div>
        );

      case 'already-exist':
        return (
          <p className="mb-2 text-center text-neutral-400">
            <span className="font-bold text-primary">
              이미 회원 정보가 존재합니다. 로그인을 진행해주세요
            </span>
          </p>
        );

      default:
        return null;
    }
  };

  const renderAuthView = () => {
    if (status === 'check-email') {
      return (
        <SignInWithEmailConfirmView
          email={watchedEmail}
          onCloseModal={onCloseModal}
        />
      );
    }

    return (
      <div>
        <EmailTextInput />
        <PasswordTextInput />
        {renderFailMessage()}
        {renderButton()}
      </div>
    );
  };

  const renderButton = () => {
    const label = view === 'sign-up' ? '회원가입' : '로그인';
    const description =
      view === 'sign-up' ? '이미 계정이 있으신가요?' : '계정이 없으신가요?';
    const linkLabel = view === 'sign-up' ? '로그인' : '회원가입';

    return (
      <div>
        <SubmitButton label={label} isLoading={isLoading} />
        <div className="flex items-center justify-center mt-3">
          <p className="text-sm text-center text-neutral-500">{description}</p>
          <button
            type="button"
            className="ml-1 underline btn-link"
            onClick={() => {
              const newView = view === 'sign-up' ? 'sign-in' : 'sign-up';
              onChangeView(newView);
            }}
          >
            {linkLabel}
          </button>
        </div>
      </div>
    );
  };

  return (
    <form
      className="flex flex-col justify-center flex-1 w-full gap-2"
      onSubmit={handleSubmit(() => onClickSubmit())}
    >
      {renderAuthView()}
    </form>
  );
};
