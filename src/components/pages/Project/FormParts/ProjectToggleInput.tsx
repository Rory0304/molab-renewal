"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { ToggleInput } from "src/components/blocks";

import type { ProjectFormValues } from "src/types/project";
import type { UseFormReturn } from "react-hook-form";

interface ProjectToggleInputProps {
  methods: UseFormReturn<ProjectFormValues, any, undefined>;
}

const ProjectToggleInput: React.FC<ProjectToggleInputProps> = ({
  methods: { control },
}) => {
  return (
    <Controller
      name="payload.isOpen"
      control={control}
      render={({ field: { onChange, value } }) => (
        <ToggleInput
          onChange={(e) => onChange(e.target.checked)}
          labelText={"공개 여부"}
          checked={value}
        />
      )}
    />
  );
};

export default React.memo(
  ProjectToggleInput,
  (prev, cur) =>
    JSON.stringify(prev.methods.getFieldState("payload.isOpen")) ===
    JSON.stringify(cur.methods.getFieldState("payload.isOpen"))
);
