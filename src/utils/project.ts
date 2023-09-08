import { ProjectStatus } from "src/types/project";
import { checkIsDatePast, calculateDaysLeft } from "./date";

export const getProjectStatus = (date: Date) => {
  const isEnded = checkIsDatePast(date);
  const daysLeft = calculateDaysLeft(date);

  if (isEnded) return ProjectStatus.ENDED;

  if (daysLeft === 0) return ProjectStatus.D_DAY;

  return ProjectStatus.ONGOING;
};
