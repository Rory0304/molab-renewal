import React from "react";

interface ToggleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  checked?: boolean;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  labelText,
  checked = false,
  className,
  ...props
}) => {
  return (
    <div className="pb-8 w-fit">
      <label className="cursor-pointer label">
        <span className="mr-4 text-lg font-bold label-text">{labelText}</span>
        <input
          type="checkbox"
          className={`${className} toggle toggle-primary`}
          aria-pressed={checked}
          checked={checked}
          {...props}
        />
      </label>
    </div>
  );
};

export default ToggleInput;
