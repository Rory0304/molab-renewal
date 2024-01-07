'use client';

import React from 'react';

interface TextInputProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'type' | 'name' | 'value' | 'className'
  > {
  label: string;
  placeholder: string;
  labelTextAlt?: string;
  required?: boolean;
  error?: boolean;
  ErrorMessage?: React.ReactElement;
}

const TextInput = React.forwardRef(
  (
    {
      label,
      labelTextAlt,
      placeholder,
      required,
      ErrorMessage,
      error = false,
      className,
      ...props
    }: TextInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="pb-8">
        <label className="label">
          <span
            className={`text-lg font-semibold label-text ${
              required ? 'after:required-star' : ''
            }`}
          >
            {label}
          </span>
          {labelTextAlt ? (
            <span className="label-text-alt">{labelTextAlt}</span>
          ) : null}
        </label>
        <input
          className={`${className} w-full input input-bordered ${
            error ? 'input-error' : ''
          }`}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        {React.isValidElement(ErrorMessage) ? ErrorMessage : null}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
