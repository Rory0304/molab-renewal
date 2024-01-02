'use client';

import React from 'react';

import ExclamationCircleIcon from '@heroicons/react/24/solid/ExclamationCircleIcon';

interface ErrorBoxProps {
  title: string;
  description?: string;
  onRefetch?: () => void;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({
  title,
  description,
  onRefetch,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ExclamationCircleIcon className="w-8 h-8 mb-2" />
      <strong className="mb-2 text-lg font-bold text-neutral-600">
        {title}
      </strong>
      {description ? (
        <p className="mb-2 text-lg font-semibold text-neutral-600">
          {description}
        </p>
      ) : null}
      {typeof onRefetch === 'function' ? (
        <button className="btn btn-outline btn-neutral" onClick={onRefetch}>
          다시 시도
        </button>
      ) : null}
    </div>
  );
};

export default ErrorBox;
