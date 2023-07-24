"use client";
import React from "react";

interface TextInputProps {
  label: string;
  labelTextAlt: string;
  placeholder: string;
  error?: boolean;
  ErrorMessage?: React.ReactElement;
}

const TextInput = React.forwardRef(
  (
    {
      label,
      labelTextAlt,
      placeholder,
      ErrorMessage,
      error = false,
      ...props
    }: TextInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className="pb-8">
        <label className="label">
          <span className="text-lg font-bold label-text after:required-star">
            {label}
          </span>
          <span className="label-text-alt">{labelTextAlt}</span>
        </label>
        <input
          type="text"
          className={`w-full input input-bordered ${
            error ? "input-error" : ""
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

TextInput.displayName = "TextInput";

export default TextInput;
