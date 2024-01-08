import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { KOREA_ADMNISTRATIVE_DISTRICT } from 'src/constants/area';

interface AreaSelectInputProps {
  selectedSido?: string;
  selectedSiGunGu?: string;
  siDoSelectInputRegister?: UseFormRegisterReturn;
  siGunGuSelectInputRegister?: UseFormRegisterReturn;
  label?: boolean;
  required?: boolean;
  siDoError?: boolean;
  siGunGuError?: boolean;
  SiDoErrorMessage?: React.ReactElement;
  SiGunGuErrorMessage?: React.ReactElement;
  onSidoChange?: (value: string) => void;
  onSiGunGuChange?: (value: string) => void;
}

const AreaSelectInput: React.FC<AreaSelectInputProps> = ({
  selectedSido,
  selectedSiGunGu,
  siDoSelectInputRegister,
  siGunGuSelectInputRegister,
  label = false,
  required = false,
  siDoError = false,
  siGunGuError = false,
  SiDoErrorMessage,
  SiGunGuErrorMessage,
  onSidoChange,
  onSiGunGuChange,
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
    } else {
      if (typeof onSiGunGuChange === 'function') {
        onSiGunGuChange('');
        setCurrentSiGunGu([]);
      }
    }
  }, [selectedSido]);

  return (
    <div className="flex flex-row w-full pb-8 form-control">
      <div className="pr-4">
        {label ? (
          <label className="label">
            <span
              className={`text-lg font-bold label-text ${
                required ? 'after:required-star' : null
              }`}
            >
              시도
            </span>
          </label>
        ) : null}
        <select
          value={selectedSido}
          onChange={e =>
            typeof onSidoChange === 'function'
              ? onSidoChange(e.target.value)
              : null
          }
          className={`select select-bordered ${
            siDoError ? 'select-error' : ''
          }`}
          {...siDoSelectInputRegister}
        >
          <option value="">시도 전체</option>
          {sido.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {React.isValidElement(SiDoErrorMessage) ? SiDoErrorMessage : null}
      </div>
      <div>
        {label ? (
          <label className="label">
            <span
              className={`text-lg font-bold label-text ${
                required ? 'after:required-star' : null
              }`}
            >
              시군구
            </span>
          </label>
        ) : null}
        <select
          value={selectedSiGunGu}
          onChange={e =>
            typeof onSiGunGuChange === 'function'
              ? onSiGunGuChange(e.target.value)
              : null
          }
          className={`select select-bordered ${
            siGunGuError ? 'select-error' : ''
          }`}
          {...siGunGuSelectInputRegister}
        >
          <option value="">시군구 전체</option>
          {currentSiGunGu.map(item => (
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
