export function isDataNotEmpty<T>(data: T): boolean {
  return data !== null && data !== undefined && data !== '';
}
