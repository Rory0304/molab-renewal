import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface DatePickerInputProps {
  labelText: string;
  labelTextAlt?: string;
  dateMin?: string;
  dateMax?: string;
  dateInputRegister?: UseFormRegisterReturn;
  error?: boolean;
  ErrorMessage?: React.ReactElement;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  labelText,
  labelTextAlt,
  dateMin,
  dateMax,
  error,
  dateInputRegister,
  ErrorMessage,
}) => {
  return (
    <div className="pb-8">
      <label className="label">
        <span className="text-lg font-bold label-text after:required-star">
          {labelText}
        </span>
        {labelTextAlt ? (
          <span className="label-text-alt">{labelTextAlt}</span>
        ) : null}
      </label>
      <input
        type="date"
        className={`input input-bordered ${error ? "input-error" : ""}`}
        min={dateMin}
        max={dateMax}
        {...dateInputRegister}
      />
      {React.isValidElement(ErrorMessage) ? ErrorMessage : null}
    </div>
  );
};

export default DatePickerInput;
