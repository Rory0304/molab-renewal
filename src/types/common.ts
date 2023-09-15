/**
 * Project steps
 * - definition: 문제 정의
 * - preparation: 실행 준비
 * - execution: 실행
 * - completion: 실행 완료
 */
export type ProjectDetailStepType =
  | "definition"
  | "preparation"
  | "execution"
  | "completion";

/**
 * Project produce steps
 * - setting: 프로젝트 관리
 * - base: 기본 정보
 * - participation: 참여 방법
 * - detail: 프로젝트 소개
 */
export type ProduceStepType = "setting" | "base" | "participation" | "detail";

/**
 * Api Status
 */
export type ApiStatus = "Idle" | "Pending" | "Success" | "Fail";
