/**
 * Checks whether an object type contains no keys outside the specified key union.
 *
 * @example
 * type Ok = HasOnlyKeys<"id" | "name", { id: number; name: string }>;
 * // true
 *
 * @example
 * type Fail = HasOnlyKeys<"id", { id: number; name: string }>;
 * // false
 */
export type HasOnlyKeys<K extends PropertyKey, T> = Exclude<
  keyof T,
  K
> extends never
  ? true
  : false;
