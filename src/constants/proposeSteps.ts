import { ProduceStepType } from "src/types/common";

export const PROPOSE_STEPS: { key: ProduceStepType; title: string }[] = [
  {
    key: "base",
    title: "기본 정보",
  },
  {
    key: "participation",
    title: "참여 방법",
  },
  {
    key: "introduce",
    title: "프로젝트 소개",
  },
];
