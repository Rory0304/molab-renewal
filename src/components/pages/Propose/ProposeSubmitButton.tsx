"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

const ProposeSubmitButton: React.FC = () => {
  const { watch } = useFormContext();

  // If propose `id` exists, then use `create row` api
  // else, use `update rows` api
  const handleProposeSubmit = async () => {
    const currentData = watch();
    console.log(currentData);

    if (currentData.id) {
      return null;
    }

    return null;
  };

  return (
    <button
      type="submit"
      className="no-animation btn-md btn btn-outline btn-primary rounded-[30px]"
      onClick={handleProposeSubmit}
    >
      저장하기
    </button>
  );
};

export default ProposeSubmitButton;
