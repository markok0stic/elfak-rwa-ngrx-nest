export function hasAnyElement<T>(list?: T[] | undefined): boolean {
  return Array.isArray(list) && list.length > 0;
}
