import { ProduceStepType } from "src/types/common";
import { PROJETC_DETAIL_STEP } from "src/constants/projectSteps";

export const PROPOSE_STEPS: {
  key: ProduceStepType;
  title: string;
  items?: typeof PROJETC_DETAIL_STEP;
}[] = [
  {
    key: "base",
    title: "기본 정보",
  },
  {
    key: "participation",
    title: "참여 방법",
  },
  {
    key: "detail",
    title: "프로젝트 소개",
    items: PROJETC_DETAIL_STEP,
  },
];
