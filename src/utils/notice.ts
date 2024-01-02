import { NoticeStatus } from 'src/types/notice';

import { calculateDaysLeft, checkIsDatePast } from './date';

export const getNoticeStatus = (date: Date) => {
  const isEnded = checkIsDatePast(date);
  const daysLeft = calculateDaysLeft(date);

  if (isEnded) return NoticeStatus.ENDED;

  if (daysLeft === 0) return NoticeStatus.D_DAY;

  return NoticeStatus.ONGOING;
};
