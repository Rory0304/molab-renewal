import React from 'react';

import { ProjectStatus } from 'src/types';
import { calculateDaysLeft } from 'src/utils/date';

interface ProjectStatusBadgeProps {
  endDate: Date;
  status: ProjectStatus;
}
const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({
  status,
  endDate,
}) => {
  switch (status) {
    case ProjectStatus.D_DAY:
      return (
        <span className="px-2 py-1 font-semibold bg-red-300 text-white rounded-md text-m">
          D-DAY
        </span>
      );
    case ProjectStatus.ENDED:
      return (
        <span className="px-2 py-1 font-semibold bg-gray-200 rounded-md text-m">
          종료됨
        </span>
      );
    case ProjectStatus.ONGOING:
      const daysLeft = calculateDaysLeft(endDate);
      return (
        <span className="px-2 py-1 font-semibold bg-purple-500 text-white rounded-md text-m">
          {`${daysLeft}일 남음`}
        </span>
      );
    default:
      return null;
  }
};

export default ProjectStatusBadge;
