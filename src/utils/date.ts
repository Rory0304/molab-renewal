/**
 * Check if the date is past
 */
export const checkIsDatePast = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date.getTime() < today.getTime();
};

/**
 * Calculate the number of days left (D-day)
 */
export const calculateDaysLeft = (date: Date) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  return Math.floor((date.getTime() - today.getTime()) / (1000 * 3600 * 24));
};
