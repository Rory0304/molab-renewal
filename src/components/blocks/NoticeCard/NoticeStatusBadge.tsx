import React from 'react';

import { NoticeStatus } from 'src/types/notice';
import { calculateDaysLeft } from 'src/utils/date';

interface NoticeStatusBadgeProps {
  endDate: Date;
  noticeStatus: NoticeStatus;
}
const NoticeStatusBadge: React.FC<NoticeStatusBadgeProps> = ({
  endDate,
  noticeStatus,
}) => {
  switch (noticeStatus) {
    case NoticeStatus.ONGOING:
      const daysLeft = calculateDaysLeft(endDate);
      return (
        <span className="font-semibold tracking-wide badge badge-ghost badge-lg opacity-90">
          D-{daysLeft}
        </span>
      );

    case NoticeStatus.D_DAY:
      return (
        <span className="font-semibold tracking-wide text-neutral-100 badge-error badge badge-lg opacity-90">
          D-Day
        </span>
      );

    case NoticeStatus.ENDED:
      return (
        <span className="font-semibold tracking-wide badge-ghost badge badge-lg opacity-90">
          모집 완료
        </span>
      );

    default:
      return null;
  }
};

export default NoticeStatusBadge;
