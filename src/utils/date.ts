import dayjs from 'dayjs';

export const formatTime = (date: Date) => dayjs(date).format('H:mm');

export const formatDay = (date: Date) => dayjs(date).format('DD MMM YYYY');

export const formatDayMonth = (date: Date) => dayjs(date).format('DD MMM');

export const formatRange = (startDate: Date, endDate: Date) => `${formatDayMonth(startDate)} - ${formatDayMonth(endDate)}`;

export const formatApiDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');

export const addDays = (date: Date, amount: number) => dayjs(date).add(amount, 'day').toDate();

export const subtractDays = (date: Date, amount: number) => dayjs(date).subtract(amount, 'day').toDate();

export const addWeeks = (date: Date, amount: number) => dayjs(date).add(amount, 'week').toDate();

export const subtractWeeks = (date: Date, amount: number) => dayjs(date).subtract(amount, 'week').toDate();

export const addMonths = (date: Date, amount: number) => dayjs(date).add(amount, 'month').toDate();

export const subtractMonths = (date: Date, amount: number) => dayjs(date).subtract(amount, 'month').toDate();

export const getPreviousMonday = (date: Date) => {
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0) {
    return subtractDays(date, 6);
  } else if (dayOfWeek === 1) {
    return date;
  } else {
    return subtractDays(date, dayOfWeek - 1);
  }
};
