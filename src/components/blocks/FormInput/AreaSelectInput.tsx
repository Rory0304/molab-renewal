import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { KOREA_ADMNISTRATIVE_DISTRICT } from "src/constants/area";

interface AreaSelectInputProps {
  selectedSido: string;
  siDoSelectInputRegister?: UseFormRegisterReturn;
  siGunGuSelectInputRegister?: UseFormRegisterReturn;
  siDoError?: boolean;
  siGunGuError?: boolean;
  SiDoErrorMessage?: React.ReactElement;
  SiGunGuErrorMessage?: React.ReactElement;
}

const AreaSelectInput: React.FC<AreaSelectInputProps> = ({
  selectedSido,
  siDoSelectInputRegister,
  siGunGuSelectInputRegister,
  siDoError = false,
  siGunGuError = false,
  SiDoErrorMessage,
  SiGunGuErrorMessage,
}) => {
  const sido = Object.keys(KOREA_ADMNISTRATIVE_DISTRICT);
  const [currentSiGunGu, setCurrentSiGunGu] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!!selectedSido) {
      setCurrentSiGunGu(
        KOREA_ADMNISTRATIVE_DISTRICT[
          selectedSido as unknown as keyof typeof KOREA_ADMNISTRATIVE_DISTRICT
        ]
      );
    }
  }, [selectedSido]);

  return (
    <div className="flex flex-row w-full pb-8 form-control">
      <div className="pr-4">
        <label className="label">
          <span className="text-lg font-bold label-text after:required-star">
            시도
          </span>
        </label>
        <select
          {...siDoSelectInputRegister}
          className={`select select-bordered ${
            siDoError ? "select-error" : ""
          }`}
        >
          <option disabled value="">
            시도 전체
          </option>
          {sido.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {React.isValidElement(SiDoErrorMessage) ? SiDoErrorMessage : null}
      </div>
      <div>
        <label className="label">
          <span className="text-lg font-bold label-text after:required-star">
            시군구
          </span>
        </label>
        <select
          {...siGunGuSelectInputRegister}
          className={`select select-bordered ${
            siGunGuError ? "select-error" : ""
          }`}
        >
          <option disabled value="">
            시군구 전체
          </option>
          {currentSiGunGu.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {React.isValidElement(SiGunGuErrorMessage) ? SiGunGuErrorMessage : null}
      </div>
    </div>
  );
};

export default AreaSelectInput;
