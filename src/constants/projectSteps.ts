import { ProjectDetailStepType } from "src/types/common";

export const PROJETC_DETAIL_STEP: {
  key: ProjectDetailStepType;
  title: string;
}[] = [
  {
    key: "definition",
    title: "문제 정의",
  },
  {
    key: "preparation",
    title: "실행 준비",
  },
  {
    key: "execution",
    title: "실행",
  },
  {
    key: "completion",
    title: "실행 완료",
  },
];
