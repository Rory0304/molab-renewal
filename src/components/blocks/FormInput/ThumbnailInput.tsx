import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ThumbnailInputProps {
  labelText?: string;
  labelAltText?: string;
  thumbnailInputRegister?: UseFormRegisterReturn;
  error?: boolean;
  ErrorMessage?: React.ReactElement;
}

const ThumbnailInput: React.FC<ThumbnailInputProps> = ({
  labelText,
  labelAltText,
  thumbnailInputRegister,
  error,
  ErrorMessage,
}) => {
  return (
    <div className="pb-8 max-w-fit">
      {!!labelText || !!labelAltText ? (
        <label className="label">
          <span className="text-lg font-bold label-text after:required-star">
            {labelText}
          </span>
          <span className="label-text-alt">{labelAltText}</span>
        </label>
      ) : null}
      <input
        type="file"
        className={`file-input file-input-bordered ${
          error ? "input-error" : ""
        }`}
        accept="image/*"
        {...thumbnailInputRegister}
      />
      {React.isValidElement(ErrorMessage) ? ErrorMessage : null}
    </div>
  );
};

export default ThumbnailInput;
