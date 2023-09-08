import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import UploadIcon from "@heroicons/react/20/solid/ArrowUpOnSquareIcon";
import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import Image from "next/image";

interface ThumbnailInputProps {
  thumbnailImage?: File | null;
  labelText?: string;
  labelAltText?: string;
  thumbnailInputRegister?: UseFormRegisterReturn;
  error?: boolean;
  ErrorMessage?: React.ReactElement;
  onRemoveThumbnailImage?: () => void;
}

const ThumbnailInput: React.FC<ThumbnailInputProps> = ({
  thumbnailImage,
  labelText,
  labelAltText,
  thumbnailInputRegister,
  error,
  ErrorMessage,
  onRemoveThumbnailImage,
}) => {
  return (
    <div className="pb-8">
      <label className="label" htmlFor="thumbnail_image">
        <span className="text-lg font-bold label-text after:required-star">
          {labelText}
        </span>
      </label>
      {thumbnailImage ? (
        <div className="flex justify-center w-full h-32 p-4 bg-white border border-gray-300 rounded-md items center">
          <Image
            src={URL.createObjectURL(thumbnailImage)}
            alt="preview-image"
            width={250}
            height={250}
            style={{
              objectFit: "cover",
            }}
          />
          <button
            aria-label="remove thumbnail input"
            className="ml-2"
            onClick={onRemoveThumbnailImage}
          >
            <XMarkIcon />
          </button>
        </div>
      ) : (
        <div
          className={`relative flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white border-2 ${
            error
              ? "input-error "
              : "border-gray-300 hover:border-gray-400 focus:outline-none"
          } border-dashed rounded-md appearance-none `}
        >
          <span className="flex items-center">
            <i className="mr-1">
              <UploadIcon />
            </i>
            이미지 파일 선택
          </span>
          <span className="text-sm text-neutral-500">{labelAltText}</span>
          <input
            type="file"
            name="thumbnail_image"
            className="absolute top-0 left-0 block w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            {...thumbnailInputRegister}
          />
        </div>
      )}
      {React.isValidElement(ErrorMessage) ? ErrorMessage : null}
    </div>
  );
};

export default ThumbnailInput;
