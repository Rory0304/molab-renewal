"use client";
import React, { TextareaHTMLAttributes } from "react";

interface TextAreaInputProps
  extends Pick<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange" | "name" | "value" | "maxLength"
  > {
  placeholder: string;
  label?: string;
  labelTextAlt?: string;
  required?: boolean;
  error?: boolean;
  ErrorMessage?: React.ReactElement;
}

const TextAreaInput = React.forwardRef(
  (
    {
      label,
      labelTextAlt,
      placeholder,
      required,
      ErrorMessage,
      error = false,
      ...props
    }: TextAreaInputProps,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    return (
      <div className="pb-8 form-control">
        <label className="label">
          {label ? (
            <span
              className={`text-lg font-bold label-text ${
                required ? "after:required-star" : ""
              }`}
            >
              {label}
            </span>
          ) : null}
          {labelTextAlt ? (
            <span className="label-text-alt">{labelTextAlt}</span>
          ) : null}
        </label>
        <textarea
          className={`textarea textarea-bordered h-24 ${
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

TextAreaInput.displayName = "TextAreaInput";

export default TextAreaInput;
