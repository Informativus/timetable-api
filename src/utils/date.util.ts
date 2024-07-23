export function formatDateToSql(dateString: string): string {
  const [day, month, year] = dateString.split('.').map(Number);
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}
