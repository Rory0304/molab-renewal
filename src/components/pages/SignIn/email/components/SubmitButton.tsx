import React, { FC } from 'react';

interface SubmitButtonProps {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const SubmitButton: FC<SubmitButtonProps> = ({
  isLoading,
  label,
  disabled,
  onClick,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full px-4 py-2 text-white rounded bg-primary"
      onClick={onClick}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        label
      )}
    </button>
  );
};
