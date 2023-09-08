import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ToggleInputProps {
  labelText: string;
  checked?: boolean;
  toggleInputRegister?: UseFormRegisterReturn;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  labelText,
  checked = false,
  toggleInputRegister,
}) => {
  return (
    <div className="pb-8 w-fit">
      <label className="cursor-pointer label">
        <span className="mr-4 text-lg font-bold label-text">{labelText}</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          aria-pressed={checked}
          {...toggleInputRegister}
        />
      </label>
    </div>
  );
};

export default ToggleInput;
