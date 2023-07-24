"use client";

import React from "react";

interface ToggleInputProps {
  labelText: string;
  checked: boolean;
  onChange: () => void;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  labelText,
  checked,
  onChange,
}) => {
  return (
    <div className="form-control w-fit">
      <label className="cursor-pointer label">
        <span className="mr-4 text-lg font-bold label-text">{labelText}</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={checked}
          onChange={onChange}
          aria-pressed={checked}
        />
      </label>
    </div>
  );
};

export default ToggleInput;
