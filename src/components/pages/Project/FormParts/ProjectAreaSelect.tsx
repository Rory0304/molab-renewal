'use client';

import React from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { AreaSelectInput } from 'src/components/blocks';
import type { ProjectFormValues } from 'src/types/project';

interface ProjectAreaSelectProps {
  methods: UseFormReturn<ProjectFormValues, any, undefined>;
}

const ProjectAreaSelect: React.FC<ProjectAreaSelectProps> = ({
  methods: {
    control,
    register,
    formState: { errors },
  },
}) => {
  // [AREA SELECT REGISTER]
  const siDoSelectInputRegister = register('payload.siDo', {
    required: '필수 입력 항목입니다.',
  });

  const siGunGuSelectInputRegister = register('payload.siGunGu', {
    required: '필수 입력 항목입니다.',
  });

  const watchedSelectedSido = useWatch({ control, name: 'payload.siDo' });
  const watchedSelectedSiGunGu = useWatch({ control, name: 'payload.siGunGu' });

  return (
    <AreaSelectInput
      required
      label
      selectedSido={watchedSelectedSido}
      selectedSiGunGu={watchedSelectedSiGunGu}
      siDoError={Boolean(errors.payload?.siDo)}
      siGunGuError={Boolean(errors.payload?.siGunGu)}
      SiDoErrorMessage={
        <ErrorMessage
          name="payload.siDo"
          render={({ message }) =>
            message ? (
              <span className="block mt-2 text-danger">{message}</span>
            ) : null
          }
        />
      }
      SiGunGuErrorMessage={
        <ErrorMessage
          name="payload.siGunGu"
          render={({ message }) =>
            message ? (
              <span className="block mt-2 text-danger">{message}</span>
            ) : null
          }
        />
      }
      siDoSelectInputRegister={siDoSelectInputRegister}
      siGunGuSelectInputRegister={siGunGuSelectInputRegister}
    />
  );
};

export default ProjectAreaSelect;
