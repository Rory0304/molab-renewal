import { Row } from "src/types/supabase";

export type NoticeType = Row<"Notice">;
export type SortOptionType = "asc" | "desc";
export type NoticeCategoryKeyType =
  | "All"
  | "Environmnet"
  | "Welfare"
  | "Traffic"
  | "Energy"
  | "Etc";

export enum NoticeStatus {
  ONGOING = "Ongoing",
  ENDED = "Ended",
  D_DAY = "D-day",
}

export const NoticeCategory: Record<NoticeCategoryKeyType, string> = {
  All: "전체",
  Environmnet: "환경",
  Traffic: "교통",
  Welfare: "복지",
  Energy: "에너지",
  Etc: "기타",
};

export const NoticeSort: Record<SortOptionType, string> = {
  desc: "최신순",
  asc: "오래된순",
};
