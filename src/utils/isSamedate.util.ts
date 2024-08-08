import { format } from 'date-fns';

export function isSameDate(date1: Date): boolean {
  try {
    const today: Date = new Date();

    const formattedDate1: string = format(date1, 'yyyy-MM-dd');
    const formattedToday: string = format(today, 'yyyy-MM-dd');

    console.log(formattedDate1, formattedToday);

    return formattedDate1 === formattedToday;
  } catch (error) {
    console.error('Error parsing date:', error);
    return false;
  }
}
