'use client';

import React from 'react';
import { Controller, useWatch } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { DatePickerInput } from 'src/components/blocks';
import type { ProjectFormValues } from 'src/types/project';

interface ProjectDatePickerInputProps {
  methods: UseFormReturn<ProjectFormValues, any, undefined>;
}

const ProjectDatePickerInput: React.FC<ProjectDatePickerInputProps> = ({
  methods: { control },
}) => {
  const watchedStartDate = useWatch({ control, name: 'payload.startDate' });

  return (
    <div>
      <Controller
        name="payload.startDate"
        control={control}
        rules={{
          required: '필수 입력 항목입니다.',
        }}
        render={({ field, fieldState: { error } }) => (
          <DatePickerInput
            labelText="시작 일자"
            value={field.value}
            onChange={field.onChange}
            error={Boolean(error?.message)}
            ErrorMessage={
              <ErrorMessage
                name="payload.startDate"
                render={({ message }) =>
                  message ? (
                    <span className="block mt-2 text-danger">{message}</span>
                  ) : null
                }
              />
            }
          />
        )}
      />
      <Controller
        name="payload.endDate"
        control={control}
        rules={{
          required: '필수 입력 항목입니다.',
          validate: date =>
            new Date(date).getTime() > new Date(watchedStartDate).getTime() ||
            '종료 일자가 시작 일자보다 빠른 날짜입니다. 올바른 날짜를 선택해 주세요',
        }}
        render={({ field, fieldState: { error } }) => (
          <DatePickerInput
            labelText="종료 일자"
            value={field.value}
            onChange={field.onChange}
            error={Boolean(error?.message)}
            dateMin={watchedStartDate}
            ErrorMessage={
              <ErrorMessage
                name="payload.endDate"
                render={({ message }) =>
                  message ? (
                    <span className="block mt-2 text-danger">{message}</span>
                  ) : null
                }
              />
            }
          />
        )}
      />
    </div>
  );
};

export default ProjectDatePickerInput;
