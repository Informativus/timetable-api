export function isSameDate(date1: string) {
  const date: Date = new Date();
  return date1 === date.toDateString();
}
