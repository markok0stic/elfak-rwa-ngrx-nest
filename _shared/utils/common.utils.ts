export function hasAnyElement<T>(list?: T[] | undefined): boolean {
  return Array.isArray(list) && list.length > 0;
}

export const keys = <T extends Record<PropertyKey, unknown>>(obj: T): Array<keyof T> =>
  Object.keys(obj);