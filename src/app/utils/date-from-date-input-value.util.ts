import { getToday } from './get-today.util';

export function dateFromDateInputValue(value: string): Date {
  const date = getToday();
  const dateParts = value.split('-');

  date.setFullYear(parseInt(dateParts[0], 10));
  date.setMonth(parseInt(dateParts[1], 10) - 1);
  date.setDate(parseInt(dateParts[2], 10));

  return date;
}
